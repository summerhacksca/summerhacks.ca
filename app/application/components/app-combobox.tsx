import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

type AppComboBoxProps = {
  items: string[];
  placeholder: string;
  value: string;
  onValueChange: (value: string | null) => void;
  required?: boolean;
};

export function AppComboBox({
  items,
  placeholder,
  value,
  onValueChange,
  required = true,
}: AppComboBoxProps) {
  return (
    <Combobox items={items} value={value} onValueChange={onValueChange}>
      <div className="w-full">
        <ComboboxInput
          placeholder={placeholder}
          required={required}
          aria-required={required}
        />
      </div>
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
