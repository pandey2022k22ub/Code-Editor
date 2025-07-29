// utils/geminiClient.js
const getGenAIClient = async () => {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI;
};

module.exports = getGenAIClient;
