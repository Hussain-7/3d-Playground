import { NextPage } from "next";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Stats,
  useAnimations,
  useGLTF,
  useFBX,
} from "@react-three/drei";
import Lights from "../components/Lights";
import Ground from "../components/Ground";
import Trees from "../components/Trees";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

import { useEffect, useState } from "react";
import { Object3D } from "three";

const MyPlayer = () => {
  const model = useGLTF("./models/Fox.glb");
  const { mixer, names, actions, clips } = useAnimations(
    model.animations,
    model.scene
  );

  console.log("model:", model);
  useEffect(() => {
    // if (actions && actions?.Idle) {
      // console.log("actions:", actions.Idle);
      // actions?.Survey?.play();
      // actions?.swipe.stop();
    // }
  }, [actions]);

  return (
    <object3D scale={[
      0.01,
      0.01,
      0.01
    ]}>
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
        <MyPlayer />
        <Ground />
      </Canvas>
    </div>
  );
};
export default Home;
