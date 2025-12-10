import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { cn } from "@/lib/utils";
import { formatRank, RANKS, type Rank, rankToPoint } from "@/types/rank";
import { ButtonGroup } from "../ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { classNameEachRank } from "./utils/classname-each-rank";

export const RankSelect = ({
  rank,
  disabled,
  onChange,
}: {
  rank: Rank;
  disabled?: boolean;
  onChange: (rank: Rank) => void;
}) => {
  return (
    <ButtonGroup>
      <NativeSelect
        value={rank}
        className={cn(classNameEachRank(rank), "w-34 rounded-r-none")}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value as Rank)}
      >
        {RANKS.map((optionRank) => (
          <NativeSelectOption
            key={optionRank}
            value={optionRank}
            className={classNameEachRank(optionRank)}
          >
            {formatRank(optionRank)}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <InputGroup>
        <InputGroupInput
          value={rankToPoint(rank)}
          className="w-10"
          readOnly
          disabled={disabled}
        />
        <InputGroupAddon align="inline-end">pt</InputGroupAddon>
      </InputGroup>
    </ButtonGroup>
  );
};
