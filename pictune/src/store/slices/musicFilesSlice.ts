import api from "@/components/Api"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

export interface MusicFile {
  id: number
  fileName: string
  fileType: string
  folderId: number
  isDeleted: boolean
  ownerId: string
  s3Key: string
  size: number
  createdAt: string
  uploadedAt: string
}

interface MusicFileState {
  files: MusicFile[]
  selectedFile: MusicFile | null
  loading: boolean
  error: string | null
}

// Initial state
const initialState: MusicFileState = {
  files: [],
  selectedFile: null,
  loading: false,
  error: null,
}

// Fetch all music files
export const fetchMusicFiles = createAsyncThunk("musicFiles/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/files")
    return response.data as MusicFile[]
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch music files")
  }
})

// Fetch a single music file
export const fetchMusicFileById = createAsyncThunk("musicFiles/fetchById", async (id: number, { rejectWithValue }) => {
  try {
    const response = await api.get(`/files/${id}`)
    return response.data as MusicFile
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch music file")
  }
})

// Update a music file
export const updateMusicFile = createAsyncThunk(
  "musicFiles/update",
  async ({ id, fileName }: { id: number; fileName: string }, { rejectWithValue }) => {
    try {
      await api.put(`/files/${id}`, { fileName })
      return { id, fileName }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update file")
    }
  }
)

// Delete a music file
export const deleteMusicFile = createAsyncThunk("musicFiles/delete", async (id: number, { rejectWithValue }) => {
  try {
    await api.delete(`/files/${id}`)
    return id
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete file")
  }
})

// Music Files Slice
const musicFilesSlice = createSlice({
  name: "musicFiles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMusicFiles.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMusicFiles.fulfilled, (state, action: PayloadAction<MusicFile[]>) => {
        state.loading = false
        state.files = action.payload
      })
      .addCase(fetchMusicFiles.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(fetchMusicFileById.fulfilled, (state, action: PayloadAction<MusicFile>) => {
        state.selectedFile = action.payload
      })

      .addCase(updateMusicFile.fulfilled, (state, action) => {
        const file = state.files.find((f) => f.id === action.payload.id)
        if (file) file.fileName = action.payload.fileName
      })

      .addCase(deleteMusicFile.fulfilled, (state, action) => {
        state.files = state.files.filter((file) => file.id !== action.payload)
      })
  },
})

export default musicFilesSlice.reducer
