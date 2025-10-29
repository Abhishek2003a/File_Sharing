import "./App.css";
import Header from "./Header.jsx";
import { useRef, useState } from "react";
import { UploadFile, DownloadFile } from "../../service/api.js";
import CopyCode from "./CopyCode.jsx";

function App() {
  const [file, setFile] = useState(null);
  const [res, setRes] = useState(null);
  const [secretCode, setSecretCode] = useState("");
  const fileInputRef = useRef(null);

  // Trigger file selection manually (if needed)
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log("File selected:", selectedFile.name);
  };

  // Upload file only when clicking "Send File"
  const handleSend = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const fileData = new FormData();
    fileData.append("name", file.name);
    fileData.append("file", file);

    try {
      const response = await UploadFile(fileData);
      console.log("Response from API -> ", JSON.stringify(response, null, 2));
      setRes(response);
      setSecretCode(response.path.split("/").pop());
      fileInputRef.current.value = null; // Reset file input
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error while uploading:", error);
      alert("Error uploading file!");
    }
  };

  //Receiving File Functionality to be added
  const handleDownload = async () => {
    const fileId = prompt("Enter the File ID to download:");
    if (!fileId) {
      alert("Please enter a file ID first!");
      return;
    }

    try {
      const blob = await DownloadFile(fileId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "downloaded_file"); // You can set the file name here
      document.body.appendChild(link);
      link.click();
      link.remove(link);
      alert("File downloaded successfully!");
    } catch (error) {
      console.error("Error while downloading:", error);
      alert("Error downloading file!");
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 
                 dark:from-gray-900 dark:via-gray-800 dark:to-black 
                 flex flex-col items-center"
    >
      <Header />
      <main
        className="mt-16 w-full max-w-md p-8 rounded-2xl 
                   bg-white/80 backdrop-blur-md shadow-xl 
                   dark:bg-gray-800/70"
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
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 
                       text-white font-semibold shadow-md hover:scale-105 
                       transition-transform duration-200 hover:shadow-xl
                       dark:from-green-400 dark:via-emerald-400 dark:to-teal-400"
            onClick={handleDownload}
          >
            📥 Receive File
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Share files securely, fast, and with style 💫
        </p>
        <br />
        {res && <CopyCode code={secretCode} />}
      </main>
    </div>
  );
}
export default App;
