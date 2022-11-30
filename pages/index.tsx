import { NextPage } from "next";
import { Canvas, useThree } from "@react-three/fiber";
import AnimatedBox from "../components/AnimatedBox";
import CameraOrbitController from "../components/CameraOrbitController";
import { OrbitControls, Stats } from "@react-three/drei";
const Home: NextPage = () => {
  const testing = true;
  return (
    <div className="container">
      <Canvas
      // camera={{
      //   fov: 75,
      //   near: 2,
      //   far: 10,
      // }}
      >
        <Stats />
        {testing && <Stats />}
        {testing && <axesHelper args={[2]} />}
        {testing && <gridHelper args={[10, 10]} />}
        <OrbitControls />
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <mesh>
          {/* Checkout out threejs geometries and use them in camel case */}
          <coneGeometry />
          <meshStandardMaterial color={"blue"} wireframe />
        </mesh>
        {/* <AnimatedBox isTesting={testing} /> */}
      </Canvas>
    </div>
  );
};
export default Home;
