import api from "@/components/Api";

export const getPresignedUrl = async (fileName: string) => {
  
  try {
    const response = await api.get("/upload/presigned-url", {
      params: { fileName },
    });

    console.log("Presigned URL response:", response.data);

    if (!response.data.url) {
      throw new Error("Invalid response: Missing URL");
    }

    return response.data; // { url, key }
  } catch (error) {
    console.error("Error fetching presigned URL:", error);
    throw error;
  }
};

  
  

// Upload file to S3 using presigned URL
export const uploadFileToS3 = async (uploadUrl: string, file: File, setProgress: React.Dispatch<React.SetStateAction<number>>) => {
  
  try {
    await api.put(uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress: (progressEvent:any) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percent);
      },
    });
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};

// Save file metadata to backend
export const saveFileMetadata = async (fileName: string, fileUrl: string) => {
  try {
    const response = await api.post("/upload-complete", { fileName, fileUrl });
    return response.data;
  } catch (error) {
    console.error("Error saving file metadata:", error);
    throw error;
  }
};
