import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface Props {
    params: Promise<{ id: string }>;
}

export async function PUT(req: Request, { params }: Props) {
    const session = await auth();
    const { id } = await params;

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await prisma.post.findUnique({
        where: { id },
        select: { authorId: true },
    });

    if (post?.authorId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedPost = await prisma.post.update({
        where: { id },
        data: { published: true },
    });

    return NextResponse.json(updatedPost);
}
