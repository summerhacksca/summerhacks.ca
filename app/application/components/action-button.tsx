import { ArrowUp } from "@phosphor-icons/react";

type ActionButtonProps = {
  label: string;
  direction: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "primary";
  type?: "button" | "submit";
};

export function ActionButton({
  label,
  direction,
  onClick,
  disabled = false,
  variant = "default",
  type = "button",
}: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-14 items-center justify-center overflow-clip px-4 rounded-[100px] shrink-0 transition-colors disabled:opacity-50 cursor-pointer max-md:w-full ${
        variant === "primary"
          ? "bg-[#F80] text-white hover:bg-[#e67300]"
          : "bg-(--primary\\/sun\\/100,#ffefdd) text-[#B07F46] hover:bg-(--primary\\/sun\\/200,#fde4c8)"
      }`}
    >
      <div className="flex items-center justify-center gap-2 relative shrink-0">
        {label}
        <div className={direction === "left" ? "flex-none -rotate-90" : "flex-none rotate-90"}>
          <ArrowUp size={20} weight="bold" className="block max-w-none size-full" />
        </div>
      </div>
    </button>
  );
}
