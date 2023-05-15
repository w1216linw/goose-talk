import { auth, db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (!isAuth) return;
    (async () => {
      const docs = await getDocs(collection(db, "room"));
      const data = docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(data);
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
      } else {
        router.push("./login");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <p>{auth?.currentUser?.email}</p>
    </main>
  );
}
