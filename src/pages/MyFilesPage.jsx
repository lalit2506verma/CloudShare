import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Copy,
  Download,
  Eye,
  File,
  Globe,
  Grid,
  List,
  Lock,
  Trash,
} from "lucide-react";
import { fetchAllMyFiles } from "../services/FileService";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import FileCard from "../components/FileCard";
import { HashLoader } from "react-spinners";

const MyFilesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [loading, setLoading] = useState(false);

  const getMyFiles = async () => {
    const response = await fetchAllMyFiles();
    if (response.status === 200) {
      setFiles(response.data);
      console.log(response.data);
    }
  };

  useEffect(() => {
    setLoading(true);
    try {
      Promise.all([
        getMyFiles(),
        new Promise(resolve => setTimeout(resolve, 2000))
      ]).then(() => {
        setLoading(false);
      });
    }
    catch (error) {
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
              <FileCard key={file.id} file={file} />
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
                        <File size={20} className="text-blue-600" />
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
                        <button className="flex items-center gap-2 cursor-pointer group">
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
                          <button className="flex items-center gap-2 cursor-pointer group text-blue-600">
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
                            title="Download"
                            className="text-gray-500 hover:text-blue-600"
                          >
                            <Download size={18} />
                          </button>
                        </div>

                        {/* Delete Button */}
                        <div className="flex justify-center">
                          <button
                            title="Delete"
                            className="text-gray-500 hover:text-red-600"
                          >
                            <Trash size={18} />
                          </button>
                        </div>

                        {/* View Button  */}
                        <div className="flex justify-center">
                          {file.public ? (
                            <Link
                              title="view"
                              to={`/file/${file.id}`}
                              className="text-gray-500 hover:text-blue-600"
                            >
                              <Eye size={18} />
                            </Link>
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
    </DashboardLayout>
  );
};

export default MyFilesPage;
