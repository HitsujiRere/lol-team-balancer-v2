import { RANKS, type Rank } from "@packages/models/Rank";
import { CheckIcon } from "lucide-react";
import { useCallback, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { RankLabel } from "./components/RankLabel";

export const RankSelect = ({
  rank,
  onChange,
}: {
  rank?: Rank;
  onChange: (rank: Rank) => void;
}) => {
  const [open, setOpen] = useState(false);
  const handleItemSelect = useCallback(
    (value: string) => {
      onChange(value as Rank);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-48 justify-between"
          role="combobox"
          variant="outline"
        >
          <RankLabel rank={rank} />
          {/* <ChevronsUpDownIcon className="opacity-50" /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0">
        <Command>
          <CommandInput placeholder="検索" />
          <CommandList className="max-h-[40vh]">
            <CommandEmpty>ランクが見つかりません 😵‍💫</CommandEmpty>
            <CommandGroup>
              {RANKS.map((itemRank) => (
                <CommandItem
                  key={itemRank}
                  onSelect={handleItemSelect}
                  value={itemRank}
                >
                  <RankLabel rank={itemRank} />
                  <CheckIcon
                    className={cn(
                      "ml-auto",
                      itemRank === rank ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
