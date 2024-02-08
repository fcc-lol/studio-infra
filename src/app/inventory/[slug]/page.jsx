"use server";

import { cookies } from "next/headers";
import { checkAuthToken } from "@/app/actions";

import Item from "@/app/components/item";

export default async function Page({ params }) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken");
  const isAuthenticated = await checkAuthToken(authToken.value);

  if (isAuthenticated) {
    return <Item slug={params.slug} />;
  } else {
    return <>Please scan NFC tag near studio door!</>;
  }
}
