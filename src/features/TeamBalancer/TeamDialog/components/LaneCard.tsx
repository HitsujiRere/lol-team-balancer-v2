import type { LaneName } from "../../types/lane-name";

export const LaneCard = ({ lane }: { lane: LaneName }) => {
  return (
    <div className="col-start-2 flex flex-col items-center gap-2 rounded-md border-2 p-4">
      <p>{lane}</p>
      <p>ランク差：1pt</p>
    </div>
  );
};
