import { Copy, X } from 'lucide-react';
import React from 'react'

const ShareLinkDialog = ({ isOpen, onClose, link }) => {

  if (!isOpen) return null;
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Share File</h2>
          <button onClick={onClose}>
            <X size={20} className="text-xl text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-600">
            Shareable Link
          </label>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={link}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none"
            />

            <button
              onClick={copyToClipboard}
              className="rounded-md bg-gray-500 p-2 text-white hover:bg-gray-700"
            >
              <Copy size={16}/>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareLinkDialog