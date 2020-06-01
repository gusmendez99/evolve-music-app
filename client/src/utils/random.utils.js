export default function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}