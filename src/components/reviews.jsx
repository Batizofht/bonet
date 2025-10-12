"use client"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaQuoteLeft, FaQuoteRight, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  { 
    id: 1, 
    name: "Jeanne Uwase", 
    job: "Software Developer", 
    image: "/assets/images/alice.webp" 
  },
  { 
    id: 2, 
    name: "Patricia Mukamurigo", 
    job: "Founder, Beauty Glow", 
    image: "/assets/images/rev4.webp" 
  },
  { 
    id: 3, 
    name: "Eric Niyonzima", 
    job: "CTO", 
    image: "/assets/images/david.jpg" 
  },
  { 
    id: 4, 
    name: "Amina Nyiransengimana", 
    job: "Marketing Manager", 
    image: "/assets/images/rev5.webp" 
  },
  { 
    id: 5, 
    name: "Jean-Claude Habimana", 
    job: "Entrepreneur", 
    image: "/assets/images/jean.webp" 
  },
  { 
    id: 6, 
    name: "Samuel Nkurunziza", 
    job: "Entrepreneur", 
    image: "/assets/images/1.jpg" 
  },
  { 
    id: 7, 
    name: "Diane Uwimana", 
    job: "Project Manager", 
    image: "/assets/images/diana1.webp" 
  },
  { 
    id: 8, 
    name: "Moses Mugenzi", 
    job: "Operations Manager", 
    image: "/assets/images/rev6.jpg" 
  },
  { 
    id: 9, 
    name: "Solange Ingabire", 
    job: "Customer Relations", 
    image: "/assets/images/solange.jpg" 
  }
];

function Testimonials() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(testimonials[0]);

  const handleNext = () => {
    setIndex((prev) => (prev + 3 >= testimonials.length ? 0 : prev + 3));
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 3 < 0 ? testimonials.length - 3 : prev - 3));
  };

  const handleSelect = (person) => {
    setSelected(person);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, ease: "easeOut" }} 
      viewport={{ once: true }}
      className="flex flex-col items-center text-center p-10 bg-white shadow-lg rounded-lg border-b border-gray-200"
    >
      <div className="w-20 h-1 bg-[#188bff] mx-auto mt-2 mb-5"></div>
      <h2 className="text-gray-700 text-3xl font-bold text-center mb-6">
        {t("testimonials.sectionTitle").split(" ")[0]}
        <span className="font-bold bg-[#188bff] bg-clip-text text-transparent"> {t("testimonials.sectionTitle").split(" ")[1]}</span>
      </h2>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="flex items-center justify-center mt-4 text-gray-600 mb-10"
      >
        <FaQuoteLeft className="text-[#62b1ff] text-2xl" />
        <p className="px-4 max-w-xs">{t(`testimonials.reviews.${selected.id - 1}`)}</p>
        <FaQuoteRight className="text-[#62b1ff] text-2xl" />
      </motion.div>

      <div className="relative flex items-center justify-center mt-6 mb-10 w-full">
        <button 
          onClick={handlePrev} 
          className="hidden md:block absolute left-0 bg-transparent border-2 border-[#62b1ff] rounded-full p-2 text-[#62b1ff] hover:bg-[#62b1ff] hover:text-white transition"
        >
          <FaChevronLeft size={20} />
        </button>
        
        <div className="flex space-x-10 overflow-x-auto snap-x snap-mandatory no-scrollbar md:overflow-visible">
          {testimonials.slice(index, index + 3).map((person) => (
            <motion.div 
              key={person.id} 
              className="flex flex-col items-center cursor-pointer snap-center"
              onClick={() => handleSelect(person)}
              initial={{ opacity: 0, y: -30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <div className={`w-20 h-20 rounded-full bg-gray-300 p-1 transition-all ${selected.id === person.id ? 'bg-[#62b1ff] p-1' : ''}`}>
                <img src={person.image} alt={person.name} className="w-full h-full rounded-full" />
              </div>
              <div className="flex mt-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <h3 className="bg-[#62b1ff] bg-clip-text text-transparent font-semibold mt-2">{person.name}</h3>
            </motion.div>
          ))}
        </div>

        <button 
          onClick={handleNext} 
          className="hidden md:block absolute right-0 bg-transparent border-2 border-[#62b1ff] rounded-full p-2 text-[#62b1ff] hover:bg-[#62b1ff] hover:text-white transition"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}

export default Testimonials;
