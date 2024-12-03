import { generateAnswers, getInput } from "../utils";

const solution = async () => {
  return generateAnswers(await solution1(), await solution2());
}

const solution1 = async (customInput?: string) => {
  // enabling input so we can solve solution2
  const input: string = customInput ? customInput : await getInput(3);
  return input.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g).reduce((acc, curr) => {
    const [num1, num2] = curr.replace('mul(', '').replace(')', '').split(',');
    return acc += (Number(num1) * Number(num2));
  }, 0);
}

const solution2 = async () => {
  const input: string = await getInput(3);
  
  const all = input.split("don't");
  const joined = all.map((mul, index) => {
    // first string must be good as it doesn't have a preceding don't()
    if (index === 0) {
      return mul;
    }
    const valid = mul.split("do()");
    // we know first string appeared after don't(), so remove
    valid.shift();
    // any other strings in array appeared after do();
    // they are all good, so let's join them back together
    return valid.join('');
  }).join('') // now that all the invalid strings are removed, create a large string of the valid

  return solution1(joined);
}

export default solution;

