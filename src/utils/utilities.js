export const debugLog = (message, ...optionalParams) => {
  const { debug } = require("../cli"); // Dynamic require to get the CLI options
  if (debug) {
    console.log(message, ...optionalParams);
  }
};

export const validateAPIResponseStructure = (response) => {
  try {
    response = JSON.parse(response);
  } catch (error) {
    throw new Error(`Response is not a valid JSON: ${response}`);
  }

  if (
    !response.taskCompletionTime ||
    !response.estimatedStartTime ||
    !response.description
  ) {
    throw new Error(`Invalid response structure: ${JSON.stringify(response)}`);
  }
  const taskCompletionTime = new Date(response.taskCompletionTime);
  const estimatedStartTime = new Date(response.estimatedStartTime);
  if (isNaN(taskCompletionTime) || isNaN(estimatedStartTime)) {
    throw new Error(
      `Invalid date format in response: ${JSON.stringify(response)}`,
    );
  }
  if (taskCompletionTime < estimatedStartTime) {
    throw new Error(
      `Task completion time is before estimated start time: ${JSON.stringify(
        response,
      )}`,
    );
  }
  if (!response.description) {
    throw new Error(
      `Description is empty in response: ${JSON.stringify(response)}`,
    );
  }
  return response;
};
