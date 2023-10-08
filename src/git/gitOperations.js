import { execSync } from "child_process";
import { config } from "../config/config.js";
import CLIOptions from "../cli.js";
export const getUserCommits = (startDate, endDate, repoPath, user) => {
  const sinceDate = startDate.toISOString();
  const untilDate = endDate.toISOString();

  const excludeFiles = CLIOptions.exclude
    ? CLIOptions.exclude.split(",")
    : config.excludeFiles;

  const args = {
    since: sinceDate,
    until: untilDate,
    author: user,
    pretty: "%h|%ci|%s",
  };
  const command = `git log ${Object.entries(args)
    .filter(([, value]) => value)
    .map(([key, value]) => `--${key}="${value}"`)
    .join(" ")}`;

  const commits = execSync(command, { cwd: repoPath })
    .toString()
    .split("\n")
    .filter((commit) => commit)
    .map((commit) => {
      const [hash, time, message] = commit.split("|");

      const gitShowCommand = `git show ${hash} -- . ${excludeFiles
        .map((file) => `':(exclude)${file}'`)
        .join(" ")} --pretty=""`;

      const diff = execSync(gitShowCommand, { cwd: repoPath }).toString();

      return { hash, message, time, diff };
    });

  return commits;
};
