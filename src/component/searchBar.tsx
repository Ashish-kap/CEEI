import { Input } from "@/components/ui/input";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Input
      placeholder="Search users by name or email..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="max-w-md"
    />
  );
}
