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
import Player from "../components/Player";

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
        <Player />
        <Ground />
      </Canvas>
    </div>
  );
};
export default Home;
