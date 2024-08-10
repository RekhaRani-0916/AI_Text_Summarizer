require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const summarizeText = require('./summarize.js');

// Enables CORS for all origins
app.use(cors());

// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the root directory
app.use(express.static('.'));

// Handle POST requests to the '/summarize' endpoint
app.post('/summarize', (req, res) => {
  const text = req.body.text_to_summarize;

  summarizeText(text)
    .then(response => {
      res.json({ summary: response }); // Send the summary text as JSON
    })
    .catch(error => {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
