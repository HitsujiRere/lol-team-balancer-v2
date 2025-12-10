import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  pointerWithin,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useId, useState } from "react";
import { createPortal } from "react-dom";
import { Flipper } from "react-flip-toolkit";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LANE_NAMES, type LaneName } from "../../types/lane-name";
import { TEAM_NAMES, type TeamName } from "../../types/team-name";
import type { Group } from "../types/group";
import { LaneCard } from "./LaneCard";
import { SummonerCard } from "./SummonerCard";
import { SummonerCardView } from "./SummonerCardView";
import { TeamCard } from "./TeamCard";

export const TeamTable = () => {
  const [group, setGroup] = useState<Group>({
    blue: { top: "a", jg: "b", mid: "c", bot: "d", sup: "e" },
    red: { top: "f", jg: "g", mid: "h", bot: "i", sup: "j" },
  });

  const dndId = useId();
  const [activeTeam, setActiveTeam] = useState<TeamName | undefined>(undefined);
  const [activeName, setActiveName] = useState<string | undefined>(undefined);

  const groupEntries = () =>
    TEAM_NAMES.flatMap((team) =>
      LANE_NAMES.map<[TeamName, LaneName, string]>((lane) => [
        team,
        lane,
        group[team][lane],
      ]),
    );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveName(active.id as string);
    setActiveTeam(active.data.current?.team as TeamName);
  };
  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (over == null || active.id === over.id) {
      return;
    }
    const activeName = active.id as string;
    const activeTeam = active.data.current?.team as TeamName;
    const activeLane = active.data.current?.lane as LaneName;
    const overName = over.id as string;
    const overTeam = over.data.current?.team as TeamName;
    const overLane = over.data.current?.lane as LaneName;
    setGroup((group) => {
      const newv = { ...group };
      newv[activeTeam] = { ...newv[activeTeam], [activeLane]: overName };
      newv[overTeam] = { ...newv[overTeam], [overLane]: activeName };
      return newv;
    });
    setActiveTeam(overTeam);
  };
  const handleDragEnd = (_: DragEndEvent) => {
    // setTimeout(() => setActiveName(undefined), 1000);
    setActiveName(undefined);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4 flex gap-2">
        <Button>チーム分け</Button>
        <ToggleGroup type="single" variant="outline" defaultValue="rank">
          <ToggleGroupItem value="level">レベル</ToggleGroupItem>
          <ToggleGroupItem value="rank">ランク</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <DndContext
        id={dndId}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={groupEntries().map(([, , name]) => name)}>
          <Flipper
            flipKey={JSON.stringify(group)}
            className="grid grid-flow-row-dense grid-cols-[1.5fr_1fr_1.5fr] gap-4"
          >
            <TeamCard team="blue" />
            <div className="flex flex-col items-center gap-2 rounded-md border-2 border-border p-4">
              <p>平均ランク差：2pt</p>
              <Button>コピー</Button>
            </div>
            <TeamCard team="red" />

            {groupEntries().map(([team, lane, name]) => (
              <SummonerCard
                key={name}
                name={name}
                team={team}
                lane={lane}
                noFlip={!!activeName}
              />
            ))}
            <LaneCard lane="top" />
            <LaneCard lane="jg" />
            <LaneCard lane="mid" />
            <LaneCard lane="bot" />
            <LaneCard lane="sup" />
          </Flipper>
        </SortableContext>
        {
          // DialogのtransformによりDragOverlayのposition:fixedが正しく機能しないため
          // issue: dnd-kit#1649
          createPortal(
            <DragOverlay>
              {activeName && activeTeam && (
                <SummonerCardView name={activeName} team={activeTeam} />
              )}
            </DragOverlay>,
            document.body,
          )
        }
      </DndContext>
    </div>
  );
};
