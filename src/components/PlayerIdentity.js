import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";

// 0, normal goose
// 1, head goose
// 2, bad goose

const PlayerIdentity = ({ badGoose, headGoose, inGame }) => {
  const [identity, setIdentity] = useState(0);

  useEffect(() => {
    if (auth?.currentUser?.email === badGoose) setIdentity(2);
    else if (auth?.currentUser?.email === headGoose) setIdentity(1);
    else setIdentity(0);
  }, [badGoose, headGoose]);

  if (!inGame) return;

  return <div>{identity}</div>;
};

export default PlayerIdentity;
