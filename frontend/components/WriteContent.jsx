"use client"

import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import MDEditor from "@uiw/react-md-editor"
import { Button } from "@/components/ui/button"
import { Save, Eye, ArrowLeft } from "lucide-react"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import api from "../services/api"

export default function WriteContent() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [blogId, setBlogId] = useState(state?.blogId || null)
  const [title, setTitle] = useState(state?.title || "Untitled Blog")
  const [content, setContent] = useState(state?.content || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSave = async (status) => {
    setError(null)
    setIsLoading(true)

    if (!blogId) {
      setError("Blog ID is missing. Cannot save content.")
      setIsLoading(false)
      return
    }

    if (status === "published" && !content.trim()) {
      setError("Blog content cannot be empty when publishing.")
      setIsLoading(false)
      return
    }

    try {
      const updatedBlog = await api.updateBlog(blogId, {
        content,
        status,
      })

      alert(`Blog saved as ${updatedBlog.status}!`)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message || "Failed to save blog.")
      console.error("Save blog error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="px-10 py-10 w-screen">
      <div className="flex justify-between mb-6">
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2" /> Back
        </Button>
        <div className="flex space-x-3">
          <Button onClick={() => handleSave("draft")} disabled={isLoading}>
            <Save className="mr-2" /> Save Draft
          </Button>
          <Button className="bg-black text-white" onClick={() => handleSave("published")} disabled={isLoading}>
            <Eye className="mr-2" /> Publish
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      <MDEditor value={content} onChange={setContent} height={600} />
    </div>
  )
}
