import fs from "fs";
import { getDateRange, getCommitsToMerge, getNextAction } from "./prompt.js";
import { processCommits } from "./processor.js";
import {
  displayInfo,
  displayError,
  displayCommits,
} from "./display/display.js";
import { getUserCommits } from "./git/gitOperations.js";
import CLIOptions from "./cli.js";
import { ACTIONS } from "./constants.js";

async function main() {
  try {
    const dateRange = await getDateRange();
    const commits = getUserCommits(
      dateRange.startDate,
      dateRange.endDate,
      CLIOptions.repo || ".",
      CLIOptions.user || null,
    );

    let groupedCommits = [];
    let remainingCommits = [...commits];
    let continueRunning = true;

    while (continueRunning) {
      const { nextAction } = await getNextAction();

      switch (nextAction) {
        case ACTIONS.GROUP:
          const { commitsToMerge } = await getCommitsToMerge(remainingCommits);
          const selectedCommits = remainingCommits.filter((commit) =>
            commitsToMerge.includes(`${commit.time} - ${commit.message}`),
          );

          if (selectedCommits.length > 0) {
            groupedCommits.push(selectedCommits);
            remainingCommits = remainingCommits.filter(
              (commit) =>
                !commitsToMerge.includes(`${commit.time} - ${commit.message}`),
            );
          }
          break;

        case ACTIONS.PREVIEW:
          displayInfo("Following is the list of commits/grouped commits:");
          displayCommits(groupedCommits, true);
          displayCommits(remainingCommits);
          displayInfo(
            `Total number of tasks (groups + individual): ${
              groupedCommits.length + remainingCommits.length
            }`,
          );
          break;

        case ACTIONS.PROCESS_AI:
          const tasks = await processCommits(groupedCommits, remainingCommits);

          if (CLIOptions.output) {
            fs.writeFileSync(
              CLIOptions.output,
              JSON.stringify(tasks, null, 2),
              "utf-8",
            );
            displayInfo(`Tasks saved to: ${CLIOptions.output}`);
          } else {
            displayInfo("Following is the list of tasks:");
            console.log(tasks);
          }

          // calculate total time
          const totalTime = tasks.reduce((total, task) => {
            const completionTime = new Date(task.taskCompletionTime);
            const estimatedStartTime = new Date(task.estimatedStartTime);
            const timeDiff = completionTime - estimatedStartTime;
            return total + timeDiff;
          }, 0);
          // display total time in human readable format HH:MM
          displayInfo(
            `Total time: ${Math.floor(totalTime / 3600000)}h ${Math.floor(
              (totalTime % 3600000) / 60000,
            )}m`,
          );
          continueRunning = false;
          break;

        case ACTIONS.RESET:
          groupedCommits.length = 0;
          remainingCommits = [...commits];
          break;

        case ACTIONS.EXIT:
          displayInfo("Exiting...");
          continueRunning = false;
          break;
      }
    }
  } catch (error) {
    displayError(`An error occurred: ${error.message}`);
  }
}

main();
