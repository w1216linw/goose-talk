import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const Logout = () => {
  const logOut = async () => {
    await signOut(auth);
  };
  return <button onClick={logOut}>Log out</button>;
};

export default Logout;
