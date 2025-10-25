import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { BsCardList } from "react-icons/bs";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import DocInfo from "./docinfo";

const options = [
  {
    icon: <FaCloudUploadAlt className="text-2xl" />, 
    title: "Upload file", 
    description: "Use Word, Excel, PowerPoint, or fillable PDF with Merge Fields."
  },
  {
    icon: <BsCardList className="text-2xl" />, 
    title: "Use sample template", 
    description: "Select from the most commonly used pre-built templates."
  },
  {
    icon: <AiOutlineAppstoreAdd className="text-2xl" />, 
    title: "Build from scratch", 
    description: "Use Formstack’s dynamic builder to customize your template."
  }
];

function DocumentSetupCard() {
  const [selected, setSelected] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const analyzeText = () => {
    setLoading(true);
    setResult("");
    setTimeout(() => {
      const docData = DocInfo();
      let matchedData = "";
      const userInput = text.toLowerCase();
      
      const findMatches = (array, categoryName) => {
        return array
          .map((item) => {
            const values = Object.values(item).map((val) => val.toString().toLowerCase());
            const isMatch = values.some((val) => userInput.includes(val.slice(0, Math.ceil(val.length * 0.5))));
            return isMatch
              ? `📌 **${categoryName}:** ${Object.entries(item)
                  .map(([key, value]) => `- **${key}:** ${value}`)
                  .join("\n")}`
              : "";
          })
          .filter((entry) => entry !== "")
          .join("\n\n");
      };
      
      Object.entries(docData).forEach(([categoryName, data]) => {
        if (Array.isArray(data)) {
          matchedData += findMatches(data, categoryName);
        }
      });
      
      setResult(matchedData || "❌ No relevant data found.");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 py-5">
      <h1 className="text-gray-700 text-3xl font-bold text-center md:text-left">AI-Driven Docu
        <span className="bg-[#188bff] bg-clip-text text-transparent">ment Assistance</span>
      </h1>
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="md:w-1/2 p-5 rounded-lg shadow-lg bg-white">
          <div className="border-b pb-3">
            <h2 className="text-lg font-bold bg-[#188bff] bg-clip-text text-transparent">
              Choose how you would like to get started
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
            {options.map((option, index) => (
              <div
                key={index}
                className={`p-4 border border-gray-200 rounded-md cursor-pointer transition-all duration-300 shadow-md text-center ${
                  selected === index ? "bg-[#188bff] text-white" : "bg-white text-black"
                }`}
                onClick={() => setSelected(index)}
              >
                <div className="mb-2 flex justify-center">{option.icon}</div>
                <h3 className="text-sm font-semibold">{option.title}</h3>
                <p className="text-xs mt-1 text-gray-500">{option.description}</p>
              </div>
            ))}
          </div>
          <textarea
            className="w-full border border-gray-200 p-3 rounded-md shadow-md text-gray-500 placeholder-gray-500 text-[13px]"
            rows="4"
            placeholder="Write a description about what your document should be..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={5000}
          />
          <p className="text-gray-500 mt-1 text-xs">The generated document may contain errors or inaccuracies.</p>
          <p className="text-xs text-gray-700 mt-1 text-right">Characters {text.length} of 5000</p>
          <div className="flex justify-end mt-4">
            <button onClick={analyzeText} className="bg-[#188bff] text-white px-4 py-2 rounded-md hover:opacity-90">
              Done
            </button>
          </div>
        </div>
        <div className="md:w-1/2 p-5 rounded-lg shadow-lg bg-white relative flex flex-col items-center min-h-[250px]">
          {loading && (
            <div className="absolute top-3 flex items-center space-x-2">
              <div className="w-4 h-4 bg-[#57007B] rounded-full animate-ping"></div>
              <div className="w-4 h-4 bg-[#F76680] rounded-full animate-ping"></div>
              <span className="text-gray-500 font-semibold">Generating...</span>
            </div>
          )}
          {!loading && result && (
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 relative group"
              onClick={() => navigator.clipboard.writeText(result)}
            >
              <MdContentCopy className="text-xl" />
              <span className="absolute top-7 right-0 bg-[#188bff] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Copy document
              </span>
            </button>
          )}
          <h3 className="text-[15px] font-bold text-gray-400 mt-20 text-center">
            {!loading && !result ? "Your document result will be displayed here" : ""}
          </h3>
          {!loading && result && (
            <div className="w-full max-w-full p-4 mt-4 bg-gray-100 rounded-md text-sm text-gray-800 overflow-auto">
              <pre className="whitespace-pre-wrap">{result}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DocumentSetupCard;
