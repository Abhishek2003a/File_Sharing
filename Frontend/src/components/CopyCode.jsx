import React, { useState } from "react";
import { Copy } from "lucide-react"; // lightweight icon (optional)

function CopyCode({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <h5 className="text-sm italic font-medium text-gray-600 dark:text-gray-300 mb-2 tracking-wide">
        Here is the <span className="text-blue-500">Code</span> for Sharing :
      </h5>
      <div className="relative group bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 rounded-xl p-4 shadow-lg border border-gray-700 hover:shadow-2xl transition-all duration-300">
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 flex items-center gap-1.5 text-xs font-normal text-gray-300 border border-gray-700 bg-gray-800/40 backdrop-blur-sm px-2.5 py-1 rounded-md hover:bg-gray-700 hover:text-white transition-all duration-200 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-copy"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span>{copied ? "Copied!" : "Copy code"}</span>
        </button>

        {/* Code area */}
        <pre className="text-sm font-mono overflow-x-auto mt-8 p-3 rounded-lg bg-gray-950/60 border border-gray-800 text-green-400 shadow-inner">
          <code>{code}</code>
        </pre>
      </div>
    </>
  );
}

export default CopyCode;
