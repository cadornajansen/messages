"use client";

import { useState } from "react";
import { addComment } from "@/lib/comments";

export default function CommentForm({ articleId }: { articleId: string }) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await addComment(articleId, name || undefined, content.trim());
      setName("");
      setContent("");
      // notify listeners to refresh
      window.dispatchEvent(
        new CustomEvent("comment-added", { detail: { articleId } })
      );
    } catch (err: any) {
      setError(err.message || "Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <input
        className="border px-2 py-1 rounded"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="border px-2 py-1 rounded"
        rows={4}
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex gap-2 items-center">
        <button
          type="submit"
          disabled={loading}
          className="bg-amber-600 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post comment"}
        </button>
        {error && <span className="text-red-600 text-sm">{error}</span>}
      </div>
    </form>
  );
}
