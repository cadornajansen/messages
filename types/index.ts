export type ArticleItem = {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
};

export type Comment = {
  id: string;
  article_id: string;
  author?: string | null;
  content: string;
  created_at: string;
};
