import { execSync } from "child_process";

export const getUserCommits = (startDate, endDate, repoPath, user) => {
  const sinceDate = startDate.toISOString();
  const untilDate = endDate.toISOString();

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
      const diff = execSync(
        `git show ${hash} -- . ':(exclude)package-lock.json' --pretty=""`,
        { cwd: repoPath },
      ).toString();
      return { hash, message, time, diff };
    });

  return commits;
};
