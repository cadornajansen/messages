import Link from "next/link";
import type { ArticleItem } from "@/types";

interface Props {
  category: string;
  articles: ArticleItem[];
}

const ArticleItemList = ({ articles }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-cormorantGaramond text-4xl"></h2>
      <div className="flex flex-col gap-2.5 font-poppins text-lg">
        {articles.map((article, id) => (
          <Link
            href={`/${article.id}`}
            key={id}
            className="block hover:shadow-md transition-shadow duration-200 border border-neutral-100 px-4 py-3 rounded-lg bg-white"
          >
            <span className="flex justify-between items-center font-bold text-neutral-900 hover:text-pink-700 transition duration-150">
              {article.title}
              <span className="text-xs px-2 py-0.5 rounded-md border bg-black/5">
                {article.date}
              </span>
            </span>

            <p
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
              className="leading-tight text-prose text-sm text-black/70 mt-2"
            >
              {article.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleItemList;
