// Function to handle click events on news items
document.querySelectorAll('.news-item').forEach(item => {
    item.addEventListener('click', () => {
        const topic = item.id.replace('-news', ''); // Extract topic from the news item ID
        searchTopic(topic);
    });
});

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
            displayNewsOnPage(data.news_results);
        } else {
            console.log('Not enough news articles found.');
        }
    } catch (error) {
        console.error('Error fetching news:', error.message);
    }
}

// Function to display news articles on the webpage
function displayNewsOnPage(news) {
    const newsContent = news.map(createNewsHtml).join('<hr>'); // Join news articles with a horizontal line
    const newsContainer = document.getElementById('news-container'); // Get the container element
    newsContainer.innerHTML = newsContent; // Set the news content in the container
}

// Function to create HTML for a news item
function createNewsHtml(news) {
    return `
        <div class="news-item">
            <a href="${news.link}" target="_blank"><h3>${news.title}</h3></a>
            <p>Date: ${news.published_date}</p>
        </div>
    `;
}

// Call the searchTopic function with the desired topic
document.getElementById('search-button').addEventListener('click', async function() {
    const topic = document.getElementById('search-input').value.trim();
    if (topic !== '') {
        try {
            await searchTopic(topic);
        } catch (error) {
            console.error('Error fetching news:', error.message);
        }
    } else {
        console.log('Please enter a valid topic.');
    }
});
