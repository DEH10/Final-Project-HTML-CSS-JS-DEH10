// Function to fetch news based on the topic
async function searchTopic(topic) {
    const apiKey = '7b921481edf0984cd4518d191e97bd356419a5977fe37dc9fef483664ff8554e'; // API key
    const apiUrl = 'https://serpapi.com/search.json';

    const options = {
        method: 'GET',
        url: apiUrl,
        params: {
            q: topic, // Use the topic as the search query
            location: "United States", 
            tbm: "nws",
            api_key: apiKey
        }
    };

    try {
        const response = await axios.request(options); // Assuming axios is included
        displayNews(response.data.news_results);
    } catch (error) {
        console.error(error);
    }
}

// Function to display news articles
function displayNews(news) {
    const entrepreneursNews = document.getElementById('entrepreneurs-news');
    const socialChangeNews = document.getElementById('social-change-news');
    const innovationNews = document.getElementById('innovation-news');

    // Populate placeholders with news data
    entrepreneursNews.innerHTML = createNewsHtml(news[0]);
    socialChangeNews.innerHTML = createNewsHtml(news[1]);
    innovationNews.innerHTML = createNewsHtml(news[2]);
}

// Function to create HTML for a news item
function createNewsHtml(news) {
    return `
        <a href="${news.link}" target="_blank"><h3>${news.title}</h3></a>
        <p>Date: ${news.published_date}</p>
    `;
}
