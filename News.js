document.addEventListener('DOMContentLoaded', function() {
    const newsApiKey = 'pub_42358702e8cccca6301597e64e67b7797eeb4'; // Your NewsAPI key

    const newsContainer = document.getElementById('news-container');
    const loadingSpinner = document.getElementById('loading-spinner');

    // Show loading spinner
    loadingSpinner.style.display = 'block';

    // Fetch news data from the API
    fetch(`https://newsdata.io/api/1/news?apiKey=${newsApiKey}`)
        .then(response => response.json())
        .then(data => {
            // Hide loading spinner
            loadingSpinner.style.display = 'none';

            // Display news articles
            if (data && data.length > 0) {
                data.forEach(article => {
                    const articleElement = document.createElement('div');
                    articleElement.classList.add('article');
                    articleElement.innerHTML = `
                        <h2>${article.title}</h2>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">Read more</a>
                    `;
                    newsContainer.appendChild(articleElement);
                });
            } else {
                newsContainer.innerHTML = '<p>No news articles found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            // Hide loading spinner and display error message
            loadingSpinner.style.display = 'none';
            newsContainer.innerHTML = '<p>Error fetching news. Please try again later.</p>';
        });
});
