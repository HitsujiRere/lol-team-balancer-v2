import { StarIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

// <Button variant="ghost" size="icon">
//   <StarIcon className="size-6 fill-yellow-400 stroke-yellow-500" />
// </Button>
// <Button variant="ghost" size="icon">
//   <StarIcon className="size-6 stroke-border" />
// </Button>

export const Stars = ({
  size,
  value,
  onChange,
}: {
  size: number;
  value: number;
  onChange: (value: number) => void;
}) => {
  const stars = [...Array(size)].map((_, index) => index);

  const handleChange = (value: string) => {
    onChange(Number(value));
  };

  return (
    <ToggleGroup type="single" value={`${value}`} onValueChange={handleChange}>
      {stars.map((star) => (
        <ToggleGroupItem
          key={star}
          value={`${star}`}
          className="group p-1 data-[state=on]:bg-transparent"
        >
          <StarIcon
            className={cn("size-6", {
              "fill-yellow-400 stroke-yellow-500": value >= star,
              "stroke-border": value < star,
            })}
          />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
