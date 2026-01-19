"use client"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, Sparkles, Heart } from "lucide-react";

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
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, ease: "easeOut" }} 
      viewport={{ once: true }}
      className="max-w-6xl mx-auto py-16 px-4"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <Heart className="w-6 h-6 text-[#188bff] animate-pulse" />
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#188bff] to-transparent"></div>
          <div className="w-3 h-3 bg-[#188bff] rounded-full animate-pulse"></div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          {t("clientReviews.title").split(" ").slice(0, 2).join(" ")} <span className="bg-[#188bff] bg-clip-text text-transparent">{t("clientReviews.title").split(" ").slice(2).join(" ")}</span>
        </h2>
        <p className="text-gray-500 text-lg">{t("clientReviews.subtitle")}</p>
      </div>

      {/* Main Testimonial Card */}
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center mb-12">
        {/* Selected Testimonial */}
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 border-2 border-blue-100 shadow-xl lg:w-2/3"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#188bff] to-cyan-400 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Quote className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{selected.name}</h3>
              <p className="text-gray-500 text-sm">{selected.job}</p>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 text-lg leading-relaxed italic">
            "{t(`testimonials.reviews.${selected.id - 1}`)}"
          </p>
          
          <div className="flex justify-end mt-6">
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
        </motion.div>

        {/* Selected Person Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative lg:w-1/3"
        >
          <div className="relative group">
            <div className="w-48 h-48 mx-auto rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
              <img 
                src={selected.image} 
                alt={selected.name} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#188bff] rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>
      </div>

      {/* Testimonial Carousel */}
      <div className="relative">
        <button 
          onClick={handlePrev} 
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white border-2 border-[#188bff] rounded-full flex items-center justify-center text-[#188bff] hover:bg-[#188bff] hover:text-white transition-all duration-300 shadow-lg z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="flex justify-center gap-6 overflow-x-auto px-12 no-scrollbar">
          {testimonials.slice(index, index + 3).map((person) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`flex flex-col items-center cursor-pointer p-4 rounded-2xl transition-all duration-300 min-w-[120px] ${
                selected.id === person.id 
                  ? 'bg-gradient-to-br from-[#188bff] to-cyan-400 shadow-lg' 
                  : 'bg-white border-2 border-blue-100 hover:border-[#188bff]'
              }`}
              onClick={() => handleSelect(person)}
            >
              <div className={`w-16 h-16 rounded-2xl p-1 transition-all duration-300 ${
                selected.id === person.id ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                <img 
                  src={person.image} 
                  alt={person.name} 
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>
              
              <div className={`mt-3 text-center ${
                selected.id === person.id ? 'text-white' : 'text-gray-700'
              }`}>
                <h4 className="font-semibold text-sm">{person.name.split(' ')[0]}</h4>
                <p className="text-xs opacity-80">{person.job.split(',')[0]}</p>
              </div>
              
              <div className="flex gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${
                      selected.id === person.id 
                        ? 'fill-white text-white' 
                        : 'fill-yellow-400 text-yellow-400'
                    }`} 
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <button 
          onClick={handleNext} 
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white border-2 border-[#188bff] rounded-full flex items-center justify-center text-[#188bff] hover:bg-[#188bff] hover:text-white transition-all duration-300 shadow-lg z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i * 3)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === i * 3 ? 'bg-[#188bff] w-8' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default Testimonials;