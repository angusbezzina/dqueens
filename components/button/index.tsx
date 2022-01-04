import { ReactChild } from "react";

interface ButtonProps {
  classNames?: string;
  children: ReactChild[] | string;
  onClick(): void;
}

const Button = ({ classNames, children, onClick }: ButtonProps) => {
  return (
    <button className={`bg-none border-none ${classNames}`} onClick={() => onClick()}>
      { children }
    </button>
  );
}

export default Button; 