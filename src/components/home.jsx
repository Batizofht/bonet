import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Home = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 py-16 max-w-7xl mx-auto mt-15">
      {/* Left Section - Text Content (Moves to top on small screens) */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} // Start faded out and slightly above
        animate={{ opacity: 1, y: 0 }} // Fade in and move down
        transition={{ duration: 0.8, ease: "easeOut" }} // Adjust duration for smoother fade
        className="w-full lg:w-1/2 space-y-5 text-left"
      >
        <h1 className="text-2xl -mt-10 sm:text-4xl text-gray-700 font-bold ml-0 lg:ml-12">
          Welcome To Bonet <br />
          <span className="bg-[#188bff] bg-clip-text text-transparent font-bold">
          Elite Services</span>
        </h1>

        <p className="text-gray-600 max-w-[500px] ml-0 lg:ml-12"style={{fontSize:'14px'}}>
        Your Trusted Partner for Travel, Business & Investment in Rwanda
        </p>
        <p className="text-gray-700 lg:ml-12 max-w-130">At Bonet Elite Services,
         we simplify your experience in Rwanda by offering tailored travel, business,
          and investment support. Whether you are a tourist, an entrepreneur, or a foreign 
          investor, we ensure a smooth and hassle-free journey from arrival to establishment</p>
        <motion.button 
  initial={{ opacity: 0, y: -50 }}
  animate={{
    opacity: 1,
    y: 0,
    boxShadow: [
      "0px 0px 0px rgba(87, 0, 123, 0.2)", 
      "0px 0px 15px rgba(87, 0, 123, 0.5)", 
      "0px 0px 0px rgba(87, 0, 123, 0.2)"
    ],
  }}
  
  whileHover={{ scale: 1.05 }}
  className="ml-0 lg:ml-12 bg-gradient-to-r from-[#6675F7] to-[#57007B] text-white px-6 py-3 rounded-lg text-lg font-medium transition-transform"
  onClick={() => navigate('/bookNow')}
>
  Let's get started!
</motion.button>


      </motion.div>

      {/* Right Section - Image (Moves below text on small screens) */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} // Image starts off above
        animate={{ opacity: 1, y: 0 }} // Moves down and fades in
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} // Adjust delay to sync with text
        className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0"
      >
        <img
          src="/assets/images/home.png"
          alt="Illustration"
          className="w-full max-w-lg"
        />
      </motion.div>
      
    </section>
  );
};

export default Home;
