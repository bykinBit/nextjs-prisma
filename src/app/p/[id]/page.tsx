import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import PostActions from "./PostActions";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: Props) {
    const { id } = await params;
    const session = await auth();

    const post = await prisma.post.findUnique({
        where: { id },
        include: {
            author: {
                select: { name: true, email: true, id: true },
            },
        },
    });

    if (!post) {
        notFound();
    }

    const isAuthor = session?.user?.id === post.author?.id;
    const authorName = post.author?.name || post.author?.email || "Unknown author";

    return (
        <div className="bg-white rounded-lg shadow-sm border p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <p className="text-gray-500 mb-6">By {authorName}</p>

            {!post.published && (
                <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full mb-4">
                    Draft
                </span>
            )}

            <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
            </div>

            {isAuthor && <PostActions postId={post.id} published={post.published} />}
        </div>
    );
}
