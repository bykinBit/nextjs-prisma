import prisma from "@/lib/prisma";
import Post from "@/components/Post";

export const dynamic = "force-dynamic";

export default async function Home() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Public Feed</h1>
      {feed.length === 0 ? (
        <p className="text-gray-500">No published posts yet.</p>
      ) : (
        <div className="space-y-4">
          {feed.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
