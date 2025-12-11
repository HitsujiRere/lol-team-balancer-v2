import { ok } from "neverthrow";
import {
  defaultDecode,
  defaultEncode,
  InputGroupNumberInput,
} from "../NumberInput";
import { InputGroup, InputGroupAddon } from "../ui/input-group";

export const LevelInput = ({
  level,
  disabled,
  onChange,
}: {
  level: number;
  disabled?: boolean;
  onChange: (level: number) => void;
}) => {
  const encode = (value: number) => (value === 0 ? "" : defaultEncode(value));
  const decode = (value: string) =>
    value === "" ? ok(0) : defaultDecode(value);

  return (
    <InputGroup className="w-20">
      <InputGroupAddon align="inline-start">Lv.</InputGroupAddon>
      <InputGroupNumberInput
        className="no-number-spin text-right"
        value={level}
        disabled={disabled}
        onValueChange={onChange}
        encode={encode}
        decode={decode}
      />
    </InputGroup>
  );
};
