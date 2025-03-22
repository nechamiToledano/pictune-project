import api from "@/components/Api";

const MusicFileService = {
  // Get all music files
  getAllMusicFiles: async () => {
    try {
      const response = await api.get('/files');
      return response.data;
      
    } catch (error) {
      console.error("Error fetching music files:", error);
      throw error;
    }
  },

  // Get a specific music file by ID
  getMusicFileById: async (id: string) => {
    try {
      const response = await api.get(`files/${id}`);
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching music file with ID ${id}:`, error);
      throw error;
    }
  },

  // Update a music file (e.g., rename)
  updateMusicFile: async (id: any, newFileName: any) => {
    try {
      const response = await api.put(
        `$files/${id}`,
        { newFileName }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating music file with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a music file
  deleteMusicFile: async (id: any) => {
    try {
      const response = await api.delete(`$files/${id}`, {
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting music file with ID ${id}:`, error);
      throw error;
    }
  },
};

export default MusicFileService;
