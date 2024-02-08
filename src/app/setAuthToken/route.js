"use server";

import { cookies } from "next/headers";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const authToken = searchParams.get("token");

  cookies().set("authToken", authToken);

  return Response.json({});
}
