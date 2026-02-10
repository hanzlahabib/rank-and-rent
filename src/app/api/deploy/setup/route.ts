import { NextResponse } from "next/server";
import { getDeployState, resetDeploy } from "@/lib/deploy/state";
import { executeFirstTimeSetup } from "@/lib/deploy/ssh";

export async function POST() {
  const state = getDeployState();

  if (state.status === "deploying") {
    return NextResponse.json(
      { error: "A deployment is already in progress" },
      { status: 409 }
    );
  }

  resetDeploy();

  // Fire and forget
  executeFirstTimeSetup();

  return NextResponse.json(
    { message: "First-time setup started" },
    { status: 202 }
  );
}
