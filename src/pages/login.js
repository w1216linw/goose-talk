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

  console.log(auth?.currentUser?.email);
  return (
    <div className="centerBox">
      <input type="text" ref={emailRef} />
      <input type="text" ref={passRef} />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <Link href="/new">Create Account</Link>
    </div>
  );
};

export default Login;
