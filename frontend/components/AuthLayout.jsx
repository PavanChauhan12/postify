import { Link } from "react-router-dom"

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="relative w-full min-h-screen bg-[#f5f1eb] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-40 bg-pink-200 rounded-xl transform -rotate-12 opacity-20" />
        <div className="absolute top-40 right-20 w-28 h-36 bg-blue-200 rounded-xl transform rotate-12 opacity-20" />
        <div className="absolute bottom-32 left-20 w-36 h-44 bg-purple-200 rounded-xl transform rotate-6 opacity-20" />
        <div className="absolute bottom-20 right-10 w-32 h-40 bg-yellow-200 rounded-xl transform -rotate-6 opacity-20" />
      </div>

      {/* Main Content */}
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <Link to="/home">
            <h1 className="text-4xl font-dancing font-bold text-black mb-2">postify</h1>
          </Link>
          <p className="text-xs tracking-[0.3em] uppercase font-medium text-gray-600 mb-8">
            a blogger's favourite choice
          </p>
          <h2 className="text-3xl font-serif font-bold text-black">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {children}
        </div>
      </div>
    </div>
  )
}
