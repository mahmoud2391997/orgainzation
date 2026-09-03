import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json() as { password?: string };
  const expected = process.env.ADMIN_PASSWORD ?? "antitude-demo";
  if (!body.password || body.password !== expected) return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set("antitude-admin", expected, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 8, path: "/" });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("antitude-admin");
  return response;
}
