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

Got it! I've made the modifications based on your clarifications. Here's the revised `TODO` section for your `README.md`:

## TODO

As we continue to develop and enhance `git-task-analyzer`, here are some planned features and improvements:

1. **Implement Local LLM Models**: Integrate local LLM models via [LocalAi](https://localai.io/basics/getting_started/).

2. **Stream AI Responses**: Once local LLM implementation is complete, consider a feature to display streaming responses from the AI, especially if there's a delay in getting the results.

3. **Parallelize OpenAI Calls**: Speed up the processing by making concurrent calls to OpenAI.

4. **Token Count Warning**: For OpenAI calls, count the number of tokens in the request and issue a warning if it exceeds 16,000 tokens.

5. **Dynamic OpenAI Model Selection**:

   - Allow users to specify the OpenAI model via a CLI flag.
   - Implement logic to choose the OpenAI model dynamically based on the number of tokens in the request.

6. **Data Export**: Implement CSV/TSV export functionality with options to customize column names and their order.

7. **Packaging as an NPM Library and CLI**:

   - Package the tool for NPM to be used both as a CLI and as a library for those who want to integrate it into their applications.

8. **CLI Flags for System Prompts**:

   - `--prompt`: Allow users to specify a custom system prompt that is sent to the AI.
   - `--show-prompt`: Display the current system prompt to the user.

9. **Commit Exclusion**: Allow users to exclude specific commits or tasks from the list.

10. **Date Input via Flags**: Add flags to directly input the start and end dates for analysis, bypassing the prompts.

11. **Loading Indicators**: Display spinners or other visual indicators during API calls to signal ongoing processing.

12. **Utilize OpenAI "Functions"**: Incorporate the use of "functions" in OpenAI calls to ensure we receive the desired structured response.

## Author

Vladimir Lazić - [contact@vlazic.com](mailto:contact@vlazic.com) | [https://vlazic.com/](https://vlazic.com/)

## License

This project is licensed under the MIT License.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
