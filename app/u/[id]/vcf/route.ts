import { getProfile } from "@/lib/profile";
import { generateVCF } from "@/lib/vcf";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const sub = new URL(req.url).searchParams.get("sub") ?? undefined;

  const data = await getProfile(sub ?? id);

  if (!data) {
    return new Response("Not found", { status: 404 });
  }

  const vcf = generateVCF(data.profile);
  const filename = data.profile.name.replace(/[^\w\s-]/g, "").trim() || "contact";

  return new Response(vcf, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}.vcf"`,
    },
  });
}
