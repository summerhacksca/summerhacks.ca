import { Textarea } from "@/components/ui/textarea";

function limitWords(value: string, maxWords: number) {
  const words = value.trim().split(/\s+/).filter(Boolean);

  if (words.length <= maxWords) {
    return value;
  }

  return words.slice(0, maxWords).join(" ");
}

type ApplicationTextFieldProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  multiline?: boolean;
  maxWords?: number;
};

export function ApplicationTextField({
  placeholder,
  value,
  onChange,
  required = true,
  multiline = false,
  maxWords = 500,
}: ApplicationTextFieldProps) {
  const handleChange = (nextValue: string) => {
    if (multiline) {
      onChange(limitWords(nextValue, maxWords));
      return;
    }

    onChange(nextValue);
  };

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
      {multiline ? (
        <Textarea
          placeholder={placeholder}
          value={value}
          onChange={(event) => handleChange(event.target.value)}
          required={required}
          aria-required={required}
          rows={5}
          className="min-h-32 w-full resize-y border-0 bg-transparent p-0 shadow-none placeholder:text-[#b07f46]/60 focus-visible:ring-0 dark:bg-transparent"
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(event) => handleChange(event.target.value)}
          required={required}
          aria-required={required}
          className="w-full bg-transparent outline-none placeholder:text-[#b07f46]/60"
        />
      )}
    </div>
  );
}
