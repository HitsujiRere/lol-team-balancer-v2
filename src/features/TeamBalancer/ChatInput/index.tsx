import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const ChatInput = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <Label>ロビーチャット</Label>
      <Textarea placeholder="サモナー #JP1がロビーに参加しました。" />
    </div>
  );
};
