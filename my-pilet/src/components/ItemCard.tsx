import * as React from 'react';
import { Post } from '../types';

interface ItemCardProps {
  post: Post;
  onClick: () => void;
}

/**
 * A reusable component to display a short summary of a Post.
 * It shows the title and a snippet of the body, and handles clicks.
 */
export const ItemCard: React.FC<ItemCardProps> = ({ post, onClick }) => {
  // Requirement #2: "show a title and a short body snippet."
  const snippet = post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body;

  return (
    <div
      onClick={onClick}
      className="group p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-slate-200 group-hover:text-purple-400 transition-colors duration-200 line-clamp-1">
          {post.title}
        </h3>
        <svg
          className="w-5 h-5 text-slate-500 group-hover:text-purple-400 transform group-hover:translate-x-1 transition-all duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <p className="mt-3 text-slate-400 text-sm line-clamp-3 group-hover:text-slate-300 transition-colors duration-200">
        {snippet}
      </p>
      <div className="mt-4 flex items-center text-xs text-slate-500 group-hover:text-purple-400 transition-colors duration-200">
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Click to read more
      </div>
    </div>
  );
};
