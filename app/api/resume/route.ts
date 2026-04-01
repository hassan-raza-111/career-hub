import { NextResponse } from "next/server";
import { prisma } from "../../lib/db";
import { getSession } from "../../lib/session";

export async function GET() {
  try {
    const userId = await getSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resume = await prisma.resume.findUnique({
      where: { userId },
      include: { experiences: true, educations: true },
    });

    return NextResponse.json({ resume });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const resume = await prisma.$transaction(async (tx) => {
      // Delete existing resume if any (upsert approach)
      const existing = await tx.resume.findUnique({
        where: { userId },
      });

      if (existing) {
        await tx.experience.deleteMany({ where: { resumeId: existing.id } });
        await tx.education.deleteMany({ where: { resumeId: existing.id } });
        await tx.resume.delete({ where: { id: existing.id } });
      }

      return tx.resume.create({
        data: {
          userId,
          fullName: data.fullName || "",
          jobTitle: data.jobTitle || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          summary: data.summary || "",
          skills: data.skills || "",
          languages: data.languages || "",
          experiences: {
            create: (data.experiences || []).map(
              (exp: { company: string; role: string; duration: string; description: string }) => ({
                company: exp.company || "",
                role: exp.role || "",
                duration: exp.duration || "",
                description: exp.description || "",
              })
            ),
          },
          educations: {
            create: (data.educations || []).map(
              (edu: { degree: string; institution: string; year: string }) => ({
                degree: edu.degree || "",
                institution: edu.institution || "",
                year: edu.year || "",
              })
            ),
          },
        },
        include: { experiences: true, educations: true },
      });
    });

    return NextResponse.json({ resume });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
