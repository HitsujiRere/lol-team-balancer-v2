import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TeamTable } from "./components/TeamTable";

export const TeamDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl!">
        <DialogHeader>
          <DialogTitle>チーム分け</DialogTitle>
        </DialogHeader>

        <TeamTable />
      </DialogContent>
    </Dialog>
  );
};
