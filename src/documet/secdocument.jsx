import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function BusinessInsights() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col items-center p-4 md:p-6 space-y-6 min-h-screen w-full">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl text-gray-700 font-bold text-center">
        <span>Business Insi</span>
        <span className="bg-[#188bff] bg-clip-text text-transparent">ghts & Reports</span>
      </h1>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl h-full px-4 md:px-0">
        {/* Left Section - Input */}
        <div className="flex flex-col p-4 md:p-6 border border-gray-200 shadow-lg rounded-lg w-full h-full min-h-[300px] md:min-h-[400px]">
          <textarea
            className="w-full h-full border border-gray-200 shadow-md rounded-lg p-3 md:p-4 resize-none outline-none text-gray-500"
            placeholder="Write detailed info of your business..."
            maxLength={5000}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="text-right text-xs md:text-sm text-gray-400 mt-2">{text.length} / 5000</div>
          <p className="text-xs md:text-sm text-gray-500 mt-4">
            NB: If you click on "Generate," the info you typed will be analyzed by Document AI and a report will be generated based on that information.
          </p>
          <button className="ml-auto mt-4 px-4 md:px-6 py-2 text-white font-bold rounded-lg bg-[#188bff]">
            Generate
          </button>
        </div>

        {/* Right Section - Output Card */}
        <div className="relative flex flex-col justify-center items-center p-4 md:p-6 border border-gray-200 shadow-lg rounded-lg w-full h-full min-h-[250px] md:min-h-[350px]">
          <p className="text-[14px] md:text-[15px] font-bold text-gray-400 text-center">The generated report will be shown here.</p>
          <button
            className="absolute top-4 right-4 flex items-center space-x-2 px-3 md:px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-100"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="text-gray-500 text-sm md:text-base">Download</span>
            <ChevronDown size={18} className="text-gray-500"/>
          </button>
          {showDropdown && (
            <div className="absolute top-14 right-4 w-32 md:w-40 bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
              <button className="w-full px-3 md:px-4 py-2 text-gray-500 text-left text-sm md:text-base hover:bg-gray-100">Download PDF</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
