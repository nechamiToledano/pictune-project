"use client"

import { useState, useEffect } from "react"
import {  ChevronDown, Music, User, Info, Phone, Home } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import UserProfileDialog from './UserProfileDialog'
import { Link } from "react-router-dom"
import {Avatar, AvatarImage } from "../ui/avatar"
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])



  return (
    <nav
      className={`fixed top-0 left-0 w-full text-white z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <Link to="/">
           
            <Avatar  className="relative w-12 h-12  rounded-lg overflow-hidden flex items-center justify-center">
                <AvatarImage src="/logo.png"></AvatarImage>
              </Avatar>             
          
          </Link>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-400">
              Pictune
            </span>
        </div>


        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Home size={18} />
            <span>Home</span>
          </Link>

          {/* About Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 text-white hover:text-primary hover:bg-gray-800 px-3 py-2"
              >
                <Info size={18} />
                <span>About</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
              <DropdownMenuGroup>
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                  <Link to="/about" className="flex w-full">
                    Our Story
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                  <Link to="/team" className="flex w-full">
                    Our Team
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                  <Link to="/mission" className="flex w-full">
                    Our Mission
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 text-white hover:text-primary hover:bg-gray-800 px-3 py-2"
              >
                <Music size={18} />
                <span>Services</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
              <DropdownMenuGroup>
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                  <Link to="/services/music-generation" className="flex w-full">
                    Music Generation
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                  <Link to="/services/image-to-music" className="flex w-full">
                   Music to  Image
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                  <Link to="/services/text-to-music" className="flex w-full">
                     Music to Text
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                <Link to="/pricing" className="flex w-full">
                  Pricing
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/contact" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Phone size={18} />
            <span>Contact</span>
          </Link>

          {isLoggedIn ? (
            <>
              {/* Music Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-white hover:text-primary hover:bg-gray-800 px-3 py-2"
                  >
                    <Music size={18} />
                    <span>Music</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                      <Link to="/all-music" className="flex w-full">
                        All Music
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                      <Link to="/my-music" className="flex w-full">
                        My Music
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                      <Link to="/favorites" className="flex w-full">
                        Favorites
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                    <Link to="/create" className="flex w-full">
                      Upload New
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <UserProfileDialog />
            </>
          ) : (
            <>
              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-white hover:text-primary hover:bg-gray-800 px-3 py-2"
                  >
                    <User size={18} />
                    <span>Account</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                      <Link to="/signin" className="flex w-full">
                        Sign In
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                      <Link to="/signup" className="flex w-full">
                        Sign Up
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

