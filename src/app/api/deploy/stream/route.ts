import { getDeployState, subscribe } from "@/lib/deploy/state";

export const dynamic = "force-dynamic";

export async function GET() {
  const state = getDeployState();

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      function send(data: unknown) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      }

      // Send existing logs first
      for (const log of state.logs) {
        send(log);
      }

      // If already finished, close the stream
      if (state.status !== "deploying") {
        send({ type: "done", status: state.status });
        controller.close();
        return;
      }

      // Subscribe to new logs
      const unsubscribe = subscribe((log) => {
        try {
          send(log);

          // Check if deployment is done
          const currentState = getDeployState();
          if (
            currentState.status === "success" ||
            currentState.status === "error"
          ) {
            send({ type: "done", status: currentState.status });
            unsubscribe();
            controller.close();
          }
        } catch {
          // Stream was closed by client
          unsubscribe();
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
