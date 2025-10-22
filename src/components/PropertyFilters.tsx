import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertyFiltersProps {
  types: string[];
  statuses: string[];
  selectedType: string;
  selectedStatus: string;
  sortOrder: string;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export const PropertyFilters = ({
  types,
  statuses,
  selectedType,
  selectedStatus,
  sortOrder,
  onTypeChange,
  onStatusChange,
  onSortChange,
}: PropertyFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Select value={selectedType} onValueChange={onTypeChange}>
        <SelectTrigger className="h-12 bg-card border-border">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {types.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="h-12 bg-card border-border">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortOrder} onValueChange={onSortChange}>
        <SelectTrigger className="h-12 bg-card border-border">
          <SelectValue placeholder="Sort by Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Default</SelectItem>
          <SelectItem value="asc">Price: Low to High</SelectItem>
          <SelectItem value="desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
