import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";

export const FooterRow = () => {
  return (
    <TableRow>
      <TableCell />
      <TableCell colSpan={99}>
        <ButtonGroup>
          <Input defaultValue="サモナー #JP2" className="w-48" />
          <Button variant="outline">追加</Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};
