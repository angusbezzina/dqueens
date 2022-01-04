import { ReactChild } from "react";

interface ContainerProps {
  classNames?: string;
  children: ReactChild[] | ReactChild | undefined;
}

const Container = ({ classNames, children }: ContainerProps) => {

  return (
    <div className={`w-full h-full flex flex-col align-center justify-center ${ classNames }`}>
      { children }
    </div>
  );
}

export default Container;