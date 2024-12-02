import { curly } from "node-libcurl";

export const getInput = async (day: number) => {
  const { data, statusCode } = await curly.get(`https://adventofcode.com/2024/day/${day}/input`, {
    cookie: `session=${process.env.SESSION}`,
  });
  if (statusCode >= 200 && statusCode < 300) {
    // annoying whitespaces...
    return data.trim();
  }
  console.warn('Failed to fetch input: ', statusCode);
}

export const generateAnswers = (one: any, two: any) => {
  return `Solution 1: ${one} \nSolution 2: ${two}`;
}