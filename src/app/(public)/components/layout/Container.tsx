import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={`max-w-7xl w-full mx-auto my-0 p-10 ${className}`}>
      {children}
    </div>
  );
};
