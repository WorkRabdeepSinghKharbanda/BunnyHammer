import { useGameData } from "../../../lib/hooks/useGameData";
import style from "./style.module.scss";
const GameSetup = () => {
  const { startGame, setStartGame } = useGameData();
  return (
    <>
      {!startGame && (
        <div className={style["game-setup"]}>
          <h1>Bunny Hammer Game</h1>
          <button className="btn btn-primary" onClick={setStartGame}>
            Start Game
          </button>
        </div>
      )}
    </>
  );
};
export default GameSetup;
