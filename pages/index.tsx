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
import { useEffect } from "react";

const MyCube = () => {
  const model = useGLTF("./models/cube.glb");
  const { mixer, names, actions, clips } = useAnimations(
    model.animations,
    model.scene
  );
  console.log(model);
  useEffect(() => {
    if (actions && actions?.Bounce) {
      actions?.swipe.play();
    }
  }, [actions]);

  return (
    <object3D position={[0, 1, 0]}>
      {" "}
      <primitive object={model.scene} />
    </object3D>
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
        <Trees boundry={10} count={5} />
        <Lights />
        <MyCube />
        <Ground />
      </Canvas>
    </div>
  );
};
export default Home;
