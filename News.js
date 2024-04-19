const apiKey = '438b027b63ab4742b887ee49d659be18';
const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

// Function to handle click events on news items
document.querySelectorAll('.news-item').forEach(item => {
    item.addEventListener('click', () => {
        const topic = item.id.replace('news', ''); // Extract topic from the news item ID
        searchTopic(topic, apiKey); // Pass the apiKey here
    });
});

async function searchTopic(topic, apiKey) {
    // Show loading spinner
    document.getElementById('loading-spinner').style.display = 'block';

    const apiUrl = `${corsProxyUrl}`;

    const requestOptions = {
        method: 'GET',
        url: apiUrl,
        headers: {
            'content-type': 'application/json'
        },
        params: {
            url: `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&apiKey=${apiKey}`
        }
    };

    try {
        const response = await axios.request(requestOptions);
        if (!response.data) {
            throw new Error('Failed to fetch news');
        }
        displayNewsOnPage(response.data.articles);
    } catch (error) {
        // Display error message
        document.getElementById('error-message').innerText = 'Error fetching news: ' + error.message;
    } finally {
        // Hide loading spinner
        document.getElementById('loading-spinner').style.display = 'none';
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
    // Create HTML for the news item with an onclick event handler
    return `
        <div class="news-item">
            <img src="${news.urlToImage}" alt="${news.title}" onclick="openTopicPage('${news.url}')">
            <a href="${news.url}" target="_blank"><h3>${news.title}</h3></a>
            <p>Date: ${news.publishedAt}</p>
        </div>
    `;
}

// Function to open the topic page in a new tab
function openTopicPage(url) {
    window.open(url, '_blank');
}
