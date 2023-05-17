import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import BackIcon from "../assets/BackIcon";

const NewRoom = () => {
  const router = useRouter();
  const [roomNumber, setRoomNumber] = useState("");
  const [players, setPlayers] = useState("");

  const create = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "rooms", roomNumber), {
      players: Number(players),
      creator: auth.currentUser.email,
      currentPlayersCount: [auth.currentUser.email],
      headGoose: null,
      badGoose: null,
      inGame: false,
      isGuess: false,
    });
    router.push(`/room/${roomNumber}`);
  };
  return (
    <div className="p-2 h-screen grid">
      <Link href="/" className="h-5 w-5 m-5">
        <BackIcon />
      </Link>
      <form
        className="flex flex-col max-w-xs mx-auto w-[80vw]"
        onSubmit={create}
      >
        <label htmlFor="roomNumber">Room Number</label>
        <input
          className="rounded-lg "
          id="roomNumber"
          type="text"
          minLength={6}
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />
        <label htmlFor="numberOfPlayer">Number of Player</label>
        <input
          className="rounded-lg "
          id="numberOfPlayer"
          type="number"
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 bg-yellow-400 rounded-lg text-center uppercase mt-5 font-semibold"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewRoom;
