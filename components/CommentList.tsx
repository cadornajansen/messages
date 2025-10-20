"use client";

import { useEffect, useState } from "react";
import { getCommentsByArticle } from "@/lib/comments";
import type { Comment } from "@/types";

export default function CommentList({ articleId }: { articleId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await getCommentsByArticle(articleId);
    setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || detail.articleId === articleId) load();
    };
    window.addEventListener("comment-added", handler as EventListener);
    return () =>
      window.removeEventListener("comment-added", handler as EventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  if (loading)
    return <div className="text-sm text-neutral-500">Loading comments…</div>;

  return (
    <section className="my-6">
      <h3 className="font-semibold mb-3 text-neutral-900">
        Comments ({comments.length})
      </h3>
      <div className="flex flex-col gap-3">
        {comments.length === 0 && (
          <div className="text-sm text-neutral-600">No comments yet.</div>
        )}
        {comments.map((c) => (
          <div
            key={c.id}
            className="bg-white border border-neutral-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between text-sm text-neutral-500">
              <div className="font-medium text-neutral-800">
                {c.author ?? "Anonymous"}
              </div>
              <div className="text-xs">
                {new Date(c.created_at).toLocaleString()}
              </div>
            </div>
            <div className="mt-2 text-sm leading-relaxed text-neutral-700">
              {c.content}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
