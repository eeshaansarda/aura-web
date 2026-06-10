// TEMPORARY — verifies which env values the deployment actually carries.
// Remove after debugging. Values are masked.
export async function GET() {
  const url = process.env.SUPABASE_URL ?? "(unset)";
  const key = process.env.SUPABASE_ANON_KEY ?? "(unset)";
  return Response.json({
    supabase_url: url,
    anon_key_prefix: key.slice(0, 18),
    anon_key_length: key.length,
  });
}
