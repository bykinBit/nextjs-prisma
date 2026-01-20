import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await req.json();

    const post = await prisma.post.create({
        data: {
            title,
            content,
            author: { connect: { id: session.user.id } },
        },
    });

    return NextResponse.json(post);
}
