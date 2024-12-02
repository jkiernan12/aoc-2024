import { generateAnswers, getInput } from "../utils";

const solution = async () => {
  return generateAnswers(await solution1(), await solution2());
}

type ReducedReport = {
  isIncreasing: boolean | null;
  isSafe: boolean;
}

const solution1 = async () => {
  const input: string = await getInput(2);
  const reports = input.split('\n');
  let safeReportCount = 0;
  for (const report of reports) {
    const levels = report.split(' ').map(level => Number(level));
    const isSafe = levels.reduce((acc, curr, index) => {
      // skip first level or escape if already determined unsafe
      if (index === 0 || !acc.isSafe) {
        return acc;
      }

      // if we haven't determined increasing/decreasing, do so
      if (acc.isIncreasing === null) {
        acc.isIncreasing = (curr > levels[index - 1]);
      }

      const difference = curr - (levels[index - 1]);
      if (acc.isIncreasing) {
        acc.isSafe = difference > 0 && difference < 4;
      } else {
        acc.isSafe = difference < 0 && difference > -4;
      }
      return acc;

    }, <ReducedReport>{ isIncreasing: null, isSafe: true }).isSafe;
    if (isSafe) {
      safeReportCount++
    }
  }
  return safeReportCount;
}

const solution2 = async () => {
  const input: string = await getInput(2);
  const reports = input.split('\n');
  let safeReportCount = 0;

  const validateReportSafety = (levels: number[]) => {
    return levels.reduce((acc, curr, index) => {
      // skip first level or escape if already determined unsafe
      if (index === 0 || !acc.isSafe) {
        return acc;
      }

      // if we haven't determined increasing/decreasing, do so
      if (acc.isIncreasing === null) {
        acc.isIncreasing = (curr > levels[index - 1]);
      }

      const difference = curr - (levels[index - 1]);
      if (acc.isIncreasing) {
        acc.isSafe = difference > 0 && difference < 4;
      } else {
        acc.isSafe = difference < 0 && difference > -4;
      }
      return acc;

    }, <ReducedReport>{ isIncreasing: null, isSafe: true }).isSafe;
  }

  for (const report of reports) {
    const levels = report.split(' ').map(level => Number(level));
    const isInitialSafe = validateReportSafety(levels);
    if (isInitialSafe) {
      safeReportCount++;
    } else {
      if (levels.some((level, index) => {
        const updatedLevels = [...levels];
        updatedLevels.splice(index, 1);
        const isSafe = validateReportSafety(updatedLevels);
        return isSafe;
      })) {
        safeReportCount++;
      }
    }
  }
  return safeReportCount;
}

export default solution;