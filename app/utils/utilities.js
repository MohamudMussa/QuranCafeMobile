export const getRandomRecitation = (recitations = []) =>
  recitations[Math.floor(Math.random() * recitations.length)];

export const ordinal = number => {
  switch (number) {
    case 1:
    case 21:
      return number + 'st';
    case 2:
    case 22:
      return number + 'nd';
    case 3:
    case 23:
      return number + 'rd';
    default:
      return number + 'th';
  }
};

export const shuffle = function (array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
