import { NextPage } from "next";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import Lights from "../components/Lights";
import Ground from "../components/Ground";
import Trees from "../components/Trees";

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
        <Trees />
        <Lights />
        <Ground />
      </Canvas>
    </div>
  );
};
export default Home;
