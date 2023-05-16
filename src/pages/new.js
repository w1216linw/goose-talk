import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
    <div className="centerBox">
      <input type="text" ref={emailRef} />
      <input type="text" ref={passRef} />
      <button onClick={createNewUser}>Submit</button>
    </div>
  );
};

export default New;
