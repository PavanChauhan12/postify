"use client";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Save, Eye, ArrowLeft } from "lucide-react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

export default function WriteContent() {
  const { state: metadata } = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleSave = (status) => {
    const fullBlog = {
      ...metadata,
      content,
      status,
    };

    // Replace with real API call
    console.log("Saving blog:", fullBlog);
    navigate("/dashboard");
  };

  return (
    <div className="px-10  py-10 w-screen">
      <div className="flex justify-between mb-6">
        <Button onClick={() => navigate(-1)}><ArrowLeft className="mr-2" /> Back</Button>
        <div className="flex space-x-3">
          <Button onClick={() => handleSave("draft")}><Save className="mr-2" /> Save Draft</Button>
          <Button className="bg-black text-white" onClick={() => handleSave("published")}><Eye className="mr-2" /> Publish</Button>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">{metadata?.title || "Untitled"}</h1>

      <MDEditor value={content} onChange={setContent} height={600} />
    </div>
  );
}
