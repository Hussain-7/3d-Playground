import React from "react";

type Props = {};

const Ground = (props: Props) => {
  return (
    <>
      <mesh rotation-x={Math.PI * -0.5} receiveShadow>
        <planeBufferGeometry args={[100, 100]} />
        <meshStandardMaterial color="#458745" />
      </mesh>
    </>
  );
};

export default Ground;
