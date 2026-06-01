type ApplicationTextFieldProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export function ApplicationTextField({
  placeholder,
  value,
  onChange,
}: ApplicationTextFieldProps) {
  return (
    <div
      className="w-full border-b border-[#FFEFDD] bg-[#FFEFDD]"
      style={{
        display: "flex",
        padding: 16,
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 24,
        flex: "1 0 0",
        borderRadius: 4,
        backdropFilter: "blur(25px)",
      }}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent outline-none placeholder:text-[#b07f46]/60"
      />
    </div>
  );
}
