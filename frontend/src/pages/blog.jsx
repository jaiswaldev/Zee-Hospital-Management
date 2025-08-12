import React, { useState } from "react";
import FeaturedArticle from "../components/blog/FeaturedArticle";
import ArticleGrid from "../components/blog/ArticleGrid";
import BlogSidebar from "../components/blog/blogSidebar";
import blogData from "../data/blog-data.json";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { featuredArticle, articles, popularTags } = blogData;
  const recentPosts = articles.slice(0, 5);
  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="pt-16 sm:pt-20">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 sm:py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              ZeeCare Blogs
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Latest news, medical research, and updates from our hospital.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mt-5">
          {/* Featured Article */}
          <section className="mb-10 sm:mb-16">
            <FeaturedArticle article={featuredArticle} />
          </section>

          {/* Grid and Sidebar */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Articles */}
            <div className="lg:w-2/3">
              <ArticleGrid
                articles={filteredArticles}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="lg:sticky lg:top-8">
                <BlogSidebar
                  recentPosts={recentPosts}
                  popularTags={popularTags}
                  onTagClick={(tag) => handleCategoryChange(tag)}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-8 sm:py-12 mt-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0">
              <div className="text-center md:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Hospital Management System
                </h3>
                <p className="text-gray-600">
                  Providing quality healthcare and information
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-200 text-center text-gray-600 text-sm">
              <p>
                © {new Date().getFullYear()} Hospital Management System. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Blog;
