import { SwordsIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const TeamSummonerTable = () => {
  return (
    <div>
      <h2 className="mb-2 inline-flex items-center gap-2 text-xl">
        <SwordsIcon className="size-5" />
        チーム分け
      </h2>

      <div className="flex gap-4">
        <div className="flex-1 overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>チーム青</TableHead>
                <TableHead>チーム赤</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex gap-4">
                    <div>リンゴ #JP1</div>
                    <div>Lv.345</div>
                    <div>GOLD I</div>
                    <div>
                      <Checkbox />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <div>バナナ #JP1</div>
                    <div>Lv.234</div>
                    <div>SILVER II</div>
                    <div>
                      <Checkbox />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
