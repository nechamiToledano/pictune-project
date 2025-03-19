"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut, Settings, Camera, Music, Upload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useNavigate } from "react-router-dom"

interface UserProfileDialogProps {
  userName?: string
  userEmail?: string
  userImage?: string
  onLogout?: () => void
}

export default function UserProfileDialog({
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  userImage = "/placeholder.svg?height=96&width=96",
  onLogout,
}: UserProfileDialogProps) {
const navigate=useNavigate();
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      // Default logout behavior
      navigate("/")
    }
    setOpen(false)
  }

  const handleNavigation = (path: string) => {
    navigate(path)
    setOpen(false)
  }

  const userInitials = userName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 border border-gray-800">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback className="bg-gradient-to-r from-red-600 to-blue-600 text-white">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-black/90 backdrop-blur-md text-white border-gray-800 shadow-xl">
        <div className="h-1 w-full bg-gradient-to-r from-red-600 to-blue-600 -mt-6 mb-4 mx-auto"></div>
        <DialogHeader>
          <DialogTitle className="text-xl">User Profile</DialogTitle>
          <DialogDescription className="text-gray-400">Manage your account settings and preferences</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center py-4">
          <div className="relative group">
            <Avatar className="h-24 w-24 mb-4 border-4 border-black/40 shadow-xl">
              <AvatarImage src={userImage} alt={userName} />
              <AvatarFallback className="bg-gradient-to-r from-red-600 to-blue-600 text-white text-2xl">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-3 right-0 rounded-full bg-black/60 text-white hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <h3 className="text-lg font-medium">{userName}</h3>
          <p className="text-sm text-gray-400">{userEmail}</p>
        </div>
        <div className="grid gap-3 py-4">
          <Button
            variant="outline"
            className="w-full justify-start text-white border-gray-700 hover:bg-gray-800 py-5"
            onClick={() => handleNavigation("/dashboard?tab=profile")}
          >
            <User className="mr-2 h-4 w-4" />
            View Profile
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-white border-gray-700 hover:bg-gray-800 py-5"
            onClick={() => handleNavigation("/dashboard?tab=music")}
          >
            <Music className="mr-2 h-4 w-4" />
            My Music
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-white border-gray-700 hover:bg-gray-800 py-5"
            onClick={() => handleNavigation("/dashboard?tab=upload")}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Music
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-white border-gray-700 hover:bg-gray-800 py-5"
            onClick={() => handleNavigation("/settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Button>
          <Button
            className="w-full justify-start bg-gradient-to-r from-red-900/80 to-red-800/80 hover:from-red-900 hover:to-red-800 py-5 mt-2"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

