import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BoxHelper } from "three";
type Props = {
  isTesting: boolean;
};
const AnimatedBox = ({ isTesting }: Props) => {
  const meshRef = useRef<THREE.Mesh>(null);
  {
    isTesting && useHelper(meshRef, BoxHelper, "blue");
  }

  useFrame(() => {
    console.log("ms");
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
    }
  });

  return (
    // ** A Mesh is a basic scene object in three.js, and it's used to hold the geometry and the material needed to represent a shape in 3D space.
    <mesh ref={meshRef} scale={[0.5, 0.5, 0.5]}>
      {/* To create a cube, we need a BoxGeometry. This is an object that contains all the points (vertices) and fill (faces) of the cube */}
      {/* // Checkout out threejs geometries and use them in camel case */}
      <boxGeometry />
      {/* to add standard material added to the box added aboved */}
      <meshStandardMaterial />
    </mesh>
  );
};

export default AnimatedBox;
