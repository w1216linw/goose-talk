import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const NewRoom = () => {
  const router = useRouter();
  const [roomNumber, setRoomNumber] = useState();
  const [players, setPlayers] = useState();

  const create = async (e) => {
    e.preventDefault();
    console.log("create");
    await setDoc(doc(db, "rooms", roomNumber), {
      players: Number(players),
      creator: auth.currentUser.email,
      currentPlayersCount: [auth.currentUser.email],
      headGoose: null,
      badGoose: null,
    });
    router.push(`/room/${roomNumber}`);
  };
  return (
    <div>
      <Link href="/">Back</Link>
      <form className="centerBox" onSubmit={create}>
        <label htmlFor="roomNumber">Room Number</label>
        <input
          className="p-2"
          id="roomNumber"
          type="text"
          minLength={6}
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />
        <label htmlFor="numberOfPlayer">Number of Player</label>
        <input
          className="p-2"
          id="numberOfPlayer"
          type="number"
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewRoom;