// Function to fetch news from Google API
async function fetchNews() {
    const apiKey = '7b921481edf0984cd4518d191e97bd356419a5977fe37dc9fef483664ff8554e'; // Your Google API key
    const apiUrl = 'https://serpapi.com/search.json?q=Any+keyword&tbm=nws&kgmid=/m/02vqfm';

    const options = {
        method: 'GET',
        url: apiUrl,
        params: {
            engine: 'google_news',
            story_token: 'CAAqNggKIjBDQklTSGpvSmMzUnZjbmt0TXpZd1NoRUtEd2pqdU9UWENSRXNnR1puWWJtdzZ5Z0FQAQ',
            api_key: apiKey
        }
    };

    try {
        const response = await axios.request(options); // Assuming axios is included
        return response.data.news_results;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Function to display news articles
async function displayNews() {
    const news = await fetchNews();

    // Get news item placeholders
    const entrepreneursNews = document.getElementById('entrepreneurs-news');
    const socialChangeNews = document.getElementById('social-change-news');
    const innovationNews = document.getElementById('innovation-news');

    // Populate placeholders with news data
    news.forEach((newsItem, index) => {
        const container = index === 0 ? entrepreneursNews : index === 1 ? socialChangeNews : innovationNews;
        container.innerHTML = createNewsHtml(newsItem);
    });
}

// Function to create HTML for a news item
function createNewsHtml(news) {
    return `
        <a href="${news.link}" target="_blank"><h3>${news.title}</h3></a>
        <p>Date: ${news.published_date}</p>
    `;
}

// Display news articles
displayNews();
