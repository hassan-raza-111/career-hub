import { NextResponse } from "next/server";
import { prisma } from "../../lib/db";
import { getSession } from "../../lib/session";

export async function GET() {
  try {
    const userId = await getSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contacts = await prisma.contact.findMany({
      where: { userId },
      orderBy: { sentAt: "desc" },
    });

    return NextResponse.json({ contacts });
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

    const contact = await prisma.contact.create({
      data: {
        userId,
        name: data.name || "",
        email: data.email || "",
        subject: data.subject || "",
        message: data.message || "",
      },
    });

    return NextResponse.json({ contact });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
