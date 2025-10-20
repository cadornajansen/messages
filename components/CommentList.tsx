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

  if (loading) return <div>Loading comments…</div>;

  return (
    <section className="mt-4">
      <h3 className="font-bold mb-2">Comments ({comments.length})</h3>
      <div className="flex flex-col gap-3">
        {comments.length === 0 && (
          <div className="text-sm text-neutral-600">No comments yet.</div>
        )}
        {comments.map((c) => (
          <div key={c.id} className="border p-3 rounded bg-white">
            <div className="text-sm text-neutral-600">
              {c.author ?? "Anonymous"} ·{" "}
              <span className="text-xs">
                {new Date(c.created_at).toLocaleString()}
              </span>
            </div>
            <div className="mt-1 text-sm">{c.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
