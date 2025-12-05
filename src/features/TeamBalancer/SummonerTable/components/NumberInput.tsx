import { err, ok, type Result } from "neverthrow";
import { type ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const encode = (value?: number): string => {
  if (value === undefined || value === 0) {
    return "";
  }
  return `${value}`;
};

const decode = (value: string): Result<number, void> => {
  if (value === "") {
    return ok(0);
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return err();
  }
  return ok(parsed);
};

export const NumberInput = ({
  value,
  onValueChange,
  ...props
}: Omit<React.ComponentProps<"input">, "value" | "onChange"> & {
  value?: number;
  onValueChange: (value: number) => void;
}) => {
  const [dirty, setDirty] = useState(encode(value));
  useEffect(() => {
    setDirty(encode(value));
  }, [value]);

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
