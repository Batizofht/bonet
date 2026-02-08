import LogoName from "./Logoname";
import MenuBars from "./MenuBars";
import QuickButtons from "./QuickButtons";

const Navbar = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 md:px-8 bg-white/40 backdrop-blur border-b border-white/20 shadow-lg z-50">
        {/* Background gradient for extra visual appeal */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-cyan-50/20 pointer-events-none" />
        
        {/* Optional: Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#188bff]/10 rounded-full blur-xl"></div>
          <div className="absolute -top-5 -right-5 w-16 h-16 bg-cyan-400/10 rounded-full blur-xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <LogoName />
        </div>
        
        <div className="relative z-10">
          <MenuBars />
        </div>
        
        <div className="relative z-10">
          <QuickButtons />
        </div>
      </nav>
      
      {/* Spacer for content */}
      <div className="mt-16" />
    </>
  );
};

export default Navbar;