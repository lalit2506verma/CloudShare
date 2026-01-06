import {
  Copy,
  Download,
  Eye,
  FileIcon,
  FileText,
  Globe,
  Image,
  Lock,
  Music,
  Trash,
  Video,
} from "lucide-react";
import React, { useState } from "react";

const FileCard = ({ file, toggleAccess, onDelete, shareLink, handleDownload }) => {
  const [showActions, setShowActions] = useState();

  const getFileIcon = (fileName) => {
    const fileExtension = fileName.split(".").pop().toLowerCase();

    if (["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(fileExtension)) {
      return <Image size={24} className="text-purple-500" />;
    } else if (["mp4", "webm", "mov", "avi", "mkv"].includes(fileExtension)) {
      return <Video size={24} className="text-blue-500" />;
    } else if (["mp3", "mav", "ogg", "flac", "m4a"].includes(fileExtension)) {
      return <Music size={24} className="text-green-500" />;
    } else if (
      ["pdf", "doc", "docx", "txt", "rtf", "xlsx", "xls"].includes(
        fileExtension
      )
    ) {
      return <FileText size={24} className="text-amber-500" />;
    } else {
      return <FileIcon size={24} className="text-gray-500" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className="relative group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100"
    >
      {/* File Preview Area */}
      <div className="h-32 bg-linear-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
        {getFileIcon(file.name)}
      </div>

      {/* Public/Private show */}
      <div className="absolute top-2 right-2">
        <div
          title={file.public ? "Public" : "Private"}
          className={`rounded-full p-1.5 ${
            file.public ? "bg-green-100" : "bg-gray-100"
          }`}
        >
          {file.public ? (
            <Globe size={14} className="text-green-600" />
          ) : (
            <Lock size={14} className="text-gray-600" />
          )}
        </div>
      </div>

      {/* File Info */}
      <div className="p-4">
        <div className="flex-justify-between items-start">
          <div className="overflow-hidden">
            <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
            <p className="text-xs text-gray-500 mt-1">
              {formatFileSize(file.size)} | {formatDate(file.uploadedAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className={` absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent flex items-end justify-center p-4 transition-opacity duration-300 ${
          showActions ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-wrap gap-3 w-full justify-center">
          {/* Share Link Button */}
          {file.public && (
            <button
              onClick={shareLink}
              title="Share Link"
              className="p-2 bg-white/90 rounded-full cursor-pointer hover:bg-white transition-colors text-purple-500 hover:text-purple-600"
            >
              <Copy size={18} />
            </button>
          )}

          {file.public && (
            <a
              href={`/file/${file.id}`}
              title="View File"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white/90 rounded-full cursor-pointer hover:bg-white transition-colors text-gray-700 hover:text-gray-900"
            >
              <Eye size={18} />
            </a>
          )}

          {/* Download Button */}
          <button
            onClick={handleDownload}
            title="Download"
            className="p-2 bg-white/90 rounded-full cursor-pointer hover:bg-white transition-colors text-green-500 hover:text-green-600"
          >
            <Download size={18} />
          </button>

          {/* Toggle Access button */}
          <button
            onClick={() => toggleAccess(file)}
            title={file.public ? "Make Private" : "Make Public"}
            className="p-2 bg-white/90 rounded-full cursor-pointer hover:bg-white transition-colors text-amber-500 hover:text-amber-600"
          >
            {file.public ? <Globe size={18} /> : <Lock size={18} />}
          </button>

          {/* Delete action button */}
          <button
            onClick={() => onDelete(file)}
            title="Delete"
            className="p-2 bg-white/90 rounded-full cursor-pointer hover:bg-white text-red-500 hover:text-red-600"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
