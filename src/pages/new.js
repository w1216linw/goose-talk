import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";

const New = () => {
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
  };
  return (
    <div className="h-screen grid place-content-center gap-2">
      <input type="text" ref={emailRef} />
      <input type="text" ref={passRef} />
      <button onClick={createNewUser}>Submit</button>
    </div>
  );
};

export default New;
