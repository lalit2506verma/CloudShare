import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Copy,
  Download,
  Eye,
  File,
  FileIcon,
  FileText,
  Globe,
  Grid,
  Image,
  List,
  Lock,
  Music,
  Trash,
  Video,
} from "lucide-react";
import {
  deleteFile,
  downloadFile,
  fetchAllMyFiles,
  toggleFileAccess,
} from "../services/FileService";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import FileCard from "../components/FileCard";
import { HashLoader } from "react-spinners";
import ConfirmationDialog from "../components/dialog/ConfirmationDialog";
import ShareLinkDialog from "../components/dialog/ShareLinkDialog";

const MyFilesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [loading, setLoading] = useState(false);

  // Dialog State
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    fileToDelete: null,
    loading: false,
  });

  // Access State
  const [accessDialog, setAccessDialog] = useState({
    isOpen: false,
    fileToToggle: null,
    loading: false,
  });

  // Copy Link State
  const [shareDialog, setShareDialog] = useState({
    isOpen: false,
    fileId: null,
    link: "",
  });

  // File Icon
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

  //Get the List of files
  const getMyFiles = async () => {
    const response = await fetchAllMyFiles();
    if (response.status === 200) {
      setFiles(response.data);
      // console.log(response.data);
    }
  };

  // Handle File Download
  const handleDownload = async (file) => {
    try {
      const response = await downloadFile(file);
    } catch (error) {
      console.log("Error in Downloading the file");
    }
  };

  // Open Delete Dialog
  const openDeleteDialog = (file) => {
    setDeleteDialog({
      isOpen: true,
      fileToDelete: file,
      loading: false,
    });
  };

  // Close Delete Dialog
  const closeDeleteDialog = () => {
    setDeleteDialog({
      isOpen: false,
      fileToDelete: null,
      loading: false,
    });
  };

  // Confirm Delete
  const confirmDelete = async () => {
    setDeleteDialog((prev) => ({ ...prev, loading: true }));

    try {
      const res = await deleteFile(deleteDialog.fileToDelete.id);

      if (res.status === 204) {
        // Remove from the list
        setFiles((prevFiles) =>
          prevFiles.filter((file) => file.id !== deleteDialog.fileToDelete.id)
        );
      }

      // Close Dialog
      closeDeleteDialog();
    } catch (error) {
      console.log(error);
      setDeleteDialog((prev) => ({ ...prev, loading: false }));
    }
  };

  // Open Access Toggle dialog
  const openAccessDialog = (file) => {
    setAccessDialog({
      isOpen: true,
      fileToToggle: file,
      loading: false,
    });
  };

  // Close Access Toggle dialog
  const closeAccessDialog = () => {
    setAccessDialog({
      isOpen: false,
      fileToToggle: null,
      loading: false,
    });
  };

  // Open Share Link Dialog
  const openShareLinkDialog = (fileId) => {
    console.log("OpenShareLink");
    
    const link = `${window.location.origin}/files/${fileId}`;
    setShareDialog({
      isOpen: true,
      fileId: fileId,
      link: link,
    });
  };

  // Close share link Dialog
  const closeShareLinkDialog = () => {
    setShareDialog({
      isOpen: false,
      fileId: null,
      link: "",
    });
  };

  // Toggle the PUBLIC and PRIVATE status of the file
  const confirmAccessToggle = async () => {
    setAccessDialog((prev) => ({ ...prev, loading: true }));
    try {
      const res = await toggleFileAccess(accessDialog.fileToToggle.id);

      if (res.status === 200) {
        // Updating in the file Hook
        setFiles(
          files.map((file) =>
            file.id === accessDialog.fileToToggle.id
              ? { ...file, public: !file.public }
              : file
          )
        );
      }

      // Close Dialog
      closeAccessDialog();
    } catch (error) {
      console.log("Error Occured");
      setAccessDialog((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    setLoading(true);
    try {
      Promise.all([
        getMyFiles(),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [user, viewMode]);

  return (
    <DashboardLayout activeMenu="MyFiles">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Files: {files.length}</h2>

          <div className="flex items-center gap-3">
            <List
              onClick={() => setViewMode("list")}
              size={24}
              className={`cursor-pointer transition-colors ${
                viewMode === "list"
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            />

            <Grid
              onClick={() => setViewMode("grid")}
              size={24}
              className={`cursor-pointer transition-colors ${
                viewMode === "grid"
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12 bg-white min-h-lg rounded-lg">
            <HashLoader size={30} color="#a755f7" />
          </div>
        ) : files.length === 0 ? (
          <div className="bg-white rounded-lg shadow flex flex-col p-12 items-center justify-center">
            <File size={60} className="text-purple-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No files uploaded yet
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Start uploading files to manage and share them securely. You can
              upload images, document, PDFs and many more...
            </p>
            <button
              onClick={() => navigate("/upload")}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
            >
              Go to Upload
            </button>
          </div>
        ) : viewMode === "grid" ? (
          // Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {files.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                toggleAccess={() => openAccessDialog(file)}
                onDelete={() => openDeleteDialog(file)}
                shareLink={() => openShareLinkDialog(file.id)}
                handleDownload={() => handleDownload(file)}
              />
            ))}
          </div>
        ) : (
          // List View
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Sharing
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {files.map((file) => (
                  <tr
                    key={file.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* File Name */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      <div className="flex items-center gap-2">
                        {getFileIcon(file.name)}
                        {file.name}
                      </div>
                    </td>

                    {/* File Size */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {(file.size / 1024).toFixed(1)} KB
                    </td>

                    {/* File Uploaded Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </td>

                    {/* File Access */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => openAccessDialog(file)}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          {file.public ? (
                            // If File is Public
                            <>
                              <Globe size={16} className="text-green-500" />
                              <span className="group-hover: underline">
                                Public
                              </span>
                            </>
                          ) : (
                            // If file is Private
                            <>
                              <Lock size={16} className="text-gray-500" />
                              <span className="group-hover:underline">
                                Private
                              </span>
                            </>
                          )}
                        </button>

                        {file.public && (
                          <button
                            onClick={() => openShareLinkDialog(file.id)}
                            className="flex items-center gap-2 cursor-pointer group text-blue-600">
                            <Copy size={16} />
                            <span className="group-hover:underline">
                              Share Link
                            </span>
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Action Button */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="grid grid-cols-3 gap-2">
                        {/* Download Button */}
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleDownload(file.id, file.name)}
                            title="Download"
                            className="text-gray-500 hover:text-blue-600"
                          >
                            <Download size={18} />
                          </button>
                        </div>

                        {/* Delete Button */}
                        <div className="flex justify-center">
                          <button
                            onClick={() => openDeleteDialog(file)}
                            title="Delete"
                            className="text-gray-500 hover:text-red-600"
                          >
                            <Trash size={18} />
                          </button>
                        </div>

                        {/* View Button  */}
                        <div className="flex justify-center">
                          {file.public ? (
                            <a
                              title="View File"
                              target="_blank"
                              rel="noreferrer"
                              href={`/files/${file.id}`}
                              className="text-gray-500 hover:text-blue-600"
                            >
                              <Eye size={18} />
                            </a>
                          ) : (
                            <span className="w-4.5" />
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={closeDeleteDialog}
        title="Delete File"
        message={`Are you sure you want to delete "${deleteDialog.fileToDelete?.name}" ? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        varient="danger"
        loading={deleteDialog.loading}
      />

      {/* Toggle Access Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={accessDialog.isOpen}
        onClose={closeAccessDialog}
        title={`Make File ${
          accessDialog.fileToToggle?.public ? "Private" : "Public"
        }`}
        message={
          accessDialog.fileToToggle?.public
            ? `Are you sure you want to make "${accessDialog.fileToToggle?.name}" private? It will no longer be accessible via public link.`
            : `Are you sure you want to make "${accessDialog.fileToToggle?.name}" public? Anyone with the link will be able to access it.`
        }
        confirmText={
          accessDialog.fileToToggle?.public ? "Make Private" : "Make Public"
        }
        cancelText="Cancel"
        onConfirm={confirmAccessToggle}
        varient={accessDialog.fileToToggle?.public ? "warning" : "info"}
        confirmButtonClass={
          accessDialog.fileToToggle?.public
            ? "bg-purple-600 hover:bg-purple-700 focus:ring-green-500"
            : "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500"
        }
        loading={accessDialog.loading}
      />

      {/* Share Link Dialog */}
      <ShareLinkDialog
        isOpen={shareDialog.isOpen}
        onClose={closeShareLinkDialog}
        link={shareDialog.link}
      />
    </DashboardLayout>
  );
};

export default MyFilesPage;
