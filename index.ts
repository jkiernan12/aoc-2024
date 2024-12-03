import one from './solutions/1';
import two from './solutions/2';
import three from './solutions/3';
import readline from 'node:readline';
import prompts from 'prompts';
import dotenv from 'dotenv';

dotenv.config()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solutions = [one, two, three];

const init = async () => {
  const response = await prompts({
    type: 'number',
    name: 'value',
    message: 'Which day are you solving?',
    validate: value => (value < 1 || value > 25) ? `Choose a number between 1 and 25` : true
  });
  console.log(await solutions[Number(response.value) - 1]());
}

init();