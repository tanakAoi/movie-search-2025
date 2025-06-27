import { cloneElement } from "react";

export const IconWrapper = ({
  width = 50,
  height = 50,
  fill = "#0077B7",
  viewBox = "0 0 50 50",
  children = <></>,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height}
      className={className}
    >
      {cloneElement(children, { fill })}
    </svg>
  );
};
