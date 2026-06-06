import Link from "next/link";

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
