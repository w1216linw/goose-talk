import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";

const SearchRoom = () => {
  const router = useRouter();
  const [roomNumber, setRoomNumber] = useState("");

  const join = async () => {
    if (!roomNumber || roomNumber.length < 6) return;
    const docRef = doc(db, "rooms", roomNumber);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("no such room");
    } else {
      router.push(`/room/${roomNumber}`);
    }
  };

  return (
    <div className="flex rounded-lg overflow-hidden">
      <input
        className="px-2"
        type="text"
        onChange={(e) => setRoomNumber(e.target.value)}
        value={roomNumber}
      />
      <button className="bg-green-400 p-2" onClick={join}>
        JOIN
      </button>
    </div>
  );
};

export default SearchRoom;
