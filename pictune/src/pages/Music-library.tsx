"use client"

import { useState } from "react"
import {  useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Music} from "lucide-react"
import type { MusicFile } from "@/store/slices/musicFilesSlice"
import type {  RootState } from "@/store/store"

import AudioPlayer from "@/components/AudioPlayer"
import FolderBrowser from "@/components/Folder-browser"
import MusicCard from "@/components/MusicCard"
import PlaylistView from "@/components/Playlist-view"
import SearchBarDark from "@/components/SearchBar"
import { selectCurrentPlaylist, selectPlaylistWithSongs } from "@/store/slices/playlistsSlice"
import Background from "./Background"

export default function MusicLibrary() {
  const { files: songs, loading, error } = useSelector((state: RootState) => state.musicFiles)
  const currentPlaylist = useSelector(selectCurrentPlaylist)
  const [playingSong, setPlayingSong] = useState<MusicFile | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const songsPerPage = 6

  const filteredSongs = songs.filter((song: MusicFile) =>
    song.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const indexOfLastSong = currentPage * songsPerPage
  const indexOfFirstSong = indexOfLastSong - songsPerPage
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handlePlayPause = (song: MusicFile) => {
    if (playingSong && playingSong.id === song.id) {
      setPlayingSong(null)
    } else {
      setPlayingSong(song)
    }
  }

  const handleNextSong = () => {
    if (!playingSong) return

    if (currentPlaylist) {
      const playlistWithSongs = useSelector((state: RootState) =>
        selectPlaylistWithSongs(state, currentPlaylist.id)
      )
      if (playlistWithSongs) {
        const currentIndex = playlistWithSongs.songs.findIndex(
          (song: MusicFile) => song.id === playingSong.id
        )
        if (currentIndex < playlistWithSongs.songs.length - 1) {
          setPlayingSong(playlistWithSongs.songs[currentIndex + 1])
          return
        }
      }
    }

    const currentIndex = filteredSongs.findIndex((song) => song.id === playingSong.id)
    if (currentIndex < filteredSongs.length - 1) {
      setPlayingSong(filteredSongs[currentIndex + 1])
    }
  }

  const handlePreviousSong = () => {
    if (!playingSong) return

    if (currentPlaylist) {
      const playlistWithSongs = useSelector((state: RootState) =>
        selectPlaylistWithSongs(state, currentPlaylist.id)
      )
      if (playlistWithSongs) {
        const currentIndex = playlistWithSongs.songs.findIndex(
          (song: MusicFile) => song.id === playingSong.id
        )
        if (currentIndex > 0) {
          setPlayingSong(playlistWithSongs.songs[currentIndex - 1])
          return
        }
      }
    }

    const currentIndex = filteredSongs.findIndex((song) => song.id === playingSong.id)
    if (currentIndex > 0) {
      setPlayingSong(filteredSongs[currentIndex - 1])
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden pt-20 pb-20">
      {/* Background Image */}
    <Background/>
     

      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`pb-${playingSong ? "24" : "0"} md:pb-${playingSong ? "20" : "0"}`}
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-r from-red-600/20 to-blue-600/20 p-3 rounded-full shadow-lg">
              <Music className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Music Library</h1>
          </div>

          {/* Folder Browser or Playlist View */}
          {currentPlaylist ? (
            <PlaylistView onPlaySong={handlePlayPause} currentlyPlayingSong={playingSong} />
          ) : (
            <FolderBrowser />
          )}

          {/* Search and All Music */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">All Music</h2>
              <SearchBarDark onSearch={handleSearch} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentSongs.map((song: MusicFile, index) => (
                <MusicCard
                  key={song.id}
                  song={song}
                  index={index}
                  isPlaying={playingSong?.id === song.id}
                  onPlayPause={() => handlePlayPause(song)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Global Audio Player */}
      {playingSong && (
        <AudioPlayer
          song={playingSong}
          onClose={() => setPlayingSong(null)}
          onNext={handleNextSong}
          onPrevious={handlePreviousSong}
        />
      )}
    </section>
  )
}
