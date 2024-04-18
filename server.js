const express = require('express');
const fetch = require('node-fetch');
const cors = require('no-cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Define a route to handle proxy requests to SerpApi
app.get('/proxy', async (req, res) => {
    const { q, tbm, api_key } = req.query;
    const apiUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(q)}&tbm=${encodeURIComponent(tbm)}&api_key=${encodeURIComponent(api_key)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data from SerpApi');
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error proxying request to SerpApi:', error);
        res.status(500).json({ error: 'Failed to proxy request to SerpApi' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
