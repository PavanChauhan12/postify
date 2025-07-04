"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Eye,
  Heart,
  Clock,
  MessageCircle,
  ArrowLeft,
} from "lucide-react"
import api from "../services/api"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [error, setError] = useState(null)
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.getBlogById(id)
        setBlog(res)
        setLikes(Array.isArray(res.likes) ? res.likes.length : (Number(res.likes) || 0))
        setComments(res.comments || [])
      } catch (err) {
        setError("Failed to fetch blog")
        console.error(err)
      }
    }

    const fetchUser = async () => {
      try {
        const userData = await api.getProfile()
        setUser(userData)
      } catch (err) {
        setUser(null)
      }
    }

    fetchBlog()
    fetchUser()
  }, [id])

  const handleLike = async () => {
    try {
      const updatedBlog = await api.likeBlog(id)
      setLikes(Array.isArray(updatedBlog.likes) ? updatedBlog.likes.length : (Number(updatedBlog.likes) || 0))
    } catch (err) {
      console.error("Failed to like blog", err)
    }
  }

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return
    setIsSubmitting(true)

    try {
      const updatedBlog = await api.commentBlog(id, {
        name: user.name,
        text: commentText.trim(),
      })
      setComments(updatedBlog.comments || [])
      setCommentText("")
    } catch (err) {
      console.error("Failed to submit comment", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>
  }

  if (!blog) {
    return <p className="text-center text-gray-600 py-10">Loading blog...</p>
  }

  return (
    <div className="bg-[#f5f1eb] min-h-screen">
      <div className="w-full px-4 pb-16">
        {/* Header Row (Title + Back) */}
        <div className="flex items-center justify-between mb-6">
          <Button onClick={() => navigate(-1)} className="text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-black leading-tight text-center w-full">
            {blog.title}
          </h1>
        </div>

        {/* Centered Blog Content */}
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2 text-center">
            {blog.category || "Uncategorized"}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-sm mb-10">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {blog.readTimeManual
                ? `${blog.readTimeManual} min read`
                : `${Math.ceil((blog.content?.length || 500) / 500)} min read`}
            </span>
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {blog.views?.toLocaleString() || 0}
            </span>
            <span
              onClick={handleLike}
              className="flex items-center hover:text-red-500 cursor-pointer"
            >
              <Heart className="w-4 h-4 mr-1" />
              {likes}
            </span>
            <span className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              {comments.length}
            </span>
            {blog.publishedAt && (
              <span>
                • {new Date(blog.publishedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </div>

          <hr className="mb-10 border-gray-300" />

          {/* Blog Content */}
          <article
            className="prose prose-lg prose-slate prose-headings:font-serif max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="mt-12 text-sm text-gray-400 italic text-center">
            Written by {blog.author?.name || "Unknown Author"}
          </div>

          {/* Comment Input - Only if logged in */}
          {user && (
            <div className="mt-16 mb-10">
              <h2 className="text-xl font-semibold mb-4">Leave a Comment</h2>
              <div className="flex flex-col gap-3">
                <Textarea
                  placeholder="Your comment"
                  rows={4}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  onClick={handleCommentSubmit}
                  disabled={isSubmitting}
                  className="w-fit bg-black text-white"
                >
                  {isSubmitting ? "Submitting..." : "Post Comment"}
                </Button>
              </div>
            </div>
          )}

          {/* Comments List */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            {comments.length === 0 ? (
              <p className="text-gray-500 italic">No comments yet.</p>
            ) : (
              <ul className="space-y-4">
                {comments.map((comment, idx) => (
                  <li
                    key={idx}
                    className="bg-white p-4 rounded-lg shadow border border-gray-200"
                  >
                    <p className="text-sm text-gray-800">{comment.text}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      — {comment.name || "Anonymous"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
