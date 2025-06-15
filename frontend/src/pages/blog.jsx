import React, { useState } from "react";
import FeaturedArticle from "../components/blog/FeaturedArticle";
import ArticleGrid from "../components/blog/ArticleGrid";
import BlogSidebar from "../components/blog/blogSidebar";
import Navbar from "../components/Navbar";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const featuredArticle = {
    id: 1,
    title: "New Advanced MRI Technology Now Available at ZeeCare",
    excerpt:
      "ZeeCare has recently acquired state-of-the-art MRI technology that provides clearer images and faster scan times, improving patient comfort and diagnostic accuracy.",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&q=80",
    date: "May 15, 2023",
    category: "Medical Research",
    author: "Dr. Raj Boom",
    authorRole: "Chief of Radiology",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
  };

  const articles = [
    {
      id: 2,
      title: "Hospital Staff Recognized for Excellence in Patient Care",
      excerpt:
        "Our nursing team has received national recognition for their outstanding dedication to patient care during the pandemic.",
      image:
        "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80",
      date: "May 10, 2023",
      category: "Staff Updates",
    },
    {
      id: 3,
      title: "New Patient Portal Features Released",
      excerpt:
        "We've enhanced our patient portal with new features to make managing your healthcare easier than ever.",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
      date: "May 5, 2023",
      category: "Patient Information",
    },
    {
      id: 4,
      title: "Hospital Expansion Project Breaks Ground",
      excerpt:
        "Construction has begun on our new wing that will add 50 additional beds and state-of-the-art facilities.",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
      date: "April 28, 2023",
      category: "News",
    },
    {
      id: 5,
      title: "Research Study on Diabetes Treatment Shows Promising Results",
      excerpt:
        "Our research team has published findings from a groundbreaking study on new diabetes treatment approaches.",
      image:
        "https://images.unsplash.com/photo-1579165466741-7f35e4755182?w=600&q=80",
      date: "April 22, 2023",
      category: "Medical Research",
    },
    {
      id: 6,
      title: "New Pediatric Specialists Join Our Team",
      excerpt:
        "We're pleased to welcome three new pediatric specialists to our growing children's health department.",
      image:
        "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&q=80",
      date: "April 15, 2023",
      category: "Staff Updates",
    },
    {
      id: 7,
      title: "COVID-19 Vaccination Update for Patients",
      excerpt:
        "Important information about our current vaccination program and eligibility requirements.",
      image:
        "https://images.unsplash.com/photo-1618961734760-466979ce35b0?w=600&q=80",
      date: "April 10, 2023",
      category: "Patient Information",
    },
    {
      id: 8,
      title: "Hospital Receives Award for Sustainability Initiatives",
      excerpt:
        "Our hospital has been recognized for its commitment to environmental sustainability and green practices.",
      image:
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80",
      date: "April 5, 2023",
      category: "News",
    },
  ];

  const recentPosts = articles.slice(0, 5);

  const popularTags = [
    { id: 1, name: "COVID-19" },
    { id: 2, name: "Patient Care" },
    { id: 3, name: "Research" },
    { id: 4, name: "Technology" },
    { id: 5, name: "Staff" },
    { id: 6, name: "Wellness" },
    { id: 7, name: "Community" },
    { id: 8, name: "Nutrition" },
  ];

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
      <Navbar />
      <div className="pt-15">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto ">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">ZeeCare Blogs</h1>
            <p className="text-lg md:text-xl text-blue-100">
              Latest news, medical research, and updates from our hospital
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Article */}
        <section className="mb-16">
          <FeaturedArticle article={featuredArticle} />
        </section>

        {/* Grid and Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <ArticleGrid
              articles={filteredArticles}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-8">
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
      <footer className="bg-white border-t border-gray-200 py-12 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Hospital Management System
              </h3>
              <p className="text-gray-600">
                Providing quality healthcare and information
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>
              © {new Date().getFullYear()} Hospital Management System. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
      </div>
   </>
  );  
};

export default Blog;
