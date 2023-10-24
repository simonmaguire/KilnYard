import React from "react";
import PotCard from "./PotCard";

type PotteryCardGridProps = {
  pots: IPot[];
  loadingPots: boolean;
  handleDeletePot: (id: string) => void;
};

const PotteryCardGrid: React.FC<PotteryCardGridProps> = (props) => {
  return (
    <div className="pottery-grid-view">
      {props.pots.map((pot, y) => (
        <PotCard
          key={y}
          pot={pot}
          handleDelete={props.handleDeletePot}
        ></PotCard>
      ))}
    </div>
  );
};

export default PotteryCardGrid;
