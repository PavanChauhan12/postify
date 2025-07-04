import { Link } from "react-router-dom"
import { Instagram, Twitter, Mail } from "lucide-react"
import { PinnedCard } from "./PinnedCard"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white py-12 md:py-16 border-t border-gray-100 grid-bg font-bold h-fit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Brand */}
        <PinnedCard className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start w-fit p-12">
          <h1 className="!text-7xl font-dancing font-bold text-black text-center w-full mb-4">postify</h1>
          <div className="text-left max-w-2xl">
            <p className="text-md text-gray-600 leading-relaxed">
              Your favorite choice for creating, sharing, and discovering amazing blog content.
              Whether you're a reader, a writer, or just someone who loves storytelling, Postify
              empowers you with a beautiful platform to explore your voice and reach a broader audience.
            </p>
            <p className="text-xs text-gray-500 mt-4">&copy; {currentYear} Postify. All rights reserved.</p>
          </div>
        </PinnedCard>

        {/* Contact Us */}
        <PinnedCard className="w-full p-12">
  <h3 className="text-5xl font-dancing font-bold text-black mb-4 text-center ml-12">Contact Us</h3>
  <div className="space-y-4 text-md text-gray-700">
    
    {/* Email */}
    <div className="flex flex-col">
      <span className="text-gray-500 font-medium">Email</span>
      <a href="mailto:info@postify.com" className="hover:text-black transition-colors">
        info@postify.com
      </a>
    </div>

    {/* Phone */}
    <div className="flex flex-col">
      <span className="text-gray-500 font-medium">Phone</span>
      <a href="tel:+11234567890" className="hover:text-black transition-colors">
        +1 (123) 456-7890
      </a>
    </div>

    {/* Address */}
    <div className="flex flex-col">
      <span className="text-gray-500 font-medium">Address</span>
      <address className="not-italic">
        123 Blog Street, Suite 456<br />
        Blogger City, BC 78901
      </address>
    </div>
  </div>
</PinnedCard>

      </div>

      {/* Follow Us Section */}
      <div className="mt-10 flex flex-col items-center justify-center text-center">
        <h3 className="text-4xl font-dancing font-bold text-black mb-6">Follow Us</h3>
        <div className="flex space-x-20">
          <a href="#" className="w-15 h-15 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200">
            <Instagram className="w-8 h-10 text-pink-600" />
          </a>
          <a href="#" className="w-15 h-15 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200">
            <Twitter className="w-8 h-8 text-purple-600" />
          </a>
          <a href="#" className="w-15 h-15 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
            <Mail className="w-8 h-8 text-gray-600" />
          </a>
        </div>
      </div>
    </footer>
  )
}
