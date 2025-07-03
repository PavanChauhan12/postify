"use client"

import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react" // Import useEffect
import MDEditor from "@uiw/react-md-editor"
import { Button } from "@/components/ui/button"
import { Save, Eye, ArrowLeft } from "lucide-react"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
// import api from "../services/api"; // Uncomment when blog APIs are ready

export default function WriteContent() {
  const { state: metadata } = useLocation()
  const navigate = useNavigate()
  const [content, setContent] = useState(metadata?.content || "") // Initialize content from metadata
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Update metadata.content if content changes, so it's always fresh when navigating back
  useEffect(() => {
    if (metadata) {
      metadata.content = content
    }
  }, [content, metadata])

  const handleSave = async (status) => {
    setError(null)
    setIsLoading(true)
    const fullBlog = {
      ...metadata,
      content,
      status,
    }

    // --- IMPORTANT: Placeholder for blog creation API call ---
    // The backend code you provided does not include blog-specific endpoints.
    // You will need to implement these in your backend (e.g., POST /api/blogs)
    // and then uncomment and use the `api.createBlog` function here.
    try {
      // Example: await api.createBlog(fullBlog);
      console.log("Simulating saving blog:", fullBlog)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      alert(`Blog saved as ${status}!`)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message || "Failed to save blog.")
      console.error("Save blog error:", err)
    } finally {
      setIsLoading(false)
    }
    // --- End of Placeholder ---
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

      <h1 className="text-2xl font-bold mb-4">{metadata?.title || "Untitled"}</h1>

      <MDEditor value={content} onChange={setContent} height={600} />
    </div>
  )
}
