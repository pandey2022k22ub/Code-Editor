const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateComponent = async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }); // ✅ Correct model

    const result = await model.generateContent(prompt);  // ✅ Simplified usage
    const response = await result.response;
    const text = response.text();

    // Extract JSX and CSS from AI output (optional parsing)
    res.status(200).json({ jsx: text, css: "" });
  } catch (error) {
    console.error('Gemini Error:', error.message || error);
    res.status(500).json({ error: 'Failed to generate component', details: error.message });
  }
};

module.exports = { generateComponent };
