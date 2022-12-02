import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import useInput from "../hooks/useInput";
import * as THREE from "three";

let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuanternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

const directionOffset = ({
  foward,
  backward,
  left,
  right,
}: {
  foward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}) => {
  if (foward) {
    if (left) {
      return Math.PI / 4;
    } else if (right) {
      return -Math.PI / 4;
    } else {
      return 0;
    }
  } else if (backward) {
    if (left) {
      return (Math.PI * 3) / 4;
    } else if (right) {
      return (-Math.PI * 3) / 4;
    } else {
      return Math.PI;
    }
  } else if (left) {
    return Math.PI / 2;
  } else if (right) {
    return -Math.PI / 2;
  }
  return 0;
};
const Player = () => {
  const model = useGLTF("./models/ninjacharacter.glb");
  const { foward, backward, left, right, jump, shift } = useInput();
  const { mixer, names, actions, clips } = useAnimations(
    model.animations,
    model.scene
  );
  // model.scene.scale.set(0.03, 0.03, 0.03);
  model.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  console.log("model:", model);
  const currentAction = useRef("");
  const controlRef = useRef<typeof OrbitControls>(null);
  const camera = useThree((state) => state.camera);

  const updateCamerTarget = (moveX: number, moveZ: number) => {
    // move camera
    camera.position.x = moveX;
    camera.position.z = moveZ;
    // update camera target
    cameraTarget.x = model.scene.position.x;
    cameraTarget.y = model.scene.position.y;
    cameraTarget.z = model.scene.position.z;
    if (controlRef.current) controlRef.current.target = cameraTarget;
  };
  useEffect(() => {
    let action = "";
    if (!shift &&(foward || backward || left || right)) {
      action = "walking";
    } else if (shift && (foward || backward || left || right)) {
      action = "Running";
    } else if (jump) {
      action = "jump";
    } else {
      action = "Idle";
    }
    if (currentAction.current !== action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
  }, [foward, backward, left, right, jump, shift]);
  useFrame((state, delta) => {
    if (
      currentAction.current == "walking" ||
      currentAction.current == "Running"
    ) {
      // calculate towards camera direction
      let angleYCameraDirection = Math.atan2(
        camera.position.x - model.scene.position.x,
        camera.position.z - model.scene.position.z
      );
      // diagonal movement angle offset
      const newDirectionOffset = directionOffset({
        foward,
        backward,
        left,
        right,
      });
      // rotate model
      rotateQuanternion.setFromAxisAngle(
        rotateAngle,
        angleYCameraDirection + newDirectionOffset
      );
      model.scene.quaternion.rotateTowards(rotateQuanternion, 0.2);
      // calculate walk direction
      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

      // run/walk velocity
      const velocity = currentAction.current == "Running" ? 5 : 2;
      // move model & camera
      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;
      model.scene.position.x += moveX;
      model.scene.position.z += moveZ;
      updateCamerTarget(moveX, moveZ);
    }
  });
  return (
    <>
      <OrbitControls ref={controlRef} />
      <primitive object={model.scene} />
    </>
  );
};

export default Player;
