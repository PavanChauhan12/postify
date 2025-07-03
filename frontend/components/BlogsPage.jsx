"use client"

import { useState, useEffect, useMemo } from "react"
import Navbar from "./Navbar"
import BlogFolderCard from "./BlogFolderCard"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

// Mock data to simulate fetching from a database
const mockBlogs = [
  {
    id: 1,
    title: "10 Essential Tips for Modern Web Development",
    excerpt: "Discover the latest trends and best practices that every web developer should know in 2024.",
    author: { name: "Sarah Johnson", avatar: "/placeholder.svg", username: "sarahdev" },
    category: "Technology",
    readTime: "5 min read",
    publishedAt: "2024-07-01T10:00:00Z",
    likes: 124,
    comments: 18,
    views: 2341,
  },
  {
    id: 2,
    title: "My Journey Through Southeast Asia: A Photo Story",
    excerpt:
      "Join me as I explore the vibrant cultures, stunning landscapes, and incredible food across Southeast Asia.",
    author: { name: "Mike Chen", avatar: "/placeholder.svg", username: "miketravel" },
    category: "Travel",
    readTime: "8 min read",
    publishedAt: "2024-06-25T14:30:00Z",
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
    publishedAt: "2024-06-28T09:15:00Z",
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
    publishedAt: "2024-06-27T11:45:00Z",
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
    publishedAt: "2024-06-18T16:00:00Z",
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
    publishedAt: "2024-06-26T08:00:00Z",
    likes: 98,
    comments: 15,
    views: 1882,
  },
  {
    id: 7,
    title: "The Future of Sustainable Fashion",
    excerpt: "An in-depth look at how designers and consumers are pushing for eco-friendly practices.",
    author: { name: "Chloe Green", avatar: "/placeholder.svg", username: "chloestyle" },
    category: "Fashion",
    readTime: "7 min read",
    publishedAt: "2024-07-02T11:00:00Z",
    likes: 180,
    comments: 25,
    views: 3800,
  },
  {
    id: 8,
    title: "Beginner's Guide to Investing in Stocks",
    excerpt: "Everything you need to know to start your investment journey with confidence.",
    author: { name: "David Kim", avatar: "/placeholder.svg", username: "davidfinance" },
    category: "Finance",
    readTime: "9 min read",
    publishedAt: "2024-06-20T10:00:00Z",
    likes: 210,
    comments: 45,
    views: 5100,
  },
]

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("latest") // 'latest', 'oldest', 'most-liked', 'most-viewed'

  useEffect(() => {
    // Simulate fetching data from a database
    const fetchBlogs = async () => {
      setLoading(true)
      // In a real app, this would be an API call:
      // const response = await fetch('/api/blogs');
      // const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
      setBlogs(mockBlogs)
      setLoading(false)
    }

    fetchBlogs()
  }, [])

  const filteredAndSortedBlogs = useMemo(() => {
    let currentBlogs = [...blogs]

    // 1. Filter by search term
    if (searchTerm) {
      currentBlogs = currentBlogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // 2. Sort
    switch (sortBy) {
      case "latest":
        currentBlogs.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        break
      case "oldest":
        currentBlogs.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt))
        break
      case "most-liked":
        currentBlogs.sort((a, b) => b.likes - a.likes)
        break
      case "most-viewed":
        currentBlogs.sort((a, b) => b.views - a.views)
        break
      default:
        break
    }

    return currentBlogs
  }, [blogs, searchTerm, sortBy])

  return (
    <div className="min-h-screen bg-[#f5f1eb] py-16">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-serif font-bold text-black mb-2">Our Blog Collection</h2>
          <p className="text-lg text-gray-600">Explore articles on various topics.</p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search blogs by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-gray-300 focus:border-black focus:ring-black rounded-md "
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <Select onValueChange={setSortBy} defaultValue={sortBy}>
            <SelectTrigger className="w-full sm:w-[180px] border-gray-300 focus:border-black focus:ring-black text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 shadow-lg">
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="most-liked">Most Liked</SelectItem>
              <SelectItem value="most-viewed">Most Viewed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Blog List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-screen">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col items-stretch">
                <div className="folder-bg rounded-lg p-12 flex flex-col justify-between gap-4 animate-pulse">
                  <div className="flex flex-col gap-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                  <div className="flex items-center gap-5 text-sm text-gray-600">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="flex justify-between px-10 items-center text-sm text-gray-600 mt-2">
                  <div className="flex items-center gap-4">
                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                  </div>
                  <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredAndSortedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedBlogs.map((blog) => (
              <BlogFolderCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 text-lg py-20">No blogs found matching your criteria.</div>
        )}
      </div>
    </div>
  )
}
