// This can be expanded upon with more configurations later
export const config = {
  // Default OpenAI endpoint, can be adjusted as needed
  apiEndpoint: "https://api.openai.com",

  // Files to exclude from commit analysis
  excludeFiles: [
    "package-lock.json",
    ".lock",
    ".DS_Store",
    "*.tmp",
    "*.swp",
    "*.bak",
  ],
};
