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
   git clone https://github.com/your-github-username/git-task-analyzer.git
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
git-task-analyzer -u <user> -r <repo-path> [--sort <order>] [--debug]
```

### Options:

- `-u, --user <user>`: Specify the user for commit analysis. If not provided, the current user will be used.
- `-r, --repo <path>`: Specify the repository path. Defaults to the current directory.
- `--sort <order>`: Sort results in ascending or descending order (`asc`/`desc`). The default is ascending.
- `--debug`: Display debug logs.

### Workflow:

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
