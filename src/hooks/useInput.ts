import React, { useEffect, useState } from "react";

const useInput = () => {
  const [input, setInput] = useState({
    foward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
    jump: false,
  });

  const keys: {
    [key: string]: string;
  } = {
    KeyW: "foward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    ShiftLeft: "shift",
    Space: "jump",
  };
  const findKey = (key: string) => keys[key];
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setInput((m) => ({ ...m, [findKey(e.code)]: true }));
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      setInput((m) => ({ ...m, [findKey(e.code)]: false }));
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return [input, setInput];
};

export default useInput;
