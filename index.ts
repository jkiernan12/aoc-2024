import one from './solutions/1';
import readline from 'node:readline';
import dotenv from 'dotenv';

dotenv.config()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solutions = [one];

rl.question(`Which day are you solving? `, async (day: string) => {
  try {
    console.log(await solutions[Number(day) - 1]());
  } catch {
    console.log("Santa didn't like that input :(");
  }
  rl.close();
});