import { useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import { DirectionalLightHelper } from "three";

type Props = {};

const Lights = (props: Props) => {
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useHelper(lightRef, DirectionalLightHelper, 1, "red");

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        ref={lightRef}
        position={[0, 20, 20]}
        castShadow
        shadow-mapSize-width={1000}
        shadow-mapSize-height={1000}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <hemisphereLight args={["#7cdbef", "#5c9c49", 0.7]} />
    </>
  );
};

export default Lights;
