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

import { useEffect, useRef, useState } from "react";
import { Object3D } from "three";
import useInput from "../hooks/useInput";

const MyPlayer = () => {
  const model = useGLTF("./models/Fox.glb");
  const { foward, backward, left, right, jump, shift } = useInput();
  const { mixer, names, actions, clips } = useAnimations(
    model.animations,
    model.scene
  );

  console.log("model:", model);
  const currentAction = useRef("");
  useEffect(() => {
    let action = "";
    if (foward || backward || left || right) {
      action = "Walk";
    } else if (shift) {
      action = "Survey";
    } else {
      action = "none";
    }
    if (currentAction.current !== action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
  }, [foward, backward, left, right, jump, shift]);

  return (
    <object3D scale={[0.03, 0.03, 0.03]}>
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
