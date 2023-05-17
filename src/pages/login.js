import GoogleIcon from "@/assets/GoogleIcon";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { auth, googleProvider } from "../lib/firebase";

const Login = () => {
  const router = useRouter();
  const emailRef = useRef();
  const passRef = useRef();

  const signIn = async () => {
    try {
      if (!emailRef.current.value || !passRef.current.value) return;
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passRef.current.value
      );
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="centerBox">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" ref={emailRef} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" ref={passRef} />
      <div className="flex justify-between">
        <Link
          href="/new"
          className="underline underline-offset-2 text-slate-400"
        >
          New User?
        </Link>
        <button
          onClick={signIn}
          className=" py-1 px-4 bg-yellow-400 rounded-lg text-center uppercase font-semibold text-sm"
        >
          Log In
        </button>
      </div>

      <button
        className="mt-5 flex items-center gap-2 bg-white py-4 px-5 rounded-lg hover:bg-gray-300"
        onClick={signInWithGoogle}
      >
        <span className="font-semibold">Sign in with</span>
        <div className="w-20">
          <GoogleIcon />
        </div>
      </button>
    </div>
  );
};

export default Login;
