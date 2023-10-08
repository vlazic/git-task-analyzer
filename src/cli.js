import { Command } from "commander";

const program = new Command();

program
  .option(
    "-u, --user <user>",
    "Specify user for commit analysis. If not provided, commits from all authors are considered.",
  )

  .option(
    "-r, --repo <path>",
    "Specify repository path. Defaults to the current directory.",
  )
  .option(
    "-s, --sort <order>",
    "Sort results in ascending or descending order (asc/desc). Default is asc.",
  )
  .option(
    "-o, --output <file>",
    "Specify output file to save tasks. If not provided, results are displayed on screen.",
  )
  .option(
    "-e, --exclude <files>",
    "Specify files to exclude separated by commas, e.g. 'package-lock.json,yarn.lock'",
  )
  .option("--debug", "Display debug logs")
  .usage("[options] <command> [...]")
  .on("--help", () => {
    console.log("");
    console.log("Examples:");
    console.log(
      "  $ git-task-analyzer --user john.doe --repo ./my-project --sort desc",
    );
    console.log(
      "  $ git-task-analyzer -u john.doe -r ./my-project -o tasks.json",
    );
    console.log(
      "  $ git-task-analyzer -r ./my-project --exclude yarn.lock,package-lock.json",
    );
  })
  .parse(process.argv);

const CLIOptions = program.opts();

export default CLIOptions;
