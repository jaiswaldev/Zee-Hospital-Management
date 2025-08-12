import React from "react";
import { Badge } from "../ui/badge";
import { CalendarIcon } from "lucide-react";

const ArticleCard = ({ article }) => {
  const { title, excerpt, image, date, category } = article;

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
        />
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-xs sm:text-sm">
            {category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Date */}
        <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">
          <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span>{date}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Read More Button */}
        <button
          className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200 text-sm sm:text-base"
          aria-label={`Read more about ${title}`}
        >
          Read More →
        </button>
      </div>
    </article>
  );
};

export default ArticleCard;
