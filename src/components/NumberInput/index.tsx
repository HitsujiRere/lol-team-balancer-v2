import { err, ok, type Result } from "neverthrow";
import { type ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type NumberInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange"
> & {
  value: number;
  onValueChange: (value: number) => void;
  encode?: (value: number) => string;
  decode?: (value: string) => Result<number, void>;
};

export const defaultEncode = (value: number) => `${value}`;
export const defaultDecode = (value: string) => {
  const parsed = Number(value);
  return !Number.isNaN(parsed) ? ok(parsed) : err();
};

export const NumberInput = ({
  value,
  onValueChange,
  encode = defaultEncode,
  decode = defaultDecode,
  ...props
}: NumberInputProps) => {
  const [dirty, setDirty] = useState(encode(value));
  useEffect(() => {
    setDirty(encode(value));
  }, [encode, value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const dirty = event.target.value;
    setDirty(dirty);

    const decoded = decode(dirty);
    if (decoded.isOk()) {
      onValueChange(decoded.value);
    }
  };

  const handleBlur = () => {
    setDirty(encode(value));
  };

  return (
    <Input
      type="number"
      value={dirty}
      onChange={handleChange}
      onBlur={handleBlur}
      {...props}
    />
  );
};

export const InputGroupNumberInput = ({
  className,
  ...props
}: NumberInputProps) => {
  return (
    <NumberInput
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        className,
      )}
      {...props}
    />
  );
};
