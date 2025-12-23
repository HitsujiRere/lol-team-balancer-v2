import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  pointerWithin,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { type Dispatch, type SetStateAction, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Flipper } from "react-flip-toolkit";
import { LANE_NAMES, type LaneName } from "../../types/lane-name";
import { TEAM_NAMES, type TeamName } from "../../types/team-name";
import type { Group } from "../types/group";
import { GroupCard } from "./GroupCard";
import { LaneCard } from "./LaneCard";
import { SummonerCard } from "./SummonerCard";
import { SummonerCardView } from "./SummonerCardView";
import { TeamCard } from "./TeamCard";

export const GroupTable = ({
  group,
  setGroup,
}: {
  group: Group;
  setGroup: Dispatch<SetStateAction<Group>>;
}) => {
  const groupEntries = () =>
    TEAM_NAMES.flatMap((team) =>
      LANE_NAMES.map((lane) => [team, lane, group[team][lane]] as const),
    );

  const dndId = useId();
  const [activeTeam, setActiveTeam] = useState<TeamName | undefined>(undefined);
  const [activeName, setActiveName] = useState<string | undefined>(undefined);

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
    setActiveName(undefined);
  };

  return (
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
          className="grid grid-flow-row-dense grid-cols-[minmax(0,1fr)_12rem_minmax(0,1fr)] gap-4"
        >
          <TeamCard name="blue" team={group.blue} />
          <GroupCard group={group} />
          <TeamCard name="red" team={group.red} />

          {LANE_NAMES.map((lane) => (
            <LaneCard
              key={lane}
              lane={lane}
              blueName={group.blue[lane]}
              redName={group.red[lane]}
            />
          ))}

          {groupEntries().map(([team, lane, name]) => (
            <SummonerCard
              key={name}
              name={name}
              team={team}
              lane={lane}
              noFlip={!!activeName}
            />
          ))}
        </Flipper>
      </SortableContext>
      {
        // DialogのtransformによりDragOverlayのposition:fixedが正しく機能しないためdocument.bodyに描画する
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
  );
};
