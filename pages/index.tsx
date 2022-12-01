import { NextPage } from "next";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stats,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import Lights from "../components/Lights";
import Ground from "../components/Ground";
import Trees from "../components/Trees";
import { useEffect, useState } from "react";

const MyCube = () => {
  const model = useGLTF("./models/cube.glb");
  const { mixer, names, actions, clips } = useAnimations(
    model.animations,
    model.scene
  );
  console.log(model);
  useEffect(() => {
    // if (actions && actions?.Bounce) {
    // actions?.swipe.stop();
    // actions?.swipe.stop();
    // }
  }, [actions]);

  return (
    <object3D position={[0, 1, 0]}>
      {" "}
      <primitive object={model.scene} />
    </object3D>
  );
};

const Home: NextPage = () => {
  const [testMode, setTestMode] = useState(false);
  return (
    <div className="container">
      <Canvas shadows>
        <Stats />
        {testMode && <Stats />}
        {testMode && <axesHelper args={[2]} />}
        {testMode && <gridHelper args={[100, 100]} />}
        <OrbitControls />
        <Trees boundry={100} count={100} />
        <Lights />
        {/* <MyCube /> */}
        <Ground />
      </Canvas>
    </div>
  );
};
export default Home;
