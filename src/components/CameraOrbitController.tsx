import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type Props = {};

// ** Orbit controls allow the camera to orbit around a target..
const CameraOrbitController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);

    // With normal components we don't need to dispose but here we need to
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

export default CameraOrbitController;
