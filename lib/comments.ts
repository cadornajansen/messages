import { supabase } from "./supabaseClient";
import type { Comment } from "@/types";

export const getCommentsByArticle = async (
  articleId: string
): Promise<Comment[]> => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("article_id", articleId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getCommentsByArticle error:", error);
    return [];
  }
  return data ?? [];
};

export const addComment = async (
  articleId: string,
  author: string | undefined,
  content: string
) => {
  const { data, error } = await supabase.from("comments").insert({
    article_id: articleId,
    author: author ?? null,
    content,
  });

  if (error) {
    throw error;
  }
  return data;
};
