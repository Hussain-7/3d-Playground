import { useLoader } from "@react-three/fiber";
import React, { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type Props = {};

const Trees = () => {
  const gltf = useLoader(GLTFLoader, "/models/tree_scaled_down.glb");
  console.log(gltf);
  // Treverse through all childs of scene object a allow shoadow casting
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      // child.receiveShadow = true;
    }
  });
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  );
};

export default Trees;
