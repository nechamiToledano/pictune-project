"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MusicIcon, InfoIcon, PlayCircle, Heart } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

interface Song {
  id: string
  title: string
  url: string
  artist?: string
}

export default function AllMusic() {
  const [songs, setSongs] = useState<Song[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const songsPerPage = 6

  useEffect(() => {
    // Demo songs - replace with API call
    setSongs([
      { id: "1", title: "First Song", artist: "Artist One", url: "/a.mp3" },
      { id: "2", title: "Second Song", artist: "Artist Two", url: "/a.mp3" },
      { id: "3", title: "Third Song", artist: "Artist Three", url: "/a.mp3" },
      { id: "4", title: "Fourth Song", artist: "Artist Four", url: "/a.mp3" },
      { id: "5", title: "Fifth Song", artist: "Artist Five", url: "/a.mp3" },
      { id: "6", title: "Sixth Song", artist: "Artist Six", url: "/a.mp3" },
      { id: "7", title: "Seventh Song", artist: "Artist Seven", url: "/a.mp3" },
      { id: "8", title: "Eighth Song", artist: "Artist Eight", url: "/a.mp3" },
      { id: "9", title: "Ninth Song", artist: "Artist Nine", url: "/a.mp3" },
      { id: "10", title: "Tenth Song", artist: "Artist Ten", url: "/a.mp3" },
    ])
  }, [])

  // Calculate pagination
  const totalPages = Math.ceil(songs.length / songsPerPage)
  const indexOfLastSong = currentPage * songsPerPage
  const indexOfFirstSong = indexOfLastSong - songsPerPage
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Reset playing state when changing pages
    setIsPlaying(null)
  }

  // Toggle play state
  const togglePlay = (id: string) => {
    setIsPlaying((prev) => (prev === id ? null : id))
  }

  return (
    <div className="py-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-red-600/20 to-blue-600/20 p-2 rounded-full">
          <MusicIcon className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">My Music</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentSongs.map((song) => (
          <div
            key={song.id}
            className="relative rounded-xl overflow-hidden h-full"
            onMouseEnter={() => setHoveredCard(song.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Base gradient layer */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br transition-opacity duration-700 ease-in-out",
                +song.id % 2 === 0
                  ? "from-red-600 via-purple-600 to-blue-600"
                  : "from-blue-600 via-purple-600 to-red-600",
                hoveredCard === song.id ? "opacity-0" : "opacity-100",
              )}
            />

            {/* Hover gradient layer */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-tl transition-opacity duration-700 ease-in-out",
                +song.id % 2 === 0
                  ? "from-blue-500 via-purple-500 to-red-500"
                  : "from-red-500 via-purple-500 to-blue-500",
                hoveredCard === song.id ? "opacity-100" : "opacity-0",
              )}
            />

            {/* Overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

            <Card className="border-0 bg-transparent h-full transition-transform duration-500 ease-out hover:scale-[1.02] relative z-10">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-white font-bold">{song.title}</CardTitle>
                    <p className="text-white/90 text-sm mt-1 font-medium">{song.artist}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-white hover:text-white hover:bg-white/20 transition-colors duration-300"
                  >
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Add to favorites</span>
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="aspect-square relative mb-4 rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm shadow-lg transition-all duration-500 hover:shadow-xl">
                  <img
                    src={`/placeholder.svg?height=400&width=400&text=🎵`}
                    alt={song.title}
                    width={400}
                    height={400}
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-full w-16 h-16 bg-black/40 backdrop-blur-md text-white",
                        "transition-all duration-500 ease-out",
                        "hover:bg-gradient-to-r hover:from-red-600 hover:to-blue-600 hover:text-white hover:scale-110 hover:shadow-lg",
                        isPlaying === song.id
                          ? "bg-gradient-to-r from-red-600 to-blue-600 text-white scale-110 shadow-lg"
                          : "",
                      )}
                      onClick={() => togglePlay(song.id)}
                    >
                      <PlayCircle className="h-10 w-10" />
                    </Button>
                  </div>
                </div>

                <div
                  className={cn(
                    "transition-all duration-500 overflow-hidden",
                    isPlaying === song.id ? "h-16 opacity-100" : "h-0 opacity-0",
                  )}
                >
                  <audio
                    controls
                    className="w-full rounded-lg"
                    autoPlay={isPlaying === song.id}
                    onEnded={() => setIsPlaying(null)}
                  >
                    <source src={song.url} type="audio/mpeg" />
                    Your browser does not support audio playback.
                  </audio>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  asChild
                  className={cn(
                    "w-full gap-2 backdrop-blur-md transition-all duration-300",
                    "bg-white/20 hover:bg-white/30 text-white",
                    "border border-white/10 hover:border-white/20",
                    "shadow-sm hover:shadow-md",
                  )}
                >
                  <Link to={`/songs/${song.id}`}>
                    <InfoIcon className="h-4 w-4" />
                    View Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) handlePageChange(currentPage - 1)
                  }}
                  className={cn(
                    "bg-gray-900 border border-gray-800 text-white hover:bg-gray-800",
                    currentPage === 1 ? "pointer-events-none opacity-50" : "",
                  )}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1
                // Show first page, current page, last page, and one page before and after current
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  pageNumber === currentPage ||
                  pageNumber === currentPage - 1 ||
                  pageNumber === currentPage + 1
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        isActive={pageNumber === currentPage}
                        onClick={(e) => {
                          e.preventDefault()
                          handlePageChange(pageNumber)
                        }}
                        className={cn(
                          "bg-gray-900 border border-gray-800 text-white hover:bg-gray-800",
                          pageNumber === currentPage
                            ? "bg-gradient-to-r from-red-600/50 to-blue-600/50 border-transparent"
                            : "",
                        )}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  )
                }

                // Show ellipsis between non-consecutive pages
                if (
                  (pageNumber === 2 && currentPage > 3) ||
                  (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return (
                    <PaginationItem key={`ellipsis-${pageNumber}`}>
                      <PaginationEllipsis className="text-gray-400" />
                    </PaginationItem>
                  )
                }

                return null
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) handlePageChange(currentPage + 1)
                  }}
                  className={cn(
                    "bg-gray-900 border border-gray-800 text-white hover:bg-gray-800",
                    currentPage === totalPages ? "pointer-events-none opacity-50" : "",
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

