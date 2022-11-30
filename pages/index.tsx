import { NextPage } from "next";
import { Canvas, useThree } from "@react-three/fiber";
import AnimatedBox from "../components/AnimatedBox";
import CameraOrbitController from "../components/CameraOrbitController";
import { OrbitControls, Stats } from "@react-three/drei";
import { useTexture } from "@react-three/drei";

const TexturedSpheres = () => {
  const map = useTexture("./textures/metal_plate_diff_1k.png");
  const displacementMap = useTexture("./textures/metal_plate_disp_1k.png");
  const normalMap = useTexture("./textures/metal_plate_nor_gl_1k.png");
  const roughnessMap = useTexture("./textures/metal_plate_arm_1k.png");

  return (
    <>
      <mesh scale={[0.5, 0.5, 0.5]} position={[-1, 0, 0]}>
        <sphereGeometry />
        <meshStandardMaterial map={map} />
      </mesh>
      <mesh scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
        <sphereGeometry />
        <meshStandardMaterial
          map={map}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
        />
      </mesh>
      <mesh scale={[0.5, 0.5, 0.5]} position={[1, 0, 0]}>
        <sphereGeometry args={[1, 200, 200]} />
        <meshStandardMaterial
          map={map}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          displacementMap={displacementMap}
          displacementScale={0.05}
        />
      </mesh>
    </>
  );
};
const Home: NextPage = () => {
  const testing = true;
  return (
    <div className="container">
      <Canvas>
        <Stats />
        {testing && <Stats />}
        {testing && <axesHelper args={[2]} />}
        {testing && <gridHelper args={[10, 10]} />}
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <TexturedSpheres />
      </Canvas>
    </div>
  );
};
export default Home;
