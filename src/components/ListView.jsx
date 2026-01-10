import { Copy, Globe, Lock } from "lucide-react";
import React from "react";

const ListView = ({ files, getFileIcon }) => {
  return (
    <div className="p-2">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Files ({files.length})</h2>
      </div>
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {files.map((file) => (
              <tr key={file.id} className="hover:bg-gray-50 transition-colors">
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
                    <div className="flex items-center gap-2 cursor-pointer group">
                      {file.public ? (
                        // If File is Public
                        <>
                          <Globe size={16} className="text-green-500" />
                          <span className="group-hover: underline">Public</span>
                        </>
                      ) : (
                        // If file is Private
                        <>
                          <Lock size={16} className="text-gray-500" />
                          <span className="group-hover:underline">Private</span>
                        </>
                      )}
                    </div>

                    {file.public && (
                      <div className="flex items-center gap-2 cursor-pointer group text-blue-600">
                        <Copy size={16} />
                        <span className="group-hover:underline">
                          Share Link
                        </span>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;
