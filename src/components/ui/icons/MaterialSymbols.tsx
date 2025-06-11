import { IconWrapperProps } from "@/types/icon";
import { IconWrapper } from "./IconWrapper";

const ChevronLeft = (props: IconWrapperProps) => {
  return (
    <IconWrapper viewBox="0 -960 960 960" {...props}>
      <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
    </IconWrapper>
  );
};

const Video = (props: IconWrapperProps) => {
  return (
    <IconWrapper viewBox="0 -960 960 960" {...props}>
      <path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z" />
    </IconWrapper>
  );
};

const Close = (props: IconWrapperProps) => {
  return (
    <IconWrapper viewBox="0 -960 960 960" {...props}>
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </IconWrapper>
  );
};

export { ChevronLeft, Video, Close };
