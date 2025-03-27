"use client"

import { Button } from "@/components/ui/button"
import { type MusicFile, toggleLikeMusicFile } from "@/store/slices/musicFilesSlice"
import type { AppDispatch } from "@/store/store"
import { Heart, Share2, Download } from "lucide-react"
import { useDispatch } from "react-redux"
import { cn } from "@/lib/utils"

export default function SongActions({ song }: { song: MusicFile }) {
  const dispatch = useDispatch<AppDispatch>()

  const toggleLike = () => {
    dispatch(toggleLikeMusicFile(song.id))
  }

  const downloadSong = () => {
    if (!song) return

    // Create a temporary anchor element
    const a = document.createElement("a")
    a.href = song.s3Key
    a.download = song.fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={cn("rounded-full text-white hover:bg-white/20", song.isLiked && "text-red-500 hover:text-red-400")}
        onClick={toggleLike}
      >
        <Heart className={cn("h-5 w-5", song.isLiked && "fill-current")} />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
        <Share2 className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" onClick={downloadSong}>
        <Download className="h-5 w-5" />
      </Button>
    </>
  )
}

