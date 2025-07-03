"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, PenTool, Home } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  const handleLogout = () => {
    setUser(null)
    navigate("/")
  }

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Blogs", href: "/blogs", icon: PenTool },
  ]

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-2 w-fit max-w-full border border-[#e0d9cf] rounded-full bg-[#f5f1eb]/95 backdrop-blur-md shadow-md flex items-center space-x-4 font-serif text-sm">
      {/* Logo */}
     <h1 className="!text-xl font-dancing ">
  <Link to="/" className="!text-black hover:!text-black">
    postify
  </Link>
</h1>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-3">
        {navLinks.map(({ name, href, icon: Icon }) => {
          const isActive = location.pathname === href
          return (
            <Link
              key={name}
              to={href}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
                isActive
                  ? "bg-[#f8dbe0] !text-black hover:!text-black font-semibold"
                  : "!text-black hover:!text-black hover:bg-[#eae4da]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {name}
            </Link>
          )
        })}
      </div>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex items-center gap-2">
        {user ? (
          <>
            <Link to="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="text-[#2f2f2f] border-[#2f2f2f] bg-white hover:bg-[#2f2f2f] hover:text-white font-medium"
              >
                <User className="w-4 h-4 mr-1" />
                Dashboard
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-600 hover:text-[#2f2f2f]"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/signin">
              <Button size="sm" variant="default">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" variant="default">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#f5f1eb]/95 rounded-xl shadow-lg p-4 border border-[#e0d9cf] w-64 z-50 flex flex-col space-y-3 text-sm font-serif">
          {navLinks.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              to={href}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                location.pathname === href
                  ? "bg-[#f8dbe0] text-black font-semibold"
                  : "text-black hover:bg-[#eae4da] hover:text-black"
              }`}
            >
              <Icon className="w-5 h-5" />
              {name}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-[#2f2f2f] hover:bg-[#eae4da] rounded-md"
              >
                <User className="w-5 h-5" />
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
                className="flex items-center gap-2 px-4 py-2 text-[#2f2f2f] hover:bg-[#eae4da] rounded-md"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 bg-[#bdddef] text-[#2f2f2f] hover:bg-[#a9d3eb] rounded-md text-center font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 bg-[#f2cbd3] text-[#2f2f2f] hover:bg-[#e8b9c2] rounded-md text-center font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
