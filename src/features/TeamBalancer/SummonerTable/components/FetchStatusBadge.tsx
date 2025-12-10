import {
  SearchCheckIcon,
  SearchIcon,
  SearchXIcon,
  ServerCrashIcon,
} from "lucide-react";
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
      <TooltipTrigger asChild>
        <div
          className={cn("grid size-6 place-items-center", {
            "pointer-events-none": status === "IDLE",
          })}
        >
          {status === "LOADING" ? (
            <SearchIcon className="size-4 animate-bounce stroke-blue-600" />
          ) : status === "SUCCESS" ? (
            <SearchCheckIcon className="size-4 stroke-blue-600" />
          ) : status === "NOT_FOUND" ? (
            <SearchXIcon className="size-4 stroke-red-600" />
          ) : status === "ERROR" ? (
            <ServerCrashIcon className="size-4 stroke-red-600" />
          ) : undefined}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {status === "LOADING" ? (
          <div>サモナー検索中</div>
        ) : status === "SUCCESS" ? (
          <div>サモナーが見つかりました！</div>
        ) : status === "NOT_FOUND" ? (
          <div>サモナーが見つかりませんでした</div>
        ) : status === "ERROR" ? (
          <div>サモナー検索に失敗しました</div>
        ) : undefined}
      </TooltipContent>
    </Tooltip>
  );
};
