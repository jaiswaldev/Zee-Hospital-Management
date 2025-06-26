import React from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

const BlogSidebar = ({ recentPosts = [], popularTags = [] }) => {
  const [email, setEmail] = React.useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log("Subscribing email:", email);
    setEmail("");
    // Show success message or toast notification
  };

  // Default recent posts if none provided
  const defaultRecentPosts = [
    {
      id: 1,
      title: "New Cancer Treatment Breakthrough",
      thumbnail:
        "https://images.unsplash.com/photo-1576671081837-49000212a370?w=300&q=80",
      date: "2023-05-15",
    },
    {
      id: 2,
      title: "Hospital Expansion Project Announced",
      thumbnail:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300&q=80",
      date: "2023-05-10",
    },
    {
      id: 3,
      title: "COVID-19 Vaccination Update",
      thumbnail:
        "https://images.unsplash.com/photo-1618961734760-466979ce35b0?w=300&q=80",
      date: "2023-05-05",
    },
    {
      id: 4,
      title: "New Chief of Surgery Appointed",
      thumbnail:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&q=80",
      date: "2023-04-28",
    },
  ];

  // Default popular tags if none provided
  const defaultPopularTags = [
    { id: 1, name: "Medical Research" },
    { id: 2, name: "Patient Care" },
    { id: 3, name: "COVID-19" },
    { id: 4, name: "Staff Updates" },
    { id: 5, name: "Technology" },
    { id: 6, name: "Wellness" },
    { id: 7, name: "Community" },
    { id: 8, name: "Events" },
  ];

  const postsToDisplay =
    recentPosts.length > 0 ? recentPosts : defaultRecentPosts;
  const tagsToDisplay =
    popularTags.length > 0 ? popularTags : defaultPopularTags;

  return (
    <div className="bg-white w-full max-w-[350px] space-y-8">
      {/* Recent Posts Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
          <div className="space-y-4">
            {postsToDisplay.map((post) => (
              <div key={post.id} className="flex items-start space-x-3">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h4 className="font-medium text-sm hover:text-blue-600 cursor-pointer">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Tags Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-4">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tagsToDisplay.map((tag) => (
              <Badge
                key={tag.id}
                variant="outline"
                className="cursor-pointer hover:bg-blue-50"
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Subscription */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-2">Newsletter</h3>
          <p className="text-sm text-gray-600 mb-4">
            Subscribe to our newsletter for the latest updates and health tips.
          </p>
          <Separator className="my-4" />
          <form onSubmit={handleSubscribe} className="space-y-3">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full "
            />
            <Button type="submit" className="w-full">
              Subscribe
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogSidebar;
