const options = {
    method: 'GET',
    url: 'https://newsapi90.p.rapidapi.com/search',
    params: {
        query: 'topic',
        language: 'en-US',
        region: 'US'
    },
    timeout: 10000, // Example: 10 seconds timeout
    headers: {
        'X-RapidAPI-Key': '4e0363d5cbmsh3d792017c35585bp19139djsn93a837129c00',
        'X-RapidAPI-Host': 'newsapi90.p.rapidapi.com'
    }
};

// Function to fetch news articles based on the search query
async function fetchNews(topic) {
    const apiKey = '4e0363d5cbmsh3d792017c35585bp19139djsn93a837129c00'; // Replace with your actual API key
    const apiUrl = 'https://newsapi90.p.rapidapi.com/search';

    const options = {
        method: 'GET',
        url: apiUrl,
        params: {
            query: topic,
            language: 'en-US',
            region: 'US'
        },
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'newsapi90.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options); // Axios is used directly here
        return response.data.articles;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Function to display news articles for a specific topic
async function displayNews(topic, containerId) {
    const articles = await fetchNews(topic);
    const container = document.getElementById(containerId);

    if (articles.length === 0) {
        container.innerHTML = '<p>No articles found</p>';
        return;
    }

    container.innerHTML = ''; // Clear existing content

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-article');
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <p>Date: ${article.publishedAt}</p>
        `;
        container.appendChild(articleElement);
    });
}

// Display news articles for each topic
displayNews('Entrepreneurs', 'entrepreneurs-news');
displayNews('Social Change', 'social-change-news');
displayNews('Innovation', 'innovation-news');
