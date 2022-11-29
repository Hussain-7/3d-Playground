import { NextPage } from "next";
import { Canvas } from "@react-three/fiber";

const Home: NextPage = () => {
  return (
    
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>{" "}
    </Canvas>
  );
};
export default Home;
