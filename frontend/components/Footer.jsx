import { Link } from "react-router-dom"
import { Instagram, Twitter, Mail } from "lucide-react"
import { PinnedCard } from "./PinnedCard" // the wrapper you just created

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white py-12 md:py-16 border-t border-gray-100 grid-bg font-bold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        <PinnedCard className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
          <Link to="/" className="mb-4">
            <h1 className="text-4xl font-dancing font-bold text-black">postify</h1>
          </Link>
          <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
            Your favorite choice for creating, sharing, and discovering amazing blog content.
          </p>
          <p className="text-xs text-gray-500 mt-4">&copy; {currentYear} Postify. All rights reserved.</p>
        </PinnedCard>

        <PinnedCard>
          <h3 className="text-lg font-serif font-semibold text-black mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><Link to="/home" className="hover:text-black transition-colors">Home</Link></li>
            <li><Link to="/blogs" className="hover:text-black transition-colors">Blogs</Link></li>
            <li><Link to="/about" className="hover:text-black transition-colors">About Us</Link></li>
            <li><Link to="/dashboard" className="hover:text-black transition-colors">Dashboard</Link></li>
          </ul>
        </PinnedCard>

        <PinnedCard>
          <h3 className="text-lg font-serif font-semibold text-black mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><a href="mailto:info@postify.com" className="hover:text-black transition-colors">info@postify.com</a></li>
            <li><a href="tel:+11234567890" className="hover:text-black transition-colors">+1 (123) 456-7890</a></li>
            <li>123 Blog Street, Suite 456<br />Blogger City, BC 78901</li>
          </ul>
        </PinnedCard>

        <PinnedCard>
          <h3 className="text-lg font-serif font-semibold text-black mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200">
              <Instagram className="w-5 h-5 text-pink-600" />
            </a>
            <a href="#" className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200">
              <Twitter className="w-5 h-5 text-purple-600" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
              <Mail className="w-5 h-5 text-gray-600" />
            </a>
          </div>
        </PinnedCard>
      </div>
    </footer>
  )
}
