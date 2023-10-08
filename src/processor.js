import { getMergedDescription } from "./api/apiOperations.js";
import { validateAPIResponseStructure } from "./utils/utilities.js";
import CLIOptions from "./cli.js";

export const processCommits = async (groupedCommits, remainingCommits) => {
  let results = [];

  // Process grouped commits
  for (const commitGroup of groupedCommits) {
    const description = await getMergedDescription(commitGroup);
    const task = validateAPIResponseStructure(description);
    results.push(task);
  }

  // Process individual commits
  for (const commit of remainingCommits) {
    const description = await getMergedDescription([commit]); // Sending individual commits as a single-item group
    const task = validateAPIResponseStructure(description);
    results.push(task);
  }

  // Sort results
  results.sort((a, b) =>
    CLIOptions.sort === "desc"
      ? new Date(b.taskCompletionTime) - new Date(a.taskCompletionTime)
      : new Date(a.taskCompletionTime) - new Date(b.taskCompletionTime),
  );

  // Adjust overlaps (Ensure a task doesn't start before the previous one completes)
  for (let i = 1; i < results.length; i++) {
    const prevCompletionTime = new Date(results[i - 1].taskCompletionTime);
    const currentEstimatedStart = new Date(results[i].estimatedStartTime);
    if (prevCompletionTime > currentEstimatedStart) {
      results[i].estimatedStartTime = prevCompletionTime.toISOString();
    }
  }

  return results;
};
