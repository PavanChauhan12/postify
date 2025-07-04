import BlogFolderCard from "./BlogFolderCard";

const featuredBlogs = [
  {
    id: 1,
    title: "10 Essential Tips for Modern Web Development",
    excerpt: "Discover the latest trends and best practices that every web developer should know in 2024.",
    author: { name: "Sarah Johnson", avatar: "/placeholder.svg", username: "sarahdev" },
    category: "Technology",
    readTime: "5 min read",
    publishedAt: "2 days ago",
    likes: 124,
    comments: 18,
    views: 2341,
  },
  {
    id: 2,
    title: "My Journey Through Southeast Asia: A Photo Story",
    excerpt: "Join me as I explore the vibrant cultures, stunning landscapes, and incredible food across Southeast Asia.",
    author: { name: "Mike Chen", avatar: "/placeholder.svg", username: "miketravel" },
    category: "Travel",
    readTime: "8 min read",
    publishedAt: "1 week ago",
    likes: 89,
    comments: 23,
    views: 1876,
  },
  {
    id: 3,
    title: "The Art of Minimalist Living: Less is More",
    excerpt: "How embracing minimalism transformed my life and how you can start your own journey to simplicity.",
    author: { name: "Emma Wilson", avatar: "/placeholder.svg", username: "emmaminimal" },
    category: "Lifestyle",
    readTime: "6 min read",
    publishedAt: "3 days ago",
    likes: 156,
    comments: 31,
    views: 3421,
  },
  {
    id: 4,
    title: "Mastering CSS Grid: Real-World Use Cases",
    excerpt: "Understand how to use CSS Grid effectively with practical examples and layout tips.",
    author: { name: "Leo Park", avatar: "/placeholder.svg", username: "leogrid" },
    category: "Design",
    readTime: "4 min read",
    publishedAt: "4 days ago",
    likes: 76,
    comments: 10,
    views: 1294,
  },
  {
    id: 5,
    title: "A Day in My Life as a Remote Developer",
    excerpt: "A fun and detailed breakdown of how I work, relax, and stay productive remotely.",
    author: { name: "Ava Moore", avatar: "/placeholder.svg", username: "avamremote" },
    category: "Productivity",
    readTime: "7 min read",
    publishedAt: "2 weeks ago",
    likes: 202,
    comments: 39,
    views: 4102,
  },
  {
    id: 6,
    title: "Exploring AI in Creative Writing",
    excerpt: "From prompt engineering to plot generation, here’s how AI is reshaping storytelling.",
    author: { name: "Noah Lee", avatar: "/placeholder.svg", username: "noahwrites" },
    category: "AI & Writing",
    readTime: "5 min read",
    publishedAt: "5 days ago",
    likes: 98,
    comments: 15,
    views: 1882,
  },
];

export default function FeaturedBlogsFolderStyle() {
  return (
    <section className="pt-32 bg-[#f5f2ec] pb-12">
      <div className="max-w-7xl mx-auto ">
        <div className="text-center mb-10">
          <h2 className="text-7xl font-dancing font-bold text-black mb-2">
            We don’t gatekeep in this house!
          </h2>
          <p className="text-lg text-gray-600">
            Our favorite blog picks - free and fabulous.
          </p>
        </div>

        <div className="overflow-x-auto py-12">
          <div className="flex gap-2 w-max">
            {featuredBlogs.map((blog) => (
              <div key={blog.id} className="min-w-[320px] max-w-sm">
                <BlogFolderCard blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
