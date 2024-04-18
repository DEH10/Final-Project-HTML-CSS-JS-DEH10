// Function to handle click events on news items
document.querySelectorAll('.news-item').forEach(item => {
    item.addEventListener('click', () => {
        const topic = item.id.replace('news', ''); // Extract topic from the news item ID
        searchTopic(topic);
    });
});

// Function to fetch news based on the topic
async function searchTopic(topic) {
    const apiUrl = `https://serpapi.com/search.json?engine=google_news&story_token=CAAqNggKIjBDQklTSGpvSmMzUnZjbmt0TXpZd1NoRUtEd2pqdU9UWENSRXNnR1puWWJtdzZ5Z0FQAQ`; // Modified URL

    try {
        const response = await fetch(apiUrl,{
            headers: {
                'Accept': 'application/json'
            }
        });
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
    // Define the topic specific URL for each news item
    const urls = {
        'entrepreneurs-news': 'https://serpapi.com/searches/abd24f5db832edf2/66208f81216a9d4cda434c1a.html',
        'social-change-news': 'https://serpapi.com/searches/773f9f8ed645cad0/662093757690dc4cf2778126.html',
        'innovation-news': 'https://serpapi.com/searches/f0cfef5e24dd7084/66200bfb681ebef8e6a6ddfa.html'
    };

    // Get the ID of the news item
    const itemId = news.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    // Create HTML for the news item with an onclick event handler
    return `
        <div class="news-item" id="${itemId}">
            <img src="https://example.com/${itemId}.png" alt="${news.title}" onclick="openTopicPage('${urls[itemId]}')">
            <a href="${news.link}" target="_blank"><h3>${news.title}</h3></a>
            <p>Date: ${news.published_date}</p>
        </div>
    `;
}

// Function to open the topic page in a new tab
function openTopicPage(url) {
    window.open(url, '_blank');
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
