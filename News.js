// Function to display news articles in a new window
function displayNewsInNewWindow(news) {
    const newsContent = news.map(createNewsHtml).join('<hr>'); // Join news articles with a horizontal line
    const newWindow = window.open('', '_blank'); // Open a new window
    newWindow.document.body.innerHTML = newsContent; // Set the news content in the new window
}

// Function to fetch news based on the topic
async function searchTopic(topic) {
    const apiKey = '7b921481edf0984cd4518d191e97bd356419a5977fe37dc9fef483664ff8554e'; // API key
    const apiUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(topic)}&tbm=nws&api_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        if (data.news_results && data.news_results.length > 0) {
            displayNewsInNewWindow(data.news_results);
        } else {
            console.log('Not enough news articles found.');
        }
    } catch (error) {
        console.error('Error fetching news:', error.message);
    }
}

// Function to create HTML for a news item
function createNewsHtml(news) {
    return `
        <a href="${news.link}" target="_blank"><h3>${news.title}</h3></a>
        <p>Date: ${news.published_date}</p>
    `;
}

// Frontend JavaScript
document.getElementById('search-button').addEventListener('click', async function() {
    const topic = document.getElementById('search-input').value.trim();
    if (topic !== '') {
        try {
            const response = await fetch(`/search?topic=${encodeURIComponent(topic)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }
            const data = await response.json();
            if (data.news_results && data.news_results.length > 0) {
                displayNewsInNewWindow(data.news_results);
            } else {
                console.log('Not enough news articles found.');
            }
        } catch (error) {
            console.error('Error fetching news:', error.message);
        }
    } else {
        console.log('Please enter a valid topic.');
    }
});
