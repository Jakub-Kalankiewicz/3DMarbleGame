import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";
import { Level } from "./Level.js";
import { Physics } from "@react-three/rapier";
import Player from "./Player.js";
import useGames from "./stores/useGames.js";

export default function Experience() {
  const blocksCount = useGames((state) => state.blocksCount);
  const blocksSeed = useGames((state) => state.blockSeed);
  return (
    <>
      <color args={["#bdedfc"]} attach="background" />

      <Physics debug={false}>
        <Lights />

        <Level count={blocksCount} blockSeed={blocksSeed} />
        <Player />
      </Physics>
    </>
  );
}
