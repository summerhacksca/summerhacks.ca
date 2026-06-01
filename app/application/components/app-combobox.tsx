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
};

export function AppComboBox({
  items,
  placeholder,
  value,
  onValueChange,
}: AppComboBoxProps) {
  return (
    <Combobox items={items} value={value} onValueChange={onValueChange}>
      <ComboboxInput placeholder={placeholder} />
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
