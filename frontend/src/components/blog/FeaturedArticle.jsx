import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CalendarIcon } from "lucide-react";

const FeaturedArticle = ({ article }) => {
  const {
    title,
    excerpt,
    image,
    date,
    category,
    author,
    authorRole,
    authorImage
  } = article;

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-1/2 relative">
          <img
            src={image}
            alt={title}
            className="w-full h-56 sm:h-64 md:h-full object-cover"
          />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-xs sm:text-sm">
              {category}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-10 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-3">
              <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              <span>{date}</span>
            </div>

            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 text-gray-900 leading-snug sm:leading-tight">
              {title}
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {excerpt}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Author */}
            <div className="flex items-center">
              <img
                src={authorImage}
                alt={author}
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full mr-3 sm:mr-4 border-2 border-blue-100"
              />
              <div>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">{author}</p>
                <p className="text-xs sm:text-sm text-gray-500">{authorRole}</p>
              </div>
            </div>

            {/* Button */}
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base px-4 sm:px-6 py-2 rounded-lg transition-colors duration-200 w-full sm:w-auto"
              aria-label="Read more about this article"
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;
