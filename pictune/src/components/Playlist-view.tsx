"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ArrowLeft, Music, Play, Pause, Plus, MoreHorizontal, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { removeSongFromPlaylist, setCurrentPlaylist, updatePlaylist } from "@/store/slices/playlistsSlice"
import { selectPlaylistWithSongs } from "@/store/slices/playlistsSlice"
import type { AppDispatch, RootState } from "@/store/store"
import type { MusicFile } from "@/store/slices/musicFilesSlice"

interface PlaylistViewProps {
  onPlaySong: (song: MusicFile) => void
  currentlyPlayingSong: MusicFile | null
}

export default function PlaylistView({ onPlaySong, currentlyPlayingSong }: PlaylistViewProps) {
  const dispatch = useDispatch<AppDispatch>()
  const currentPlaylistId = useSelector((state: RootState) => state.playlists.currentPlaylistId)
  const playlistWithSongs = useSelector((state: RootState) => 
    currentPlaylistId ? selectPlaylistWithSongs(state, currentPlaylistId) : null
  )
  
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  
  useEffect(() => {
    if (playlistWithSongs) {
      setEditName(playlistWithSongs.name)
      setEditDescription(playlistWithSongs.description || "")
    }
  }, [playlistWithSongs])
  
  if (!playlistWithSongs) return null
  
  const handleRemoveSong = (songId: number) => {
    dispatch(removeSongFromPlaylist({ playlistId: playlistWithSongs.id, songId }))
  }
  
  const handleUpdatePlaylist = () => {
    if (editName.trim()) {
      dispatch(updatePlaylist({
        id: playlistWithSongs.id,
        name: editName,
        description: editDescription
      }))
      setIsEditDialogOpen(false)
    }
  }
  
  const handleBackToFolders = () => {
    dispatch(setCurrentPlaylist(null))
  }
  

  return (
    <div className="bg-black/30 backdrop-blur-md rounded-xl border border-gray-800 p-4 mb-8">
      <div className="flex items-start gap-6 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBackToFolders}
          className="text-white hover:bg-white/10 mt-1"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">{playlistWithSongs.name}</h2>
            
            <div className="flex gap-2">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-white border-gray-700 hover:bg-white/10">
                    Edit Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/80 backdrop-blur-md border-gray-800 text-white">
                  <DialogHeader>
                    <DialogTitle>Edit Playlist</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Update your playlist details.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="edit-name">Playlist Name</label>
                      <Input
                        id="edit-name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-black/50 border-gray-700"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="edit-description">Description (Optional)</label>
                      <Input
                        id="edit-description"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="bg-black/50 border-gray-700"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditDialogOpen(false)}
                      className="border-gray-700 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleUpdatePlaylist}
                      className="bg-gradient-to-r from-red-600/20 to-blue-600/20 hover:from-red-700 hover:to-blue-700"
                    >
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button 
                className="bg-gradient-to-r from-red-600/20 to-blue-600/20 hover:from-red-700 hover:to-blue-700 text-white"
                size="sm"
                onClick={() => {
                  if (playlistWithSongs.songs.length > 0) {
                    onPlaySong(playlistWithSongs.songs[0])
                  }
                }}
                disabled={playlistWithSongs.songs.length === 0}
              >
                <Play className="h-4 w-4 mr-1" /> Play All
              </Button>
            </div>
          </div>
          
          {playlistWithSongs.description && (
            <p className="text-gray-400 mt-1">{playlistWithSongs.description}</p>
          )}
          
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
            <span>{playlistWithSongs.songs.length} songs</span>
            <span>Created {new Date(playlistWithSongs.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      {playlistWithSongs.songs.length > 0 ? (
        <ScrollArea className="h-[400px] rounded-md border border-gray-800">
          <Table>
            <TableHeader className="bg-black  rounded-md border border-gray-800">
              <TableRow>
                <TableHead className="w-12 text-white">#</TableHead>
                <TableHead className="text-white">Title</TableHead>
                <TableHead className="text-white">Date Added</TableHead>
                <TableHead className="text-white">Duration</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {playlistWithSongs.songs.map((song, index) => (
                <TableRow 
                  key={song.id}
                  className={cn(
                    "hover:bg-white/5 cursor-pointer",
                    currentlyPlayingSong?.id === song.id && "bg-white/10"
                  )}
                  onClick={() => onPlaySong(song)}
                >
                  <TableCell className="text-gray-400">
                    {currentlyPlayingSong?.id === song.id ? (
                      <div className="flex justify-center">
                        {currentlyPlayingSong ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
                      </div>
                    ) : (
                      index + 1
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-white">{song.fileName}</div>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {new Date(song.uploadedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {/* {formatDuration(song.duration)} Use actual song duration */}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-md border-gray-800 text-white">
                        <DropdownMenuItem 
                          className="hover:bg-white/10 cursor-pointer text-red-400 hover:text-red-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSong(song.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove from Playlist
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      ) : (
        <div className="text-center py-12 border border-gray-800 rounded-md">
          <Music className="h-12 w-12 text-gray-500 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-white mb-1">This playlist is empty</h3>
          <p className="text-gray-400 mb-4">Add songs to your playlist to get started</p>
          <Button
            className="bg-gradient-to-r from-red-600/20 to-blue-600/20 hover:from-red-700 hover:to-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Songs
          </Button>
        </div>
      )}
    </div>
  )
}
