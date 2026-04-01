import { NextResponse } from "next/server";
import { prisma } from "../../lib/db";
import { getSession } from "../../lib/session";

export async function GET() {
  try {
    const userId = await getSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessions = await prisma.session.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ sessions });
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

    const session = await prisma.session.create({
      data: {
        userId,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        jobTitle: data.jobTitle || "",
        experience: data.experience || "",
        sessionTime: new Date(data.sessionTime),
        message: data.message || "",
      },
    });

    return NextResponse.json({ session });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = await getSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 });
    }

    await prisma.session.deleteMany({
      where: { id: parseInt(id), userId },
    });

    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
