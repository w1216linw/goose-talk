import BackIcon from "@/assets/BackIcon";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

const New = () => {
  const router = useRouter();
  const emailRef = useRef();
  const passRef = useRef();

  const createNewUser = async () => {
    if (
      !emailRef.current.value ||
      !passRef.current.value ||
      passRef.current.value.length < 6
    )
      return;
    await createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passRef.current.value
    );
    router.push("/");
  };
  return (
    <div className="p-2 h-screen grid">
      <Link href="/" className="h-5 w-5 m-5">
        <BackIcon />
      </Link>
      <div className="flex flex-col max-w-xs mx-auto w-[80vw]">
        <label htmlFor="email">Email</label>
        <input type="text" id="email" ref={emailRef} />
        <label htmlFor="password">Password</label>
        <input type="text" id="password" ref={passRef} />
        <button
          onClick={createNewUser}
          className=" py-2 px-4 mt-5 bg-yellow-400 rounded-lg text-center uppercase font-semibold text-sm"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default New;
