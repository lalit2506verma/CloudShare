import { myAxios } from "../helper/AxiosConfig"

export const fetchAllMyFiles = async () => {
  try {
    const response = await myAxios.get("/files/my-files");
    // console.log(response);
    return response;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}

export const toggleFileAccess = async(fileId) => {
  try {
    const response = await myAxios.patch(`/files/toggle-public/${fileId}`, {});
    // console.log(response);
    return response;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}

export const downloadFile = async (file) => {
  try {
    const response = await myAxios.get(`/files/download/${file.id}`, {
      responseType: "blob"
    });
    
    // Create a blob
    const blob = new Blob([response.data], {
      type: response.headers['Content-Type'] || 'application/octet-stream'
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url); 
    
    return { success: true };
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}

export const deleteFile = async (fileId) => {
  try {
    const response = await myAxios.delete(`/files/${fileId}`);
    console.log("Delete Response: "+response);
    
    return response;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}

export const uploadFiles = async (formData) => {
  try {
    const response = await myAxios.post("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    console.log(response);
    return response;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}