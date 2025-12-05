import { MicIcon, MicOffIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";

const Stars = () => {
  return (
    <ButtonGroup>
      <Button variant="ghost" size="icon">
        <StarIcon className="size-6 fill-yellow-400 stroke-yellow-500" />
      </Button>
      <Button variant="ghost" size="icon">
        <StarIcon className="size-6 stroke-border" />
      </Button>
      <Button variant="ghost" size="icon">
        <StarIcon className="size-6 stroke-border" />
      </Button>
    </ButtonGroup>
  );
};

export const SummonerTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-8">
            <Checkbox />
          </TableHead>
          <TableHead>名前</TableHead>
          <TableHead>レベル</TableHead>
          <TableHead>ランク</TableHead>
          <TableHead>TOP</TableHead>
          <TableHead>JG</TableHead>
          <TableHead>MID</TableHead>
          <TableHead>BOT</TableHead>
          <TableHead>SUP</TableHead>
          <TableHead>聞き専</TableHead>
          <TableHead>チーム固定</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell>サモナー #JP1</TableCell>
          <TableCell>
            <Input defaultValue="123" className="w-16" />
          </TableCell>
          <TableCell>
            <Input defaultValue="Gold 1" className="w-24" />
          </TableCell>
          <TableCell>
            <Stars />
          </TableCell>
          <TableCell>
            <Stars />
          </TableCell>
          <TableCell>
            <Stars />
          </TableCell>
          <TableCell>
            <Stars />
          </TableCell>
          <TableCell>
            <Stars />
          </TableCell>
          <TableCell>
            <Toggle className="group relative">
              <MicIcon className="transition-opacity group-data-[state=on]:opacity-0" />
              <MicOffIcon className="absolute transition-opacity group-data-[state=off]:opacity-0" />
            </Toggle>
          </TableCell>
          <TableCell>
            <Input defaultValue="青" className="w-12" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell />
          <TableCell colSpan={9}>
            <ButtonGroup>
              <Input defaultValue="サモナー #JP2" className="w-48" />
              <Button variant="outline">追加</Button>
            </ButtonGroup>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
