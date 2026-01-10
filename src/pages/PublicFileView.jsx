import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { downloadFile, fetchFile } from "../services/FileService";
import { Copy, Download, File, Info } from "lucide-react";
import { TbCloudShare } from "react-icons/tb";
import ShareLinkDialog from "../components/dialog/ShareLinkDialog";

const PublicFileView = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shareModal, setShareModal] = useState({
    isOpen: false,
    link: "",
  });

  const { fileId } = useParams();

  useEffect(() => {
    setLoading(true);
    const getFile = async () => {
      try {
        const file = await fetchFile(fileId);
        setFile(file);
        setError(null);
      } catch (error) {
        console.log("Failed to fetch the file", fileId);
        setError(
          "Could Not retrieve file. The link may be invalid or the file may have been removed."
        );
      } finally {
        setLoading(false);
      }
    };

    getFile();
  }, [fileId]);

  // Handle Download
  const handleDownload = async () => {
    try {
      const response = await downloadFile(file);
      setError(null);
    } catch (error) {
      console.log("Error in Downloading the file");
      setError("Sorry File could not be downloaded");
    }
  };

  const openShareModal = () => {
    setShareModal({
      isOpen: true,
      link: window.location.href,
    });
  };

  const closeShareModal = () => {
    setShareModal({
      isOpen: false,
      link: "",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-600">Loading file...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="text-gray-600 text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!file) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="p-4 border-b bg-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TbCloudShare className="text-blue-500" />
            <span className="font-bold text-xl text-gray-800">Cloud Share</span>
          </div>
          <button
            onClick={openShareModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-500 rounded-lg"
          >
            <Copy size={18} />
            Share Link
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <File size={40} className="text-blue-500" />
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-gray-800 wrap-break-word">
              {file.name}
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              {(file.size / 1024).toFixed(2)} KB
              <span className="mx-2">&bull;</span>
              Shared on {new Date(file.uploadedAt).toLocaleDateString()}
            </p>

            <div className="my-6">
              <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-md">
                {file.type || "File"}
              </span>
            </div>

            <div className="flex justify-center gap-4 my-8">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-md cursor-pointer hover:scale-105 transition-all"
              >
                <Download size={18} />
                Download File
              </button>
            </div>

            <hr className="my-8" />

            <div>
              <h3 className="text-lg font-semibold text-left text-gray-800 mb-4">
                File Information
              </h3>

              <div className="text-left text-sm space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">File Name:</span>
                  <span className="text-gray-800 font-medium break-all">
                    {file.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">File Type:</span>
                  <span className="text-gray-800 font-medium break-all">
                    {file.type}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">File Size:</span>
                  <span className="text-gray-800 font-medium break-all">
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Shared:</span>
                  <span className="text-gray-800 font-medium break-all">
                    {new Date(file.uploadedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg flex gap-4">
            <Info size={20} />
            <p className="text-sm">
              This File has been Shared publicly. Anyone with this link can view
              and download it.
            </p>
          </div>
        </div>
      </main>

      <ShareLinkDialog
        isOpen={shareModal.isOpen}
        onClose={closeShareModal}
        link={shareModal.link}
      />
    </div>
  );
};

export default PublicFileView;
