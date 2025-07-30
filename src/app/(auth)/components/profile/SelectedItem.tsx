import { DefaultButton } from "@/app/components/ui/DefaultButton";

export const SelectedItem = ({
  label,
  value,
  onClick,
}: {
  label: string;
  value?: string;
  onClick: () => void;
}) => {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <div className="flex items-center gap-2">
        <span className="text-base-fg/80 p-2 rounded-md w-full">
          {value || "Not selected"}
        </span>
        <DefaultButton text="Select" onClick={onClick} />
      </div>
    </div>
  );
};
