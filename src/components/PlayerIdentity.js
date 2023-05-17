import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";

const PlayerIdentity = ({ badGoose, headGoose, inGame }) => {
  const [identity, setIdentity] = useState("白鹅");

  useEffect(() => {
    if (auth?.currentUser?.email === badGoose) setIdentity("恶鹅");
    else if (auth?.currentUser?.email === headGoose) setIdentity("头鹅");
    else setIdentity("白鹅");
  }, [badGoose, headGoose]);

  if (!inGame) return;

  return (
    <div className="flex justify-center my-5">
      <div className="bg-slate-800 text-xl p-8 rounded-full text-center text-slate-800 hover:text-white">
        {identity}
      </div>
    </div>
  );
};

export default PlayerIdentity;
