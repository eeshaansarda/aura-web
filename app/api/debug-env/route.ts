// TEMPORARY — verifies the get-profile call as the deployment sees it.
// Remove after debugging.
export async function GET() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_ANON_KEY!;

  const res = await fetch(`${url}/functions/v1/get-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
      apikey: key,
    },
    body: JSON.stringify({ slug: "sardaeeshaan53" }),
    cache: "no-store",
  });

  const body = await res.text();
  return Response.json({
    status: res.status,
    body: body.slice(0, 200),
  });
}
