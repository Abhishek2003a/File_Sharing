import "./App.css";
import Header from "./Header.jsx";
import { useRef, useState } from "react";
import { UploadFile, DownloadFile } from "../../service/api.js";
import CopyCode from "./CopyCode.jsx";

function App() {
  const [file, setFile] = useState(null);
  const [res, setRes] = useState(null);
  const [secretCode, setSecretCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [fileId, setFileId] = useState("");
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log("File selected:", selectedFile?.name);
  };

  // Upload file
  const handleSend = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const fileData = new FormData();
    fileData.append("name", file.name);
    fileData.append("file", file);

    try {
      setLoading(true);
      setLoadingMessage("Uploading your file...");
      const response = await UploadFile(fileData);
      console.log("Response from API -> ", JSON.stringify(response, null, 2));

      setRes(response);
      setSecretCode(response.path.split("/").pop());
      fileInputRef.current.value = null; // Reset file input
    } catch (error) {
      console.error("Error while uploading:", error);
      alert("Error uploading file!");
    } finally {
      setLoading(false);
    }
  };

  // Open modal for file ID input
  const handleReceiveClick = () => {
    setShowCodeInput(true);
  };

  // Confirm file download
  const handleDownloadConfirm = async () => {
    if (!fileId) {
      alert("Please enter a file ID first!");
      return;
    }

    try {
      setLoading(true);
      setLoadingMessage("Downloading your file...");
      const blob = await DownloadFile(fileId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "downloaded_file");
      document.body.appendChild(link);
      link.click();
      link.remove();
      alert("File downloaded successfully!");
    } catch (error) {
      console.error("Error while downloading:", error);
      alert("Error downloading file!");
    } finally {
      setLoading(false);
      setShowCodeInput(false);
      setFileId("");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 
                 dark:from-gray-900 dark:via-gray-800 dark:to-black 
                 flex flex-col items-center"
    >
      <Header />
      <main
        className="mt-16 w-full max-w-md p-8 rounded-2xl 
                   bg-white/80 backdrop-blur-md shadow-xl 
                   dark:bg-gray-800/70 relative"
      >
        <h2 className="text-center text-2xl font-bold text-purple-700 dark:text-purple-300 mb-6">
          Upload & Share Your Files Instantly
        </h2>

        {/* File Input */}
        <div className="flex justify-center mb-6">
          <input
            className="file:mr-4 file:py-2 file:px-6 file:rounded-lg file:border-0 
                       file:text-sm file:font-semibold 
                       file:bg-gradient-to-r file:from-pink-500 file:to-orange-500 
                       file:text-white hover:file:opacity-90 
                       dark:file:from-pink-400 dark:file:to-orange-400"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleSend}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
                       text-white font-semibold shadow-md hover:scale-105 
                       transition-transform duration-200 hover:shadow-xl 
                       dark:from-blue-500 dark:via-indigo-500 dark:to-purple-500"
          >
            📤 Send File
          </button>

          <button
            onClick={handleReceiveClick}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 
                       text-white font-semibold shadow-md hover:scale-105 
                       transition-transform duration-200 hover:shadow-xl
                       dark:from-green-400 dark:via-emerald-400 dark:to-teal-400"
          >
            📥 Receive File
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Share files securely, fast, and with style 💫
        </p>

        <br />
        {res && <CopyCode code={secretCode} />}

        {/* Loader Overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white font-medium">{loadingMessage}</p>
            </div>
          </div>
        )}

        {/* File Code Input Modal */}
        {showCodeInput && !loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-40">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-80 text-center">
              <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-4">
                Enter File ID to Download
              </h3>
              <input
                type="text"
                value={fileId}
                onChange={(e) => setFileId(e.target.value)}
                placeholder="Enter your file ID"
                className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none dark:bg-gray-700 dark:text-white"
              />
              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={handleDownloadConfirm}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:scale-105 transition"
                >
                  Download
                </button>
                <button
                  onClick={() => setShowCodeInput(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-lg hover:scale-105 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
