import PlayerIdentity from "@/components/PlayerIdentity";
import { auth, db } from "@/lib/firebase";
import { dealPlayer } from "@/utilities/deal";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Room = () => {
  const router = useRouter();
  const { id } = router.query;
  const roomRef = doc(db, "rooms", id);
  const [room, setRoom] = useState();
  const start = async () => {
    const [headGooseIdx, badGooseIdx] = dealPlayer(
      room.currentPlayersCount.length
    );
    await updateDoc(roomRef, {
      headGoose: room.currentPlayersCount[headGooseIdx],
      badGoose: room.currentPlayersCount[badGooseIdx],
      inGame: true,
    });
  };

  const exit = async () => {
    const newPlayersArr = room.currentPlayersCount.filter(
      (player) => player !== auth.currentUser.email
    );
    await updateDoc(roomRef, {
      currentPlayersCount: newPlayersArr,
    });
    router.push("/");
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(roomRef, (snapshot) => {
      setRoom(snapshot.data());
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
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
  }, []);

  //   console.log(room?.currentPlayersCount);
  return (
    <div className="h-screen">
      <button onClick={exit}>Back</button>
      <h1>Room #{id}</h1>
      <p>
        {room?.players} - {room?.currentPlayersCount?.length}
      </p>
      {room?.creator === auth?.currentUser?.email && (
        <button onClick={start}>Start</button>
      )}
      {room?.currentPlayersCount?.length > 0 &&
        room.currentPlayersCount.map((elem) => <div>{elem}</div>)}
      {room?.inGame && (
        <PlayerIdentity badGoose={room?.badGoose} headGoose={room?.headGoose} />
      )}
    </div>
  );
};

export default Room;
