import { NextResponse } from "next/server";
import { verifyMessage } from "viem";

export async function POST(req: Request) {
  const { address, message, signature } = await req.json();

  const valid = await verifyMessage({ address, message, signature });

  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // create token/session or store address
  return NextResponse.json({ success: true });
}
