import { useGameData } from "../../../lib/hooks/useGameData";
import { getRandomArbitrary } from "../../../lib/helpers";
import style from "./style.module.scss";
import { useEffect, useState } from "react";

const GameContainer = () => {
  const {
    startGame,
    hitScore,
    missedScore,
    setHitScore,
    setMissedScore,
    setResetGame,
  } = useGameData();
  const [gameStartTimer, setGameStartTimer] = useState(3);
  const [totalHits, setTotalHits] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [bunnyPlace, setBunnyPlace] = useState(0);

  useEffect(() => {
    if (gameStartTimer !== 0) {
      let timer = 3;
      const intervalTimer = setInterval(() => {
        setGameStartTimer(timer);
        timer = timer - 1;
      }, 1000);

      setTimeout(() => {
        clearInterval(intervalTimer);
      }, 4000);
    }
  }, []);

  useEffect(() => {
    if (startGame && gameStartTimer == 0) {
      setGameStartTimer(3);
      let timer = 3;
      const intervalTimer = setInterval(() => {
        setGameStartTimer(timer);
        timer = timer - 1;
      }, 1000);

      setTimeout(() => {
        clearInterval(intervalTimer);
      }, 4000);
    }
  }, [startGame]);

  const randomHolePlace = () => {
    let ranVal = Math.floor(getRandomArbitrary(1, 9));
    while (ranVal == bunnyPlace) {
      ranVal = Math.floor(getRandomArbitrary(1, 9));
    }
    return ranVal;
  };

  useEffect(() => {
    if (gameStartTimer === 0) {
      let currentTimeLeft = 30;
      const timeLeftInterval = setInterval(() => {
        const randomValue = randomHolePlace();

        setBunnyPlace(randomValue);

        setTimeLeft(currentTimeLeft);
        currentTimeLeft -= 1;
      }, 1000);

      setTimeout(() => {
        setBunnyPlace(0);
        clearInterval(timeLeftInterval);
      }, 31000);
    }
  }, [gameStartTimer]);

  const handleHammerClick = (passedHammerClick: number) => {
    setTotalHits((prev) => prev + 1);
    if (passedHammerClick == bunnyPlace) {
      setHitScore();
    } else {
      setMissedScore();
    }
  };

  const handleResetClick = () => {
    setTotalHits(0);
    setResetGame();
  };

  return (
    <>
      {startGame && (
        <section
          className={`${style["game-container"]}`}
          style={{ cursor: 'url("./public/hammer.png"), auto' }}
        >
          <div
            className={`d-flex flex-column justify-content-center align-items-center`}
          >
            <h1>Bunny Hammer Game</h1>
            {gameStartTimer !== 0 && (
              <h2>Game Start in {gameStartTimer} seconds</h2>
            )}

            {gameStartTimer === 0 && (
              <>
                <button className={style['reset-btn']} onClick={handleResetClick}>Reset Game</button>
                {timeLeft !== 0 && (
                  <>
                    <p className={style.stats}>Hits: {hitScore}</p>
                    <p className={style.stats}>Missed: {missedScore}</p>
                    <p className={style.stats}>Total : {totalHits}</p>
                    <p className={style.stats}>Timer: {timeLeft}</p>
                    <div
                      className={`${style["grass-layers"]} w-100 mt-5 gap-5`}
                    >
                      {Array.from({ length: 9 }).map((_, key) => (
                        <button
                          className={`btn btn-transparent`}
                          style={{cursor: 'url("/hammer.png"),auto'}}
                          onClick={() => handleHammerClick(key + 1)}
                        >
                          <img
                            className={style.grass}
                            src="/grass.png"
                            width={125}
                            height={80}
                          />
                          <img
                            className={`${style.bunny} ${
                              bunnyPlace == key + 1 && style.active
                            }`}
                            src="/bunny.png"
                            width={125}
                            height={80}
                          />
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {timeLeft == 0 && (
                  <>
                    <p className={`${style.stats} fw-bold`}>Results</p>
                    <p className={style.stats}>Hits: {hitScore}</p>
                    <p className={style.stats}>Missed: {missedScore}</p>
                    <p className={style.stats}>Total : {totalHits}</p>
                    <p className={style.stats}>Timer: {timeLeft}</p>
                  </>
                )}
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default GameContainer;
