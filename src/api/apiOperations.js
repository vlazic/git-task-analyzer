import OpenAI from "openai";

const api = new OpenAI({
  // For the time being, we use OpenAI server. Configurations can be adjusted later.
  // baseURL: "http://localhost:8080",
});

export const sendToAPI = async (messages) => {
  try {
    const response = await api.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo-16k",
    });
    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getMergedDescription = async (commitGroup) => {
  const systemMessage = {
    role: "system",
    content: `Analyze the provided code changes in following messages and create a JSON structure with the estimated start time (assume very slow junior developer, consider length of diff, minimum is one hour), task completion time, and a brief but detailed description of the work done. The description should be in 2-3 sentences, aimed for a project manager to read. The JSON format is:
{
"taskCompletionTime": DateTime(YYYY-MM-DD HH:MM:SS +/-ZZZZ),
"estimatedStartTime": DateTime(YYYY-MM-DD HH:MM:SS +/-ZZZZ),
"description": String
}
Please ensure the description is meaningful and doesn't just repeat the commit message. If necessary, provide a multiline list detailing the work. Provide single response even if multiple commits are sent, because they are all part of the same task.`,
  };
  const userMessages = commitGroup.map((commit) => ({
    role: "user",
    content: `Time: ${commit.time}, Message: ${commit.message}, Diff: ${commit.diff}`,
  }));
  const messages = [systemMessage, ...userMessages];

  try {
    const response = await sendToAPI(messages);
    return response.choices[0]?.message?.content;
  } catch (error) {
    console.error("API Call Error:", error);
    throw error;
  }
};
