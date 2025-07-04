"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PenTool, Eye, Heart, Plus, BookOpen, TrendingUp, MessageCircle, Share2, Clock } from "lucide-react"
import api from "../services/api"
import Navbar from "./NavBar"
import BlogFolderCard from "./BlogFolderCard"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [userBlogs, setUserBlogs] = useState([])
  const [loadingUser, setLoadingUser] = useState(true)
  const [errorUser, setErrorUser] = useState(null)
  const [viewsData, setViewsData] = useState([])

  useEffect(() => {
    const fetchUserProfileAndBlogs = async () => {
      setLoadingUser(true)
      setErrorUser(null)
      try {
        const userData = await api.getProfile()
        setUser(userData)
        setUserBlogs(userData.blogs || [])
        aggregateWeeklyViews(userData.blogs || [])
      } catch (err) {
        setErrorUser(err.message || "Failed to load user profile.")
        console.error("Dashboard user fetch error:", err)
        if (err.message.includes("token") || err.message.includes("log in") || err.message.includes("Session expired")) {
          api.logout()
          navigate("/signin")
        }
      } finally {
        setLoadingUser(false)
      }
    }

    fetchUserProfileAndBlogs()
  }, [navigate])

  const aggregateWeeklyViews = (blogs) => {
    const viewMap = {}

    blogs.forEach(blog => {
      const daily = blog.dailyViews || []
      daily.forEach(entry => {
        const dateObj = new Date(entry.date)
        const year = dateObj.getFullYear()
        const getWeekNumber = (d) => {
          const target = new Date(d.valueOf())
          const dayNr = (d.getDay() + 6) % 7
          target.setDate(target.getDate() - dayNr + 3)
          const firstThursday = new Date(target.getFullYear(), 0, 4)
          const diff = target - firstThursday
          return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000))
        }
        const week = getWeekNumber(dateObj)
        const key = `Week ${week} (${year})`
        viewMap[key] = (viewMap[key] || 0) + (entry.count || 0)
      })
    })

    const sortedKeys = Object.keys(viewMap).sort((a, b) => {
      const weekA = parseInt(a.match(/Week (\d+)/)?.[1] || 0)
      const weekB = parseInt(b.match(/Week (\d+)/)?.[1] || 0)
      return weekA - weekB
    })

    const chartData = sortedKeys.map(week => ({
      date: week,
      views: viewMap[week]
    }))

    setViewsData(chartData)
  }

  const stats = {
    totalBlogs: userBlogs.length,
    publishedBlogs: userBlogs.filter(blog => blog.status === "published").length,
    totalViews: userBlogs.reduce((sum, blog) => sum + (Number(blog.views) || 0), 0),
    totalLikes: userBlogs.reduce(
      (sum, blog) => sum + (Array.isArray(blog.likes) ? blog.likes.length : Number(blog.likes) || 0),
      0
    ),
  }

  const initialViews = viewsData.length > 0 ? viewsData[0].views : 0
  const latestViews = viewsData.length > 0 ? viewsData[viewsData.length - 1].views : 0
  const viewsPercentageIncrease = initialViews > 0
    ? (((latestViews - initialViews) / initialViews) * 100).toFixed(1)
    : "0.0"

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
    <div className="min-h-screen bg-[#f5f1eb] pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Navbar />
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Add stat cards here */}
        </div>

        <Card className="bg-white border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-black">Weekly Views Trend</CardTitle>
            <div className="flex items-center text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
              <span className="font-semibold text-green-600">{viewsPercentageIncrease}%</span> increase in views
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ views: { label: "Views", color: "hsl(var(--chart-1))" } }} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={viewsData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} minTickGap={30} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Line dataKey="views" type="monotone" stroke="black" strokeWidth={2} dot={false} activeDot={{ r: 6, style: { fill: "hsl(var(--chart-1))" } }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-black">Your Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userBlogs.length > 0 ? (
                userBlogs.map(blog => (
                  <div key={blog._id} className="relative">
                    <BlogFolderCard blog={{
                      id: blog._id,
                      title: blog.title,
                      excerpt: blog.excerpt,
                      category: blog.category || "Uncategorized",
                      readTime: blog.readTimeManual
                        ? `${blog.readTimeManual} min read`
                        : `${Math.max(1, Math.ceil((blog.content?.length || 0) / 500))} min read`,
                      views: blog.views || 0,
                      likes: Array.isArray(blog.likes) ? blog.likes.length : Number(blog.likes) || 0,
                      comments: Array.isArray(blog.comments) ? blog.comments.length : Number(blog.comments) || 0,
                      status: blog.status,
                      publishedAt: blog.publishedAt,
                    }} />
                    {blog.status === "draft" && (
  <Button
    size="sm"
    className="absolute top-2 right-2 z-10"
    onClick={(e) => {
      e.stopPropagation()
      navigate(`/edit/${blog._id}`, { state: { blog } })
    }}
  >
    <PenTool className="w-4 h-4 mr-1" /> Edit
  </Button>
)}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full">You haven't created any blogs yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}