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
    navigate("/home")
  }

  const navLinks = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Blogs", href: "/blogs", icon: PenTool },
  ]

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 bg-[#f5f1eb]/95 backdrop-blur-md rounded-full border border-[#e0d9cf] px-6 py-2 shadow-md flex items-center space-x-4 z-50 w-auto max-w-full">
      {/* Logo */}
      <Link to="/home" className="text-lg md:text-xl font-dancing font-bold text-black">
        postify
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-3">
        {navLinks.map((link) => {
          const Icon = link.icon
          const active = location.pathname === link.href
          return (
            <Link
              key={link.name}
              to={link.href}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition ${
                active
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-[#e0d9cf] hover:text-black"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          )
        })}
      </div>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex items-center gap-2">
        {user ? (
          <>
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="text-black border-black hover:bg-black hover:text-white">
                <User className="w-4 h-4 mr-1" />
                Dashboard
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-black">
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/signin">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-black text-white hover:bg-gray-800">
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#f5f1eb]/95 rounded-lg shadow-lg p-4 border border-[#e0d9cf] w-64 z-50 flex flex-col space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-700 hover:bg-[#e0d9cf]"
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </Link>
          ))}

          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-[#e0d9cf] rounded-md flex items-center gap-2">
                <User className="w-5 h-5" />
                Dashboard
              </Link>
              <button onClick={() => { handleLogout(); setIsMenuOpen(false) }} className="px-4 py-2 text-gray-700 hover:bg-[#e0d9cf] rounded-md flex items-center gap-2">
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-[#e0d9cf] rounded-md text-center">
                Sign In
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-md text-center">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
