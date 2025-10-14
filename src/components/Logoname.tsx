'use client'
import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
}

const TypewriterText = ({ text }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <h1 className="text-xl font-bold text-[#188bff] whitespace-nowrap">
      {displayedText}
    </h1>
  );
};

const LogoName = () => {
  return (
    <div className="flex items-center space-x-2">
      <img src="/assets/images/logo.png" alt="Logo" className="w-13 h-11" />
        <h1 className="text-xl font-bold text-[#188bff] whitespace-nowrap">
        Bonet Elite Services</h1>
     
    </div>
  );
};

export default LogoName;
