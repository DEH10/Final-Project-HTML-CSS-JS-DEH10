// Function to fetch news based on the topic
async function searchTopic(topic) {
    const apiKey = '7b921481edf0984cd4518d191e97bd356419a5977fe37dc9fef483664ff8554e'; // API key
    const apiUrl = `https://serpapi.com/search.json?q=${topic}&tbm=nws&api_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, { mode: 'no-cors' }); // Set mode to 'no-cors'
        if (response.ok) {
            const data = await response.text(); // Since we cannot access response body in 'no-cors' mode, use text() instead of json()
            console.log(data); // Do something with the fetched data
            // Open a new window and display the fetched data
            const newWindow = window.open('', '_blank');
            newWindow.document.write(data);
        } else {
            console.error('Failed to fetch data:', response.status);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display news articles
function displayNews(news) {
    const entrepreneursNews = document.getElementById('entrepreneurs-news');
    const socialChangeNews = document.getElementById('social-change-news');
    const innovationNews = document.getElementById('innovation-news');

    // Populate placeholders with news data
    if (news.length >= 3) {
        entrepreneursNews.innerHTML = createNewsHtml(news[0]);
        socialChangeNews.innerHTML = createNewsHtml(news[1]);
        innovationNews.innerHTML = createNewsHtml(news[2]);
    }
}

// Function to create HTML for a news item
function createNewsHtml(news) {
    return `
        <a href="${news.link}" target="_blank"><h3>${news.title}</h3></a>
        <p>Date: ${news.published_date}</p>
    `;
}

// Call the searchTopic function with the desired topic
document.getElementById('search-button').addEventListener('click', function() {
    const topic = document.getElementById('search-input').value;
    if (topic.trim() !== '') {
        searchTopic(topic);
    } else {
        console.log('Please enter a valid topic.');
    }
});
