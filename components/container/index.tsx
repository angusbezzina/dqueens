import { ReactChild } from "react";

interface ContainerProps {
  classNames?: string;
  children: ReactChild[] | ReactChild | undefined;
}

const Container = ({ classNames, children }: ContainerProps) => {

  return (
    <div className={`w-full h-full max-w-7xl mx-auto flex flex-col justify-center ${ classNames }`}>
      { children }
    </div>
  );
}

export default Container;