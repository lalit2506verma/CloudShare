import { FileText, Loader2, Upload, UploadCloud, X } from "lucide-react";
import { useState } from "react";

const UploadBox = ({
  files,
  onFileChange,
  onUpload,
  uploading,
  onRemoveFile,
  remainingCredits,
  isUploadDisabled,
  maxFiles = 5,
}) => {
  const [isDragging, SetIsDragging] = useState(false);

  // Drag Event
  const handleDragOver = (e) => {
    e.preventDefault();
    SetIsDragging(true);
  };

  const handleDragLeave = () => {
    SetIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    SetIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);

    // mimic input event structure
    const fakeEvent = {
      target: {
        files: droppedFiles,
      },
    };

    onFileChange(fakeEvent);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Upload Card */}
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className=" flex items-center justify-center gap-3 text-lg font-semibold text-gray-800">
            <Upload size={23} className="text-blue-500" />
            Upload your files
          </h2>

          <span className="text-sm text-gray-500">
            Credits: <b>{remainingCredits}</b>
          </span>
        </div>

        {/* Drop Area */}
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-purple-200 bg-white p-8 text-center transition
          ${
            isDragging
              ? "border-purple-500 bg-purple-100"
              : "border-purple-200 bg-white hover:border-purple-400 hover:bg-purple-50"
          }`}
        >
          <UploadCloud
            size={35}
            className={`mb-3 transition ${
              isDragging ? "text-purple-600 scale-110" : "text-purple-500"
            }`}
          />
          <p className="text-sx text-gray-500 mt-1">
            {isDragging ? "Drop files here" : "Drag & drop files here"}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            or click to browse (max {maxFiles} files)
          </p>

          <input
            type="file"
            multiple
            className="hidden"
            onChange={onFileChange}
          />
        </label>

        {/* Selected Files */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              SelectedFiles ({files.length})
            </h3>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-gray-400 hover:border-gray-600 bg-white hover:bg-gray-50 px-3 py-3 text-sm shadown-sm"
                >
                  <div className="flex items-center justify-center gap-2 truncate">
                    <FileText size={15} className="text-purple-500" />
                    <span className="truncate text-gray-700">{file.name}</span>
                    <span className="text-xs text-gray-400 relative top-0.5">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>

                  <button
                    onClick={() => onRemoveFile(index)}
                    disabled={uploading}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}

        <div className="mt-6">
          <button
            onClick={onUpload}
            disabled={isUploadDisabled || uploading || isDragging}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-300"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Files"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadBox;
