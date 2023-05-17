import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";

const MAX_CHARACTER = 2;

const Characters = ({ isGuess, headGoose, characterSet, guess }) => {
  const [selects, setSelects] = useState([]);
  const [finishSelect, setFinishSelect] = useState(false);

  const select = (idx) => {
    if (!finishSelect) {
      const updateSelects = [...selects, idx];
      setSelects(updateSelects);
      if (updateSelects.length === MAX_CHARACTER) setFinishSelect(true);
    }
  };

  useEffect(() => {
    if (!isGuess) {
      setSelects([]);
      setFinishSelect(false);
    }
  }, [isGuess]);

  let body;
  if (headGoose !== auth?.currentUser?.email && !isGuess) return;
  else if (isGuess) {
    body = (
      <div className="grid grid-cols-3 place-items-center gap-5">
        {characterSet?.length > 1 &&
          characterSet.map((char, idx) => (
            <div
              onClick={() => select(idx)}
              className={`p-5 w-28 text-center text-white ${
                selects.includes(idx) ? "bg-slate-500" : "bg-slate-800"
              }`}
              key={char}
            >
              {char}
            </div>
          ))}
      </div>
    );
  } else if (headGoose === auth?.currentUser?.email) {
    body = (
      <>
        <div className="grid grid-cols-3 place-items-center gap-5">
          {characterSet?.length > 1 &&
            characterSet.map((char, idx) => (
              <div
                onClick={() => select(idx)}
                className={`p-5 w-28 text-center  ${
                  selects.includes(idx)
                    ? "bg-slate-500 text-slate-500 hover:text-white"
                    : "bg-slate-800 text-slate-800"
                }`}
                key={char}
              >
                {char}
              </div>
            ))}
        </div>
        <button
          onClick={guess}
          className=" mt-5 py-1 px-4 bg-yellow-400 rounded-lg text-center uppercase font-semibold text-sm"
        >
          Guess
        </button>
      </>
    );
  }
  return <div className="text-center">{body}</div>;
};

export default Characters;
