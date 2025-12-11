import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { cn } from "@/lib/utils";
import { formatRank, RANKS, type Rank, rankToPoint } from "@/types/rank";
import { InputGroupNumberInput } from "../NumberInput";
import { ButtonGroup } from "../ui/button-group";
import { InputGroup, InputGroupAddon } from "../ui/input-group";
import { classNameEachRank } from "./utils/classname-each-rank";

export const RankSelect = ({
  rank,
  point,
  disabled,
  onChange,
}: {
  rank: Rank;
  point: number;
  disabled?: boolean;
  onChange: (rank: Rank, point: number) => void;
}) => {
  return (
    <ButtonGroup>
      <NativeSelect
        value={rank}
        className={cn(classNameEachRank(rank), "w-34 rounded-r-none")}
        disabled={disabled}
        onChange={(event) => {
          const rank = event.target.value as Rank;
          onChange(rank, rankToPoint(rank));
        }}
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
        <InputGroupNumberInput
          value={point}
          className="no-number-spin w-10 text-right"
          // readOnly
          disabled={disabled}
          onValueChange={(point) => onChange(rank, point)}
        />
        <InputGroupAddon align="inline-end">pt</InputGroupAddon>
      </InputGroup>
    </ButtonGroup>
  );
};
