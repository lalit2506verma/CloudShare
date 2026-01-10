import { useEffect, useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import { useCredits } from '../contexts/UserCreditsContext';
import { fetchAllMyFiles, uploadFiles } from '../services/FileService';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle, FileIcon, FileText, Image, Music, Video } from 'lucide-react';
import { HashLoader } from 'react-spinners';
import UploadBox from '../components/uploadFiles/UploadBox';
import ListView from '../components/ListView';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [remainingUploads, setRemainingUploads] = useState(5);

  const {credits, setCredits, fetchUserCredits } = useCredits();
  const { isAuthenticated } = useAuth();
  const MAX_FILES = 5;

  // Fetch Recent Files
  useEffect(() => {
    const loadRecentFiles = async () => {
      setLoading(true);
      try {
        const res = await fetchAllMyFiles();

        // Sort the file based on upload Date
        const sortedFiles = res.data
          .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
          .slice(0, 5);

        setFiles(sortedFiles);
      } catch (error) {
        console.log("Failed to get the files");
      } finally {
        setLoading(false);
      }
    };

    loadRecentFiles();
  }, [isAuthenticated]);

  // Handle File Change
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (uploadedFiles.length + selectedFiles.length > MAX_FILES) {
      setMessage(`You can only upload a maximum of ${MAX_FILES} files at once`);
      setMessageType("error");
      return;
    }

    // add the new Files in existing files
    setUploadedFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setMessage("");
    setMessageType("");
  };

  // Handle removal of file from uploading
  const handleRemoveFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, idx) => idx !== index));
    setMessage("");
    setMessageType("");
  };

  useEffect(() => {
    setRemainingUploads(MAX_FILES - uploadedFiles.length)
  }, [uploadedFiles])

  // Handle upload button 
  const handleUpload = async () => {
    if (uploadedFiles.length === 0) {
      setMessage("error");
      setMessageType("Please select atleast one file to upload");
      return;
    }

    if (uploadedFiles.length > MAX_FILES) {
      setMessage("error");
      setMessageType(
        `You can only upload a maximum of ${MAX_FILES} files at once`
      );
    }

    // Uploading Document
    setUploading(true);
    setMessage("Uploading files...");
    setMessageType("info");

    const formData = new FormData();
    uploadedFiles.forEach((file) => formData.append("files", file));

    try {
      const res = await uploadFiles(formData);
      console.log("From Upload Page" + res.data);

      if (res.data && res.data.remainingCredits !== undefined) {
        setCredits(res.data.remainingCredits);
      }
      
      setMessage("Files Uploaded Successfully");
      setMessageType("success");
      setUploadedFiles([]);
      await fetchUserCredits();
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

  const isUploadDisabled =
    uploadedFiles.length === 0 ||
    uploadedFiles.length > MAX_FILES ||
    credits <= 0 ||
    uploadedFiles.length > credits ||
    messageType === "error";
  
  const getFileIcon = (fileName) => {
    const fileExtension = fileName.split(".").pop().toLowerCase();

    if (["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(fileExtension)) {
      return <Image size={20} className="text-purple-500" />;
    } else if (["mp4", "webm", "mov", "avi", "mkv"].includes(fileExtension)) {
      return <Video size={20} className="text-blue-500" />;
    } else if (["mp3", "mav", "ogg", "flac", "m4a"].includes(fileExtension)) {
      return <Music size={20} className="text-green-500" />;
    } else if (
      ["pdf", "doc", "docx", "txt", "rtf", "xlsx", "xls"].includes(
        fileExtension
      )
    ) {
      return <FileText size={20} className="text-amber-500" />;
    } else {
      return <FileIcon size={20} className="text-gray-500" />;
    }
  };
  
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6"> My Drive</h1>
        <p className="text-gray-600 mb-6">
          Upload, manage and share your files securely
        </p>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              messageType === "error"
                ? "bg-red-50 text-red-700"
                : messageType === "success"
                ? "bg-green-50 text-green-700"
                : "bg-yellow-50 text-yellow-700"
            } `}
          >
            {messageType === "error" && <AlertCircle size={20} />}
            {message}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column */}
          <div className="w-full md:w-[40%]">
            <UploadBox
              files={uploadedFiles}
              onFileChange={handleFileChange}
              onUpload={handleUpload}
              uploading={uploading}
              onRemoveFile={handleRemoveFile}
              remainingCredits={remainingUploads}
              isUploadDisabled={isUploadDisabled}
              location="dashboard"
            />
          </div>

          {/* Right Column */}
          <div className="w-full md:w-[60%]">
            {loading ? (
              <div className="flex justify-center items-center py-12 bg-white min-h-lg rounded-lg">
                <HashLoader size={30} color="#a755f7" />
              </div>
            ) : (
                <ListView
                  files={files}
                  getFileIcon={getFileIcon}

                />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard