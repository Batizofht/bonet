import React from "react";

const TechStack = () => {
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
        <img src="../assets/images/node.png" alt="Node.js" className="h-12" />
        <img src="../assets/images/php.png" alt="PHP" className="h-12" />
        <img src="../assets/images/mysql.png" alt="MySQL" className="h-12" />
        <img src="../assets/images/java.png" alt="Java" className="h-12" />
        <img src="../assets/images/net.png" alt=".NET Core" className="h-12" />
        <img src="../assets/images/py.png" alt="Python" className="h-12" />
        <img src="../assets/images/rail.png" alt="Rails" className="h-12" />
        <img src="../assets/images/go.png" alt="Golang" className="h-12" />
        <img src="../assets/images/mongo.png" alt="MongoDB" className="h-12" />
      </div>
    </div>
  );
};

export default TechStack;
