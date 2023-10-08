import chalk from "chalk";

export const displayCommits = (commits, isGrouped = false) => {
  if (isGrouped) {
    console.log(chalk.blue("Grouped Commits:"));
    for (const [index, commitGroup] of commits.entries()) {
      console.log(chalk.green(`- Group ${index + 1}`));
      for (const commit of commitGroup) {
        console.log(chalk.green(`  ${commit.time} - ${commit.message}`));
      }
    }
  } else {
    console.log(chalk.blue("Individual Commits:"));
    for (const commit of commits) {
      console.log(chalk.green(`- ${commit.time} - ${commit.message}`));
    }
  }
  console.log();
};

export const displayError = (message) => {
  console.log(chalk.red(message));
};

export const displayInfo = (message) => {
  console.log(chalk.yellow(message));
};
