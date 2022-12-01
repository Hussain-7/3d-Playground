import { useLoader } from "@react-three/fiber";
import React, { Suspense, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type treeType = {
  position: { x: number; z: number };
  box: number;
};

type Props = {
  boundry: number;
  count: number;
};

const Trees: React.FC<Props> = ({ boundry = 10, count = 100 }) => {
  const gltf = useLoader(GLTFLoader, "/models/tree_scaled_down.glb");
  const [trees, setTrees] = React.useState<treeType[]>([]);
  // Treverse through all childs of scene object a allow shoadow casting
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      // child.receiveShadow = true;
    }
  });
  const boxIntersect = (
    minAx: number,
    minAz: number,
    maxAx: number,
    maxAz: number,
    minBx: number,
    minBz: number,
    maxBx: number,
    maxBz: number
  ) => {
    const condition1 = maxAx < minBx;
    const condition2 = minAx > maxBx;
    const condition3 = minAz > maxBz;
    const condition4 = maxAz < minBz;

    return !(condition1 || condition2 || condition3 || condition4);
  };

  const isOverlapping = (trees: treeType[], tree: treeType, index: number) => {
    const val = tree.box / 2;
    const minTargetX = tree.position.x - val;
    const maxTargetX = tree.position.x + val;
    const minTargetZ = tree.position.z - val;
    const maxTargetZ = tree.position.z + val;
    for (let i = 0; i < index; i++) {
      const val = tree.box / 2;
      let minChildX = trees[i].position.x - val;
      let maxChildX = trees[i].position.x + val;
      let minChildZ = trees[i].position.z - val;
      let maxChildZ = trees[i].position.z + val;
      if (
        boxIntersect(
          minTargetX,
          minTargetZ,
          maxTargetX,
          maxTargetZ,
          minChildX,
          minChildZ,
          maxChildX,
          maxChildZ
        )
      ) {
        return true;
      }
    }
    return false;
  };
  const newPosition = (box: number, boundry: number) => {
    return (
      boundry / 2 -
      box / 2 -
      (boundry - box) * (Math.round(Math.random() * 100) / 100)
    );
  };
  const updatePostion = (treeArray: treeType[], boundry: number) => {
    treeArray.forEach((tree, index) => {
      do {
        tree.position.x = newPosition(tree.box, boundry);
        tree.position.z = newPosition(tree.box, boundry);
      } while (isOverlapping(treeArray, tree, index));
    });
    setTrees(treeArray);
  };

  useEffect(() => {
    const tempTree: treeType[] = [];
    // populate trees array with dummy values
    for (let i = 0; i < count; i++) {
      tempTree.push({
        position: { x: 0, z: 0 },
        box: 1,
      });
    }
    // update position of each tree
    updatePostion(tempTree, boundry);
  }, [boundry, count]);
  return (
    <Suspense fallback={null}>
      {/* If we want to add any transformation to all objects we cann group them */}
      <group>
        {trees.map((tree, key) => (
          <object3D key={key} position={[tree.position.x, 0, tree.position.z]}>
            <mesh scale={[tree.box, tree.box, tree.box]}>
              <boxGeometry />
              <meshBasicMaterial color={"blue"} wireframe />
            </mesh>
            <primitive object={gltf.scene.clone()} />
          </object3D>
        ))}
      </group>
    </Suspense>
  );
};

export default Trees;
