import { Command } from "commander";

const program = new Command();

program
  .option("-u, --user <user>", "Specify user for commit analysis")
  .option("-r, --repo <path>", "Specify repository path")
  .option(
    "--sort <order>",
    "Sort results in ascending or descending order (asc/desc). Default is asc.",
  )
  .option("--debug", "Display debug logs")
  .parse(process.argv);

const CLIOptions = program.opts();

export default CLIOptions;
