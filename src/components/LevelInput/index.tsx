import { err, ok } from "neverthrow";
import { InputGroupNumberInput } from "../NumberInput";
import { InputGroup, InputGroupAddon } from "../ui/input-group";

export const LevelInput = ({
  level,
  onChange,
}: {
  level: number;
  onChange: (level: number) => void;
}) => {
  const encode = (value: number) => (value === 0 ? "" : `${value}`);
  const decode = (value: string) => {
    if (value === "") return ok(0);
    const parsed = Number(value);
    return !Number.isNaN(parsed) ? ok(parsed) : err();
  };

  return (
    <InputGroup>
      <InputGroupAddon align="inline-start">Lv.</InputGroupAddon>
      <InputGroupNumberInput
        className="w-12"
        value={level}
        onValueChange={onChange}
        encode={encode}
        decode={decode}
      />
    </InputGroup>
  );
};
