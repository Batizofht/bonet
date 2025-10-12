'use client'
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

const Gallery = () => {
  const navigate = useRouter();
  const { t } = useTranslation();

  const images = [
    { src: "../assets/images/conv.jpg", key: "conv" },
    { src: "../assets/images/k2.webp", key: "k2" },
    { src: "../assets/images/memo.jpg", key: "memo" },
    { src: "../assets/images/k3.jpg", key: "k3" },
    { src: "../assets/images/kiv.jpg", key: "kiv" },
    { src: "../assets/images/vov.jpg", key: "vov" },
    { src: "../assets/images/part1.jpg", key: "part1" },
    { src: "../assets/images/tea.webp", key: "tea" },
    { src: "../assets/images/nyu5.jpg", key: "nyu5" },
    { src: "../assets/images/gis3.jpg", key: "gis3" },
    { src: "../assets/images/huye.JPG", key: "huye" },
    { src: "../assets/images/muhazi.jpg", key: "muhazi" }
  ];

  return (
    <div className="max-w-6xl mx-auto p-5 overflow-auto">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center bg-[#188bff] bg-clip-text text-transparent mb-6">
        <span className="text-gray-700">{t("gallery.title").split(" ")[0]}</span>{" "}
        {t("gallery.title").split(" ").slice(1).join(" ")}
      </h1>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {images.map((image, index) => (
    <div key={index} className="relative">
      <img
        src={image.src}
        alt={t(`gallery.places.${image.key}`)}
        className="w-full h-40 object-cover rounded-lg"
      />
      <div className="absolute bottom-2 left-2 bg-white/90 border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-600 hover:text-white transition duration-300 text-sm font-Sulphur cursor-pointer">
        {t(`gallery.places.${image.key}`)}
      </div>
    </div>
  ))}
</div>


      {/* Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate.push("/visitrwanda")}
          style={{ borderRadius: "10px" }}
          className="mt-2 inline-block border border-blue-600 text-blue-600 px-20 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300 cursor-pointer"
        >
          {t("gallery.button")}
        </button>
      </div>
    </div>
  );
};

export default Gallery;
