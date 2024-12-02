import { generateAnswers, getInput } from "../utils";

const solution = async () => {
  return generateAnswers(await solution1(), await solution2())
}
const solution1 = async () => {
  const input: string = await getInput(1);
  const pairs = input.split('\n');
  const left: number[] = [];
  const right: number[] = [];
  for (const pair of pairs) {
    left.push(Number(pair.split('   ')[0]));
    right.push(Number(pair.split('   ')[1]));
  };
  left.sort();
  right.sort();

  return left.reduce((acc, curr, index) => {
    return acc += Math.abs(curr - right[index]);
  }, 0);
}

const solution2 = async () => {
  const input: string = await getInput(1);
  const pairs = input.split('\n');
  const left: number[] = [];
  const right: number[] = [];
  for (const pair of pairs) {
    left.push(Number(pair.split('   ')[0]));
    right.push(Number(pair.split('   ')[1]));
  };

  return left.reduce((acc, curr, index) => {
    const occurences = right.filter(num => num === curr).length;
    return acc += (curr * occurences);
  }, 0);
}
export default solution;