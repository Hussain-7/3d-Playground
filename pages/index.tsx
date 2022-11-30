import { NextPage } from "next";
import { Canvas, useThree } from "@react-three/fiber";
import AnimatedBox from "../components/AnimatedBox";
import CameraOrbitController from "../components/CameraOrbitController";
import { OrbitControls, Stats, TransformControls } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import Lights from "../components/Lights";
import Ground from "../components/Ground";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";

const Tree = () => {
  const gltf = useLoader(GLTFLoader, "/models/tree_scaled_down.glb");
  console.log(gltf);
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

const TexturedSpheres = () => {
  const map = useTexture("./textures/metal_plate_diff_1k.png");
  const normalMap = useTexture("./textures/metal_plate_nor_gl_1k.png");
  const roughnessMap = useTexture("./textures/metal_plate_arm_1k.png");
  // const displacementMap = useTexture("./textures/metal_plate_disp_1k.png");

  return (
    <>
      <mesh scale={[0.5, 0.5, 0.5]} position={[0, 1, 0]} castShadow>
        <sphereGeometry
        // args={[1, 200, 200]}
        />
        <meshStandardMaterial
          map={map}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          // displacementMap={displacementMap}
          // displacementScale={0.05}
        />
      </mesh>
    </>
  );
};


const Home: NextPage = () => {
  const testing = true;
  return (
    <div className="container">
      <Canvas shadows>
        <Stats />
        {testing && <Stats />}
        {testing && <axesHelper args={[2]} />}
        {testing && <gridHelper args={[10, 10]} />}
        <OrbitControls />
        {/* <TexturedSpheres /> */}
        <Tree />
        <Lights />
        <Ground />
      </Canvas>
    </div>
  );
};
export default Home;
