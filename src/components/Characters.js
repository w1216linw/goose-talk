import { auth } from "@/lib/firebase";

const Characters = ({ isGuess, headGoose, characterSet }) => {
  if (headGoose !== auth.currentUser.email && !isGuess) return;
  console.log(characterSet);
  return (
    <div>
      {characterSet?.length > 1 &&
        characterSet.map((char) => <div key={char}>{char}</div>)}
    </div>
  );
};

export default Characters;
