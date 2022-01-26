import Image from "next/image";

interface LogoProps {
  size: "large" | "small";
  className?: string;
}

const Logo = ({ size, className }: LogoProps) => {
  return size === "large" ? (
    <Image
      className={className}
      src="/dqueens.png"
      alt="D'Queens Logo Header"
      layout="fixed"
      height="64"
      width="64"
    />
  ) : (
    <Image
      className={className}
      src="/dqueens.png"
      alt="D'Queens Logo Footer"
      layout="fixed"
      height="40"
      width="40"
    />
  );
};

export default Logo;
