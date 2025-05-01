import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type SortDropdownProps = {
  sortKey: "name" | "username";
  sortOrder: "asc" | "desc";
  onSortChange: (key: "name" | "username", order: "asc" | "desc") => void;
};

export function SortDropdown({
  sortKey,
  sortOrder,
  onSortChange,
}: SortDropdownProps) {
  return (
    <Select
      value={`${sortKey}-${sortOrder}`}
      onValueChange={(value) => {
        const [key, order] = value.split("-") as [
          "name" | "username",
          "asc" | "desc"
        ];
        onSortChange(key, order);
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
        <SelectItem value="username-asc">Username (A-Z)</SelectItem>
        <SelectItem value="username-desc">Username (Z-A)</SelectItem>
      </SelectContent>
    </Select>
  );
}
