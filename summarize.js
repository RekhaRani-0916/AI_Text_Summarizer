const axios = require("axios");

// This function calls the Hugging Face API to summarize text
async function summarizeText(text) {
  const data = JSON.stringify({
    inputs: text,
    parameters: {
      max_length: 100,
      min_length: 30,
    },
  });

  const config = {
    method: "post",
    url: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log(response.data); // Log the response to inspect the structure
    // Adjust the following line based on the actual response structure
    return response.data[0].summary_text; // Example adjustment, confirm with actual API response
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    throw new Error('Error summarizing text');
  }
}

module.exports = summarizeText;
