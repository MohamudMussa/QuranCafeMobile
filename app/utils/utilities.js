export const getRandomRecitation = (recitations = []) =>
  recitations[Math.floor(Math.random() * recitations.length)];
