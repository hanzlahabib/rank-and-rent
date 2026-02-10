import { NextResponse } from "next/server";
import { getDeployState, resetDeploy } from "@/lib/deploy/state";
import { executeDeploy } from "@/lib/deploy/ssh";

export async function POST() {
  const state = getDeployState();

  if (state.status === "deploying") {
    return NextResponse.json(
      { error: "Deployment already in progress" },
      { status: 409 }
    );
  }

  resetDeploy();

  // Fire and forget - don't await
  executeDeploy();

  return NextResponse.json(
    { message: "Deployment started" },
    { status: 202 }
  );
}

export async function GET() {
  const state = getDeployState();
  return NextResponse.json(state);
}
