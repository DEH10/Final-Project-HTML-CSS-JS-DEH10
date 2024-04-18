const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
fetch.use(cors());

// Set X-Content-Type-Options header
app.use(helmet({
  contentSecurityPolicy: false,
  referrerPolicy: { policy: 'no-referrer' }
}));

// Define a route to handle the news search
app.get('/search', async (req, res) => {
    const topic = req.query.topic;
    const apiKey = '7b921481edf0984cd4518d191e97bd356419a5977fe37dc9fef483664ff8554e';
    const apiUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(topic)}&tbm=nws&api_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }
        const data = await response.json();

        // Set Cache-Control header to prevent using the Expires header
        res.setHeader('Cache-Control', 'no-cache'); // Example cache-control header

        if (data.news_results && data.news_results.length > 0) {
            res.json(data.news_results);
        } else {
            res.status(404).json({ message: 'No news articles found' });
        }
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
