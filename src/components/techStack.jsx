"use client"
import React from "react";
import Image from "next/image";

const TechStack = () => {
  const technologies = [
    { src: "/assets/images/node.png", alt: "Node.js" },
    { src: "/assets/images/php.png", alt: "PHP" },
    { src: "/assets/images/mysql.png", alt: "MySQL" },
    { src: "/assets/images/java.png", alt: "Java" },
    { src: "/assets/images/net.png", alt: ".NET Core" },
    { src: "/assets/images/py.png", alt: "Python" },
    { src: "/assets/images/rail.png", alt: "Rails" },
    { src: "/assets/images/go.png", alt: "Golang" },
    { src: "/assets/images/mongo.png", alt: "MongoDB" },
  ];

  return (
    <div className="bg-gray-100 py-12 text-center">
      <div className="w-20 h-1 bg-[#188bff] mx-auto mt-2 mb-5"></div>
      <h2 className="text-3xl font-semibold text-[#1A202C]">Our</h2>
      <h1 className="text-3xl font-bold bg-[#188bff] bg-clip-text text-transparent">Tech Stack</h1>
      <div className="mt-4 flex justify-center space-x-6 text-gray-600">
        <span className="text-purple-600 font-semibold">Backend</span>
        <span>Frontend</span>
        <span>Databases</span>
        <span>CMS</span>
        <span>Cloud/Testing</span>
        <span>DevOps</span>
      </div>
      <div className="flex flex-wrap justify-center gap-10 mt-8">
        {technologies.map((tech) => (
          <Image
            key={tech.alt}
            src={tech.src}
            alt={tech.alt}
            width={48}
            height={48}
            className="h-12 w-auto object-contain"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default TechStack;
