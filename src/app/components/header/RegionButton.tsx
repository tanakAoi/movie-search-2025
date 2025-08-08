import { useRef, useEffect } from "react";
import { Globe } from "../ui/icons/MaterialSymbols";

type RegionButtonProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  modalRef: React.RefObject<HTMLDivElement | null>;
};

export const RegionButton = ({
  isModalOpen,
  setIsModalOpen,
  modalRef,
}: RegionButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsModalOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modalRef, setIsModalOpen]);

  return (
    <button
      onClick={() => setIsModalOpen(!isModalOpen)}
      aria-label="Region settings"
      className="cursor-pointer"
      ref={buttonRef}
    >
      <Globe width={24} height={24} fill={"var(--color-base-bg)"} />
    </button>
  );
};
