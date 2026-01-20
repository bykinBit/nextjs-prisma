import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Post from "@/components/Post";

export const dynamic = "force-dynamic";

export default async function Drafts() {
    const session = await auth();

    if (!session) {
        redirect("/api/auth/signin");
    }

    const drafts = await prisma.post.findMany({
        where: {
            published: false,
            authorId: session.user?.id,
        },
        include: {
            author: {
                select: { name: true, email: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Drafts</h1>
            {drafts.length === 0 ? (
                <p className="text-gray-500">You have no drafts.</p>
            ) : (
                <div className="space-y-4">
                    {drafts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
