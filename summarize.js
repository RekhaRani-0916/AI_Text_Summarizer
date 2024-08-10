const axios = require("axios");

// This function calls the Hugging Face API to summarize text
async function summarizeText(text) {
  let data = JSON.stringify({
    inputs: text,
    parameters: {
      max_length: 100,
      min_length: 30,
    },
  });

  let config = {
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
    return response.data[0].summary_text; // Adjust based on actual response structure
  } 
  catch (error) {
    console.error(error.response ? error.response.data : error.message);
    throw new Error('Error summarizing text');
  }
}

module.exports = summarizeText;
