"use server";

import { cookies } from "next/headers";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const authToken = searchParams.get("token");
  const oneYear = 365 * 24 * 60 * 60 * 1000;

  cookies().set("authToken", authToken, { expires: Date.now() + oneYear });

  return Response.json({});
}
