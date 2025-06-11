import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Share2, Heart, MessageSquare, CalendarIcon } from "lucide-react";

const ArticleCard = ({ article }) => {
  const { title, excerpt, image, date, category, author, readTime } = article;

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
            {category}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <CalendarIcon className="h-4 w-4 mr-2" />
          <span>{date}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>

        <button 
          className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
          aria-label={`Read more about ${title}`}
        >
          Read More →
        </button>
      </div>
    </article>
  );
};

export default ArticleCard;
