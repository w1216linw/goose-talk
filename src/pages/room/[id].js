import BackIcon from "@/assets/BackIcon";
import Characters from "@/components/Characters";
import PlayerIdentity from "@/components/PlayerIdentity";
import theme from "@/lib/data";
import { auth, db } from "@/lib/firebase";
import { dealCharacterSet, dealPlayer } from "@/utilities/deal";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Room = () => {
  const router = useRouter();
  const { id } = router.query;
  const [roomRef, setRoomRef] = useState();
  const [room, setRoom] = useState();

  const start = async () => {
    const [headGooseIdx, badGooseIdx] = dealPlayer(
      room?.currentPlayersCount.length
    );
    await updateDoc(roomRef, {
      headGoose: room?.currentPlayersCount[headGooseIdx],
      badGoose: room?.currentPlayersCount[badGooseIdx],
      inGame: true,
      isGuess: false,
      characterSet: dealCharacterSet(
        theme.characters,
        room?.currentPlayersCount.length + 2
      ),
    });
  };

  const guess = async () => {
    await updateDoc(roomRef, {
      isGuess: true,
    });
  };

  const exit = async () => {
    const newPlayersArr = room?.currentPlayersCount.filter(
      (player) => player !== auth.currentUser.email
    );
    await updateDoc(roomRef, {
      currentPlayersCount: newPlayersArr,
      inGame: false,
      isGuess: false,
    });
    router.push("/");
  };

  useEffect(() => {
    if (id) {
      setRoomRef(doc(db, "rooms", id));
    }
  }, [id]);

  useEffect(() => {
    if (!roomRef) return;
    const unsubscribe = onSnapshot(roomRef, (snapshot) => {
      setRoom(snapshot.data());
    });

    return () => unsubscribe();
  }, [roomRef]);

  useEffect(() => {
    if (!roomRef) return;
    (async () => {
      const tempDoc = await getDoc(roomRef);
      const newPlayersArr = new Set([
        ...tempDoc.data().currentPlayersCount,
        auth.currentUser.email,
      ]);
      await updateDoc(roomRef, {
        currentPlayersCount: Array.from(newPlayersArr),
      });
    })();
  }, [roomRef]);

  return (
    <div className="h-screen p-5 max-w-2xl m-auto">
      <button onClick={exit} className="w-5 h-5 mb-5">
        <BackIcon />
      </button>
      <div className="flex items-center justify-between">
        <div className="grid text-center">
          <h1 className="font-semibold text-lg">
            Room # <span className="text-cyan-600 tracking-widest">{id}</span>
          </h1>
          <p>
            {room?.players} - {room?.currentPlayersCount?.length}
          </p>
        </div>
        {room?.creator === auth?.currentUser?.email && (
          <button
            className="py-2 px-4 bg-emerald-400 rounded-lg font-semibold"
            onClick={start}
          >
            Start
          </button>
        )}
      </div>

      <PlayerIdentity
        badGoose={room?.badGoose}
        headGoose={room?.headGoose}
        inGame={room?.inGame}
      />

      <Characters
        headGoose={room?.headGoose}
        isGuess={room?.isGuess}
        guess={guess}
        characterSet={room?.characterSet}
      />
    </div>
  );
};

export default Room;
