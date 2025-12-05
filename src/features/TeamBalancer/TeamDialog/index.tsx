import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TeamTable } from "./components/TeamTable";

export const TeamDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>

        <DialogContent className="max-w-4xl!">
          <DialogHeader>
            <DialogTitle>チーム分け</DialogTitle>
          </DialogHeader>

          <TeamTable />
        </DialogContent>
      </form>
    </Dialog>
  );
};
