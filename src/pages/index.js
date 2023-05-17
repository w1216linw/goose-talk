import SearchRoom from "@/components/SearchRoom";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [player, setPlayer] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setPlayer(true);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="centerBox">
      <p>{player && auth?.currentUser?.email}</p>
      <SearchRoom />
      <Link
        href="/newroom"
        className="p-2 bg-yellow-400 rounded-lg text-center uppercase"
      >
        Create a room
      </Link>
    </main>
  );
}
