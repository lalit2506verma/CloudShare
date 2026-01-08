import { useEffect, useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import { AlertCircle } from 'lucide-react';
import { useCredits } from '../contexts/UserCreditsContext';
import UploadBox from '../components/uploadFiles/uploadBox';
import { uploadFiles } from '../services/FileService';

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("") // success or Error
  const MAX_FILES = 5;

  const { credits, setCredits} = useCredits();

  // Handle File input field change
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (files.length + selectedFiles.length > MAX_FILES) {
      setMessage(`You can only upload a maximum of ${MAX_FILES} files at once`);
      setMessageType("error");
      return;
    }

    // add the new Files in existing files
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setMessage("");
    setMessageType("");
  }

  // Handle removal of file from uploading
  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, idx) => idx !== index));
    setMessage("");
    setMessageType("");
  }

  // Handle upload button 
  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage("error");
      setMessageType("Please select atleast one file to upload");
      return;
    }

    if (files.length > MAX_FILES) {
      setMessage("error")
      setMessageType(
        `You can only upload a maximum of ${MAX_FILES} files at once`
      );
    }

    // Uploading Document
    setUploading(true);
    setMessage("Uploading files...");
    setMessageType("info");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await uploadFiles(formData);
      console.log("From Upload Page" + res.data);

      if (res.data && res.data.remainingCredits !== undefined) {
        setCredits(res.data.remainingCredits);
      }
      
      setMessage("Files Uploaded Successfully");
      setMessageType("success");
      setFiles([]);
    }
    catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Error Uploading files. Please try again.");
      setMessageType("error");
    }
    finally {
      setUploading(false);
    }
  }

  const isUploadDisabled = files.length === 0 || files.length > MAX_FILES || credits <= 0 || files.length > credits || messageType === 'error';

  useEffect(() => {
    console.log(isUploadDisabled);
  }, [files, uploading]);


  return (
    <DashboardLayout activeMenu="Upload">
      <div className="p-6">
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${messageType === "error" ? "bg-red-50 text-red-700" : messageType === "success" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"} `}>
            {messageType === 'error' && <AlertCircle size={20} />}
            {message}
          </div>
        )}

        {/* Upload Box */}

        <UploadBox
          files={files}
          onFileChange={handleFileChange}
          onUpload={handleUpload}
          uploading={uploading}
          onRemoveFile={handleRemoveFile}
          remainingCredits={credits}
          isUploadDisabled={isUploadDisabled}
        />
        
      </div>
    </DashboardLayout>
  )
}

export default UploadPage