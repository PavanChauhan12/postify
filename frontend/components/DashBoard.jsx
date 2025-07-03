"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PenTool, Eye, Heart, MessageCircle, Plus, Edit3, Trash2, BookOpen } from "lucide-react"
import api from "../services/api" // Import the API service

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null) // User data from API
  const [loadingUser, setLoadingUser] = useState(true)
  const [errorUser, setErrorUser] = useState(null)

  // Mock blog data (since backend blog APIs are not yet defined)
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoadingUser(true)
      setErrorUser(null)
      try {
        const userData = await api.getProfile()
        setUser(userData)
      } catch (err) {
        setErrorUser(err.message || "Failed to load user profile.")
        console.error("Dashboard user fetch error:", err)
        // If token is invalid or missing, redirect to sign-in
        if (err.message.includes("token") || err.message.includes("log in")) {
          api.logout() // Clear invalid token
          navigate("/signin")
        }
      } finally {
        setLoadingUser(false)
      }
    }

    fetchUserProfile()
  }, [navigate])

  const stats = {
    totalBlogs: blogs.length,
    publishedBlogs: blogs.filter((blog) => blog.status === "published").length,
    totalViews: blogs.reduce((sum, blog) => sum + blog.views, 0),
    totalLikes: blogs.reduce((sum, blog) => sum + blog.likes, 0),
  }

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-[#f5f1eb] flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading dashboard...</p>
      </div>
    )
  }

  if (errorUser) {
    return (
      <div className="min-h-screen bg-[#f5f1eb] flex flex-col items-center justify-center p-4">
        <p className="text-red-500 text-lg mb-4">{errorUser}</p>
        <Button onClick={() => navigate("/signin")} className="bg-black hover:bg-gray-800 text-white">
          Go to Sign In
        </Button>
      </div>
    )
  }

  if (!user) {
    // This case should ideally be caught by errorUser or loadingUser, but as a fallback
    return (
      <div className="min-h-screen bg-[#f5f1eb] flex flex-col items-center justify-center p-4">
        <p className="text-gray-600 text-lg mb-4">User data not available. Please sign in.</p>
        <Button onClick={() => navigate("/signin")} className="bg-black hover:bg-gray-800 text-white">
          Sign In
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f1eb]">
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-black">Welcome back, {user.name}!</h1>
              <p className="text-gray-600 mt-1">Manage your blogs and track your progress</p>
            </div>
            <Link to="/create-blog">
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
            <div className="space-y-4">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-black hover:text-gray-700">{blog.title}</h3>
                          <Badge
                            variant={blog.status === "published" ? "default" : "secondary"}
                            className={
                              blog.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {blog.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{blog.excerpt}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {blog.views.toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {blog.likes}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {blog.comments}
                          </span>
                          {blog.publishedAt && <span>{blog.publishedAt}</span>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">You haven't created any blogs yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
