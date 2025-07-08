import { useKeyboardControls } from "@react-three/drei";
import useGames from "./stores/useGames";
import { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";

const Interface = () => {
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.left);
  const rightward = useKeyboardControls((state) => state.right);
  const jump = useKeyboardControls((state) => state.jump);

  const restart = useGames((state) => state.restart);
  const phase = useGames((state) => state.phase);

  const time = useRef();

  useEffect(() => {
    const unsubscribeEffecct = addEffect(() => {
      const state = useGames.getState();

      let elapsedTime = 0;

      if (state.phase === "playing") {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        elapsedTime = state.endTime - state.startTime;
      }

      elapsedTime = (elapsedTime / 1000).toFixed(2);

      if (time.current) {
        time.current.textContent = elapsedTime;
      }
    });

    return () => {
      unsubscribeEffecct();
    };
  }, []);

  return (
    <div className="interface">
      <div className="time" ref={time}>
        0.00
      </div>
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : ""}`}></div>
          <div className={`key ${backward ? "active" : ""}`}></div>
          <div className={`key ${rightward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Interface;
