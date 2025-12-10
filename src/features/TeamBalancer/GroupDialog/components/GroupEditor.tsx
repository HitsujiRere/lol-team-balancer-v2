import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { createGroup, type Group } from "../types/group";
import { GroupTable } from "./GroupTable";

export const GroupEditor = () => {
  const [group, setGroup] = useState<Group>(createGroup());

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4 flex gap-2">
        <Button>チーム分け</Button>
        <ToggleGroup type="single" variant="outline" defaultValue="rank">
          <ToggleGroupItem value="level">レベル</ToggleGroupItem>
          <ToggleGroupItem value="rank">ランク</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <GroupTable group={group} setGroup={setGroup} />
    </div>
  );
};
