import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={`max-w-7xl w-full mx-auto my-0 py-10 min-h-screen ${className}`}>
      {children}
    </div>
  );
};
