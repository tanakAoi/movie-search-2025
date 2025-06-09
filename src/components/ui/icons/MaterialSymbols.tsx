import { IconWrapperProps } from "@/types/icon";
import { IconWrapper } from "./IconWrapper";

const ChevronLeft = (props: IconWrapperProps) => {
  return (
    <IconWrapper viewBox="0 -960 960 960" {...props}>
      <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
    </IconWrapper>
  );
};

export { ChevronLeft };
