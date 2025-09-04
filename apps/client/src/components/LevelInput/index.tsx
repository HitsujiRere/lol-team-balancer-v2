import { type ChangeEvent, useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const encodeLevel = (level: number): string => {
  if (level === 0) {
    return "";
  }
  return level.toString();
};

const decodeLevel = (text: string): number => {
  const decoded = Number.parseInt(text, 10);
  if (Number.isNaN(decoded)) {
    return 0;
  }
  return decoded;
};

export const LevelInput = ({
  level,
  onLevelChange,
}: {
  level: number;
  onLevelChange: (level: number) => void;
}) => {
  const [rawValue, setRawValue] = useState(encodeLevel(level));

  useEffect(() => {
    setRawValue(encodeLevel(level));
  }, [level]);

  const handleBlur = useCallback(() => {
    const nextLevel = decodeLevel(rawValue);

    setRawValue(encodeLevel(nextLevel));

    if (level !== nextLevel) {
      onLevelChange(nextLevel);
    }
  }, [level, onLevelChange, rawValue]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRawValue(event.target.value);
  }, []);

  return (
    <Input
      onBlur={handleBlur}
      onChange={handleChange}
      type="number"
      value={rawValue}
      className="w-24"
    />
  );
};
