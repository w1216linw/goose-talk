const dealPlayer = (numberOfPeople) => {
  const headGoose = Math.floor(numberOfPeople * Math.random());
  let badGoose = Math.floor(numberOfPeople * Math.random());

  while (headGoose === badGoose)
    badGoose = Math.floor(numberOfPeople * Math.random());

  return [headGoose, badGoose];
};

const dealCharacter = (characters) => {
  const len = characters.length;
  let i = Math.floor(len * Math.random());
  let j = Math.floor(len * Math.random());

  while (i === j) j = Math.floor(len * Math.random());

  return [characters[i], characters[j]];
};

export { dealPlayer, dealCharacter };
