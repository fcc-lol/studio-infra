"use server";

export async function checkAuthToken(authToken) {
  return authToken === process.env.IN_STUDIO_AUTH_TOKEN;
}
