import { LoaderCircleIcon, SearchXIcon, ServerCrashIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { FetchStatus } from "../../types/fetch-status";

export const FetchStatusBadge = ({ status }: { status: FetchStatus }) => {
  return (
    <Tooltip>
      <TooltipTrigger
        className={cn("grid size-6 place-items-center", {
          "pointer-events-none": status === "IDLE" || status === "SUCCESS",
        })}
      >
        {status === "LOADING" ? (
          <LoaderCircleIcon className="size-4 animate-spin stroke-blue-600" />
        ) : status === "NOT_FOUND" ? (
          <SearchXIcon className="size-4 stroke-red-600" />
        ) : status === "ERROR" ? (
          <ServerCrashIcon className="size-4 stroke-red-600" />
        ) : undefined}
      </TooltipTrigger>
      <TooltipContent>
        {status === "LOADING" ? (
          <p>サモナー検索中</p>
        ) : status === "NOT_FOUND" ? (
          <p>サモナーが見つかりませんでした</p>
        ) : status === "ERROR" ? (
          <p>サモナー検索に失敗しました</p>
        ) : undefined}
      </TooltipContent>
    </Tooltip>
  );
};
