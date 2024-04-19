const apiKey = '5c836577668c041bc597e3ee36ba5a11';

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

    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(topic)}&apiKey=${apiKey}`;
    const requestOptions = {
        method: 'GET',
        url: corsAnywhereUrl + apiUrl,
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const response = await axios.request(requestOptions);
        console.log(response.data); // Log Response Data
        if (!response.data || !response.data.articles) {
            throw new Error('Response data or articles not found');
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
            <img src="${news.image}" alt="${news.title}" onclick="openTopicPage('${news.url}')">
            <a href="${news.url}" target="_blank"><h3>${news.title}</h3></a>
            <p>Date: ${news.publishedAt}</p>
        </div>
    `;
}

// Function to open the topic page in a new tab
function openTopicPage(url) {
    window.open(url, '_blank');
}
