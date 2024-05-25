"use server";

async function controlOutlet(outlet, command) {
  const server = "https://dogfish-legible-absolutely.ngrok-free.app";
  const response = await fetch(
    `${server}/outlets/control.php?outlet=${outlet}&command=${command}`,
    { cache: "no-store" }
  );

  if (response.ok) {
    return "Success";
  } else {
    throw new Error("Failed to fetch data");
  }
}

export default async function Page({ params }) {
  let [outlet, command] = params.slug.split("%3A");
  const data = await controlOutlet(outlet, command);

  return data;
}
