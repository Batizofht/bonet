import Link from "next/link";

const LogoName = () => {
  return (
    <Link href="/" className="flex items-center shrink-0" aria-label="Bonet Elite Services - Home">
      <picture>
        <source srcSet="/assets/images/bonet-logo.webp" type="image/webp" />
        <img
          src="/assets/images/bonet-logo.png"
          alt="Bonet Elite Services Logo"
          width={1000}
          height={392}
          className="h-9 sm:h-10 md:h-11 w-auto max-w-[150px] sm:max-w-[170px] md:max-w-[190px] object-contain"
          fetchPriority="high"
        />
      </picture>
    </Link>
  );
};

export default LogoName;
