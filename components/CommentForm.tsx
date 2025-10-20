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
      {/* name input: minimal, subtle bg, smooth focus */}
      <input
        className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm placeholder:text-neutral-400 transition-shadow duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-0 focus:shadow-md focus:border-pink-500"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* textarea: remove native outline, add smooth transition and subtle focus shadow */}
      <textarea
        className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm placeholder:text-neutral-400 transition-shadow duration-200 ease-in-out shadow-sm resize-none focus:outline-none focus:ring-0 focus:shadow-md focus:border-pink-500"
        rows={4}
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex gap-2 items-center">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-md text-sm shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send comment"}
        </button>
        {error && <span className="text-red-600 text-sm">{error}</span>}
      </div>
    </form>
  );
}
