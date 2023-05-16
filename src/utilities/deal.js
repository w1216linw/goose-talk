const dealPlayer = (numberOfPeople) => {
  const headGoose = Math.floor(numberOfPeople * Math.random());
  let badGoose = Math.floor(numberOfPeople * Math.random());

  while (headGoose === badGoose)
    badGoose = Math.floor(numberOfPeople * Math.random());

  return [headGoose, badGoose];
};

const dealCharacter = (characterSet) => {
  const len = characterSet.length;
  let i = Math.floor(len * Math.random());
  let j = Math.floor(len * Math.random());

  while (i === j) j = Math.floor(len * Math.random());

  return [characterSet[i], characterSet[j]];
};

const dealCharacterSet = (characters, setLength) => {
  const characterSet = [];
  const cIdx = new Set();

  while (cIdx.size < setLength) {
    cIdx.add(Math.floor(characters.length * Math.random()));
  }

  for (const idx of cIdx) {
    characterSet.push(characters[idx]);
  }

  return characterSet;
};

export { dealPlayer, dealCharacter, dealCharacterSet };
