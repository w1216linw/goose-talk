import SearchRoom from "@/components/SearchRoom";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="centerBox">
      <p>{auth?.currentUser?.email}</p>
      <SearchRoom />
      <Link href="/newroom">Create a room</Link>
    </main>
  );
}
