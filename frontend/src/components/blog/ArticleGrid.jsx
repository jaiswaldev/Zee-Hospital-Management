import React from "react";
import ArticleCard from "./ArticleCard";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const ArticleGrid = ({
  articles = [],
  activeCategory,
  onCategoryChange,
  currentPage,
  onPageChange
}) => {
  const articlesPerPage = 6;

  // Filter articles by category
  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  // Calculate pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  return (
    <div className="w-full">
      {/* Tabs Section */}
      <div className="mb-6 sm:mb-8">
        <Tabs
          value={activeCategory}
          onValueChange={onCategoryChange}
          className="w-full"
        >
          <TabsList
            className="w-full md:w-auto flex gap-2 bg-gray-100 p-1 rounded-lg overflow-x-auto sm:overflow-visible scrollbar-hide"
          >
            {[
              { value: "all", label: "All Articles" },
              { value: "News", label: "News" },
              { value: "Medical Research", label: "Medical Research" },
              { value: "Staff Updates", label: "Staff Updates" },
              { value: "Patient Information", label: "Patient Information" }
            ].map(({ value, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex-shrink-0 whitespace-nowrap text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {currentArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 sm:mt-12">
          <PaginationContent className="flex-wrap justify-center gap-1 sm:gap-2">
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  currentPage > 1 && onPageChange(currentPage - 1)
                }
                className={`min-w-[2rem] sm:min-w-[2.5rem] ${
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer hover:bg-gray-100"
                }`}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => onPageChange(index + 1)}
                  className="min-w-[2rem] sm:min-w-[2.5rem] hover:bg-gray-100 text-xs sm:text-sm"
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages && onPageChange(currentPage + 1)
                }
                className={`min-w-[2rem] sm:min-w-[2.5rem] ${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer hover:bg-gray-100"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </div>
      )}
    </div>
  );
};

export default ArticleGrid;
