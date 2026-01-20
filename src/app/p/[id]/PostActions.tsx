"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    postId: string;
    published: boolean;
}

export default function PostActions({ postId, published }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const publishPost = async () => {
        setLoading(true);
        await fetch(`/api/publish/${postId}`, { method: "PUT" });
        router.refresh();
        setLoading(false);
    };

    const deletePost = async () => {
        setLoading(true);
        await fetch(`/api/post/${postId}`, { method: "DELETE" });
        router.push("/");
    };

    return (
        <div className="mt-8 pt-6 border-t flex gap-4">
            {!published && (
                <button
                    onClick={publishPost}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? "Publishing..." : "Publish"}
                </button>
            )}
            <button
                onClick={deletePost}
                disabled={loading}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
                Delete
            </button>
        </div>
    );
}
