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
