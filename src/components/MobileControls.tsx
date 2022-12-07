import React from "react";

type Props = {};

const MobileControls = (props: Props) => {
  return (
    <div className="buttonContainer">
      {/* Create 6 button for up,down,left,right and shift and jump */}
      {/* Create a button for switching between first and third person view */}
      <div className="leftSideButtons">
        {" "}
        <button className="controllButtons">up</button>
        <div className="flex">
          <button className="controllButtons">left</button>
          <button className="controllButtons">down</button>
          <button className="controllButtons">right</button>
        </div>
      </div>
      <div className="rightSideButtons">
        <button className="controllButtons">shift</button>
        <button className="controllButtons">jump</button>
      </div>
    </div>
  );
};

export default MobileControls;
