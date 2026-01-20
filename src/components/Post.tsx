import Link from "next/link";

interface PostProps {
    post: {
        id: string;
        title: string;
        content: string | null;
        published: boolean;
        author: {
            name: string | null;
            email: string | null;
        } | null;
    };
}

export default function Post({ post }: PostProps) {
    const authorName = post.author?.name || post.author?.email || "Unknown author";

    return (
        <Link href={`/p/${post.id}`}>
            <article className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition cursor-pointer">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-500 text-sm mb-3">By {authorName}</p>
                {post.content && (
                    <p className="text-gray-600 line-clamp-3">{post.content}</p>
                )}
            </article>
        </Link>
    );
}
