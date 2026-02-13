'use client'
import { useEffect, useState } from "react";
import Link from "next/link";

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
    <Link href="/" className="flex items-center space-x-2">
      <img src="/assets/images/logo.png" alt="Logo" className="w-13 h-11" loading="lazy" />
       <div>
         <h1 className="text-xl font-bold text-[#188bff] whitespace-nowrap">
        Bonet</h1>
        <p className="text-[12px] text-[#188bff] " style={{marginTop:-6}}>Elite Services</p>
       </div>
    </Link>
  );
};

export default LogoName;
