import { Heart, MessageCircle, Share2, Clock, Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function BlogFolderCard({ blog }) {
  const navigate = useNavigate()
  const handleShare = (e) => {
  e.stopPropagation();

  const shareData = {
    title: blog.title,
    text: blog.excerpt,
    url: `${window.location.origin}/blog/${blog.id}`,
  };

  if (navigator.share) {
    navigator.share(shareData).catch((err) => {
      console.error("Sharing failed", err);
    });
  } else {
    navigator.clipboard.writeText(shareData.url)
      .then(() => alert("Link copied to clipboard!"))
      .catch(() => alert("Failed to copy link."));
  }
};


  return (
    <div
      onClick={() => navigate(`/blog/${blog.id}`)}
      className="flex flex-col items-stretch cursor-pointer transition-shadow  rounded-lg"
    >
      {/* Folder Container */}
      <div className="folder-bg rounded-lg p-12 flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-gray-700">
            {blog.category}
          </div>
          <h3 className="text-2xl font-bold text-black font-serif leading-snug hover:text-[#e67300] transition-colors">
            {blog.title}
          </h3>
          <p className="text-gray-700 text-sm line-clamp-3">
            {blog.excerpt}
          </p>
        </div>

        <div className="flex items-center gap-5 text-sm text-gray-600">
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {blog.readTime}
          </span>
          <span className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            {blog.views.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Footer: likes, comments, share */}
      <div className="flex justify-between px-10 items-center text-sm text-gray-600 mt-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center hover:text-red-500">
            <Heart className="w-4 h-4 mr-1" />
            {blog.likes}
          </span>
          <span className="flex items-center hover:text-blue-500">
            <MessageCircle className="w-4 h-4 mr-1" />
            {blog.comments}
          </span>
        </div>
        <button
  onClick={handleShare}
  className="hover:text-gray-900 bg-black text-white p-2 rounded-md"
>
  <Share2 className="w-4 h-4" />
</button>

      </div>
    </div>
  )
}
