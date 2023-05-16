import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
// 0, normal goose
// 1, head goose
// 2, bad goose
const PlayerIdentity = ({ badGoose, headGoose }) => {
  const [identity, setIdentity] = useState(0);
  useEffect(() => {
    if (auth?.currentUser?.email === badGoose) setIdentity(2);
    else if (auth?.currentUser?.email === headGoose) setIdentity(1);
  }, []);

  return <div>{identity}</div>;
};

export default PlayerIdentity;
