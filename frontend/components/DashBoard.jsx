"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  PenTool,
  Eye,
  Heart,
  MessageCircle,
  Plus,
  Edit3,
  Trash2,
  BookOpen,
} from "lucide-react"
import api from "../services/api"

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [userBlogs, setUserBlogs] = useState([])
  const [loadingUser, setLoadingUser] = useState(true)
  const [errorUser, setErrorUser] = useState(null)

  useEffect(() => {
    const fetchUserProfileAndBlogs = async () => {
      setLoadingUser(true)
      setErrorUser(null)
      try {
        const userData = await api.getProfile()
        setUser(userData)
        setUserBlogs(userData.blogs || [])
      } catch (err) {
        setErrorUser(err.message || "Failed to load user profile.")
        console.error("Dashboard user fetch error:", err)
        if (
          err.message.includes("token") ||
          err.message.includes("log in") ||
          err.message.includes("Session expired")
        ) {
          api.logout()
          navigate("/signin")
        }
      } finally {
        setLoadingUser(false)
      }
    }

    fetchUserProfileAndBlogs()
  }, [navigate])

  const stats = {
    totalBlogs: userBlogs.length,
    publishedBlogs: userBlogs.filter((blog) => blog.status === "published").length,
    totalViews: userBlogs.reduce((sum, blog) => sum + (Number(blog.views) || 0), 0),
    totalLikes: userBlogs.reduce((sum, blog) => sum + (Number(blog.likes) || 0), 0),
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
                  <p className="text-2xl font-bold text-black">
                    {stats.totalViews.toLocaleString()}
                  </p>
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

        {/* Blog List */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-black">Your Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userBlogs.length > 0 ? (
                userBlogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-black hover:text-gray-700">
                            {blog.title}
                          </h3>
                          <Badge
                            variant={blog.status === "published" ? "default" : "secondary"}
                            className={
                              blog.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {blog.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{blog.excerpt}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {(blog.views ?? 0).toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {blog.likes ?? 0}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {blog.comments ?? 0}
                          </span>
                          {blog.publishedAt && (
                            <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                          )}
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
