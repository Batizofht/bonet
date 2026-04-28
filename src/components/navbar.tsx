import LogoName from "./Logoname";
import MenuBars from "./MenuBars";
import QuickButtons from "./QuickButtons";

const Navbar = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 md:px-8 bg-white border-b border-gray-200 shadow-sm z-50">
        <LogoName />
        <MenuBars />
        <QuickButtons />
      </nav>
      
      {/* Spacer for content */}
      <div className="mt-16" />
    </>
  );
};

export default Navbar;