import inquirer from "inquirer";
import DatePrompt from "inquirer-date-prompt";
import { ACTIONS } from "./constants.js";

// Register inquirer date prompt
inquirer.registerPrompt("date", DatePrompt);

export const getDateRange = async () => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );

  return await inquirer.prompt([
    {
      type: "date",
      name: "startDate",
      message: "Start date of analysis:",
      default: firstDayOfMonth,
      // default: new Date(2023, 9, 5, 19, 0, 0), // This can be updated to the desired default value
    },
    {
      type: "date",
      name: "endDate",
      message: "End date of analysis:",
    },
  ]);
};

export const getCommitsToMerge = async (remainingCommits) => {
  return await inquirer.prompt([
    {
      type: "checkbox",
      name: "commitsToMerge",
      message: "Select commits to group:",
      choices: remainingCommits.map(
        (commit) => `${commit.time} - ${commit.message}`,
      ),
      pageSize: 30,
    },
  ]);
};

export const getNextAction = async () => {
  console.log();
  return await inquirer.prompt([
    {
      type: "list",
      name: "nextAction",
      message: "What would you like to do next?",
      choices: Object.values(ACTIONS),
    },
  ]);
};
