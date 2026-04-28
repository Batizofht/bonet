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
      <img src="/image/logoshot.png" alt="Bonet Elite Services Logo" className="w-20 h-15" loading="lazy" />
       <div>
         <h1 className="text-xl font-bold text-[#C9A84C] whitespace-nowrap">
        Bonet</h1>
        <p className="text-[12px] text-[#C9A84C] font-semibold" style={{marginTop:-6}}>Elite Services</p>
       </div>
    </Link>
  );
};

export default LogoName;
