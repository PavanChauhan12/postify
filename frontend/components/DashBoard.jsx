"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { PenTool, Eye, Heart, MessageCircle, Plus, Edit3, Trash2, BookOpen } from "lucide-react"
import Navbar from "./NavBar"
import BlogFolderCard from "@/components/BlogFolderCard"

export default function Dashboard() {
  // Mock user data
  const [user] = useState({
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    joinedDate: "March 2024",
  })

  // Mock blog data
  const [blogs] = useState([
    {
      id: 1,
      title: "10 Essential Tips for Modern Web Development",
      excerpt: "Discover the latest trends and best practices that every web developer should know in 2024.",
      status: "published",
      publishedAt: "2 days ago",
      views: 2341,
      likes: 124,
      comments: 18,
      category: "Technology",
    },
    {
      id: 2,
      title: "The Art of Minimalist Living",
      excerpt: "How embracing minimalism transformed my life and how you can start your own journey to simplicity.",
      status: "draft",
      publishedAt: null,
      views: 0,
      likes: 0,
      comments: 0,
      category: "Lifestyle",
    },
    {
      id: 3,
      title: "Mastering CSS Grid: Real-World Use Cases",
      excerpt: "Understand how to use CSS Grid effectively with practical examples and layout tips.",
      status: "published",
      publishedAt: "1 week ago",
      views: 1294,
      likes: 76,
      comments: 10,
      category: "Design",
    },
  ])

  const stats = {
    totalBlogs: blogs.length,
    publishedBlogs: blogs.filter((blog) => blog.status === "published").length,
    totalViews: blogs.reduce((sum, blog) => sum + blog.views, 0),
    totalLikes: blogs.reduce((sum, blog) => sum + blog.likes, 0),
  }

  return (
    <div className="min-h-screen bg-[#f5f1eb] w-screen py-24 overflow-hidden">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-black">Welcome back, {user.name}!</h1>
              <p className="text-gray-600 mt-1">Manage your blogs and track your progress</p>
            </div>
            <Link to="/create">
              <Button className="mt-4 sm:mt-0 bg-black hover:bg-gray-800 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create New Blog
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Blogs</p>
                  <p className="text-2xl font-bold text-black">{stats.totalBlogs}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-black">{stats.publishedBlogs}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <PenTool className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-black">{stats.totalViews.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Likes</p>
                  <p className="text-2xl font-bold text-black">{stats.totalLikes}</p>
                </div>
                <div className="p-3 bg-pink-100 rounded-full">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Blogs */}
        <Card className="bg-white border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-serif text-black">Your Blogs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogFolderCard key={blog.id} blog={blog} />
          ))}
        </div>
      </CardContent>
    </Card>
      </div>
    </div>
  )
}
