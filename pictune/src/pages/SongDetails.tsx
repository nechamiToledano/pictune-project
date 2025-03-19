"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Share2, Download, PlayCircle, PauseCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
import { n } from "node_modules/framer-motion/dist/types.d-B50aGbjN"

interface Song {
  id: string
  title: string
  url: string
  artist?: string
  lyrics?: string
  releaseDate?: string
  duration?: string
}

interface SongDetailsProps {
  id: string
}

export default function SongDetails({ id }: SongDetailsProps) {
  const navigate = useNavigate();

  const [song, setSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Demo songs data - replace with API call
    const songs: Song[] = [
      {
        id: "1",
        title: "First Song",
        artist: "Artist One",
        url: "/a.mp3",
        lyrics:
          "Here are the lyrics for the first song...\nSecond line of lyrics\nThird line of lyrics\n\nChorus:\nThis is the chorus of the song\nAnother line in the chorus",
        releaseDate: "01/01/2023",
        duration: "3:45",
      },
      {
        id: "2",
        title: "Second Song",
        artist: "Artist Two",
        url: "/a.mp3",
        lyrics:
          "Lyrics for the second song...\nAnother line of lyrics\nYet another line\n\nChorus:\nChorus of the second song\nMore chorus",
        releaseDate: "15/03/2023",
        duration: "4:12",
      },
      {
        id: "3",
        title: "Third Song",
        artist: "Artist Three",
        url: "/a.mp3",
        lyrics:
          "Lyrics for the third song...\nAnother line\nOne more line\n\nChorus:\nThis is the chorus\nEnd of chorus",
        releaseDate: "22/05/2023",
        duration: "3:28",
      },
      {
        id: "4",
        title: "Fourth Song",
        artist: "Artist Four",
        url: "/a.mp3",
        lyrics: "Lyrics for the fourth song...\nMore lyrics\nAdditional lyrics\n\nChorus:\nSong chorus\nEnd",
        releaseDate: "10/07/2023",
        duration: "5:01",
      },
      {
        id: "5",
        title: "Fifth Song",
        artist: "Artist Five",
        url: "/a.mp3",
        lyrics: "Lyrics for the fifth song...\nAnother line\nAdditional line\n\nChorus:\nFifth chorus\nEnd of chorus",
        releaseDate: "05/09/2023",
        duration: "4:35",
      },
    ]

    const selectedSong = songs.find((s) => s.id === id)
    if (selectedSong) {
      setSong(selectedSong)
    } else {
      navigate(`/dashboarsongs/:${id}`)  
      }
  }, [id, navigate]);

  useEffect(() => {
    // Initialize audio element
    if (song) {
      const audio = new Audio(song.url)
      setAudioElement(audio)

      // Add event listeners
      audio.addEventListener("ended", () => setIsPlaying(false))

      // Cleanup
      return () => {
        audio.pause()
        audio.removeEventListener("ended", () => setIsPlaying(false))
      }
    }
  }, [song])

  const togglePlay = () => {
    if (!audioElement) return

    if (isPlaying) {
      audioElement.pause()
    } else {
      audioElement.play()
    }

    setIsPlaying(!isPlaying)
  }

  if (!song) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 bg-gray-700 rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-90",
          Number(id) % 2 === 0 ? "from-red-600 via-purple-600 to-blue-600" : "from-blue-600 via-purple-600 to-red-600",
        )}
      />

      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100&text=+')] bg-repeat opacity-5"></div>

      {/* Content overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen">
        {/* Header with back button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(`/dashboarsongs/:${id}`)}
            className="text-white hover:text-white hover:bg-white/20 gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Music List
          </Button>
        </div>

        {/* Main song content */}
        <div className="flex-1 flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Album art and player */}
          <div className="w-full md:w-1/2 max-w-md">
            <div className="aspect-square relative rounded-xl overflow-hidden bg-black/30 backdrop-blur-md shadow-2xl mb-6">
              <img
                src={`/placeholder.svg?height=600&width=600&text=🎵`}
                alt={song.title}
                width={600}
                height={600}
                className="object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlay}
                  className="rounded-full w-24 h-24 bg-black/50 backdrop-blur-md text-white hover:scale-105 transition-all hover:bg-gradient-to-r hover:from-red-600 hover:to-blue-600 hover:text-white"
                >
                  {isPlaying ? <PauseCircle className="h-16 w-16" /> : <PlayCircle className="h-16 w-16" />}
                </Button>
              </div>
            </div>

            {/* Audio controls */}
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/80 text-sm">00:00</span>
                <span className="text-white/80 text-sm">{song.duration}</span>
              </div>

              <div className="h-1.5 bg-white/20 rounded-full mb-4 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-blue-500 w-1/3 rounded-full"></div>
              </div>

              <div className="flex justify-center gap-4">
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <Download className="h-5 w-5" />
                </Button>
              </div>

              {/* Hidden audio element for browser compatibility */}
              <audio className="hidden" controls>
                <source src={song.url} type="audio/mpeg" />
                Your browser does not support audio playback.
              </audio>
            </div>
          </div>

          {/* Song details */}
          <div className="w-full md:w-1/2 text-white">
            <h1 className="text-4xl font-bold mb-2">{song.title}</h1>
            <h2 className="text-2xl text-white/90 mb-6">{song.artist}</h2>

            <div className="flex gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2">
                <div className="text-sm text-white/70">Date</div>
                <div>{song.releaseDate}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2">
                <div className="text-sm text-white/70">Duration</div>
                <div>{song.duration}</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Lyrics</h3>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 whitespace-pre-line leading-relaxed">
                {song.lyrics}
              </div>
            </div>

            <div className="mt-auto">
              <Button
                className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white backdrop-blur-sm"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Song
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


