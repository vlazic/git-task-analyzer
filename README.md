# git-task-analyzer

## Overview

The `git-task-analyzer` is a Command-Line Interface (CLI) tool designed to analyze git repositories within a specified time frame. It extracts commit information, processes these commits using AI, and creates detailed, human-readable task descriptions suitable for project management or client invoicing.

## Features

- Interactive commit grouping
- Extraction of git commits within a specified date range
- Analysis of commits using OpenAI
- Generation of detailed task descriptions
- Computation of estimated time for task completion

## Installation

To get started with `git-task-analyzer`, you need to have Node.js and npm installed on your system. Once you have them:

1. Clone the repository:

   ```bash
   git clone https://github.com/vlazic/git-task-analyzer.git
   cd git-task-analyzer
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Link the CLI for global usage:
   ```bash
   npm link
   ```

## Usage

To run the `git-task-analyzer`:

```bash
git-task-analyzer [options]
```

### Options

- `-u, --user <user>`: Specify the user for commit analysis. If not provided, commits from all authors will be considered.

- `-r, --repo <path>`: Specify the repository path. If not provided, the tool will analyze the repository in the current directory.

- `-s, --sort <order>`: Sort results in ascending (`asc`) or descending (`desc`) order. By default, results are sorted in ascending order.

- `-o, --output <file>`: Specify the file where tasks should be saved. If this option is not provided, tasks will be displayed on the screen.

- `-e, --exclude <files>`: Exclude specified files from the analysis. Provide a comma-separated list of files or patterns, e.g. `'package-lock.json,yarn.lock'`. By default, typical lock files and other common noise files like `.DS_Store`, `*.log`, etc., are excluded.

- `--debug`: Display debug logs.

### Sample Usage

- Analyze commits from user "john.doe" in the repository located at `./my-project`, and sort the results in descending order:

  ```bash
  git-task-analyzer --user john.doe --repo ./my-project --sort desc
  ```

- Analyze commits in the repository located at `./my-project`, save the results to `tasks.json`, and exclude `yarn.lock` and `package-lock.json`:

  ```bash
  git-task-analyzer -r ./my-project -o tasks.json --exclude yarn.lock,package-lock.json
  ```

- Analyze commits from the repository in the current directory and exclude `*.log` files:
  ```bash
  git-task-analyzer --exclude *.log
  ```

### Workflow

1. Specify the start and end dates for the analysis.
2. Group commits interactively or process individual ones.
3. Review the groups and commits before sending them to AI for analysis.
4. Obtain a detailed task list after AI processing.
5. Review total time estimates for all tasks.

## Dependencies

The project uses various libraries including:

- `chalk`: For colorful console logs.
- `commander`: To handle CLI input.
- `inquirer` and `inquirer-date-prompt`: For interactive prompts.
- `openai`: For OpenAI API interactions.

## Author

Vladimir Lazić - [contact@vlazic.com](mailto:contact@vlazic.com) | [https://vlazic.com/](https://vlazic.com/)

## License

This project is licensed under the MIT License.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
