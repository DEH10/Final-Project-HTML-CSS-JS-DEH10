document.addEventListener('DOMContentLoaded', function() {
    const newsApiKey = 'pub_42358702e8cccca6301597e64e67b7797eeb4'; // Your NewsAPI key

    // Function to handle click events on news items
    document.querySelectorAll('.news-item').forEach(item => {
        item.addEventListener('click', () => {
            const topic = item.id.replace('-news', ''); // Extract topic from the news item ID
            searchTopic(topic, newsApiKey); // Pass the apiKey and topic here
        });
    });

    // Show loading spinner
    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'block';
    } else {
        console.error('loading-spinner element not found');
    }

    async function searchTopic(topic, apiKey) {
        // Show loading spinner
        if (loadingSpinner) {
            loadingSpinner.style.display = 'block';
        }

        const apiUrl = `https://newsdata.io/api/1/news?q=${encodeURIComponent(topic)}&apiKey=${newsApiKey}`;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache',
                'Authorization': newsApiKey // Either of these headers can be used for authentication
            }
        };

        try {
            const response = await fetch(apiUrl, requestOptions);
            const responseData = await response.json();
            console.log(responseData); // Log Response Data
            if (!responseData || !responseData.articles) {
                throw new Error('Response data or articles not found');
            }
            displayNewsOnPage(responseData.articles);
        } catch (error) {
            // Display error message
            const errorMessage = document.getElementById('error-message');
            if (errorMessage) {
                errorMessage.innerText = 'Error fetching news: ' + error.message;
            } else {
                console.error('error-message element not found');
            }
        } finally {
            // Hide loading spinner
            if (loadingSpinner) {
                loadingSpinner.style.display = 'none';
            }
        }
    }

    // Function to display news articles on the webpage
    function displayNewsOnPage(news) {
        const newsContent = news.map(createNewsHtml).join('<hr>'); // Join news articles with a horizontal line
        const newsContainer = document.getElementById('news-container'); // Get the container element
        if (newsContainer) {
            newsContainer.innerHTML = newsContent; // Set the news content in the container
        } else {
            console.error('news-container element not found');
        }
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

   // Dynamically load tawk.to script
    function loadTawkToScript() {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = 'https://embed.tawk.to/662295a91ec1082f04e4b2df/1hrrhh7q6';
        s.charset = 'UTF-8';
        s.setAttribute('crossorigin', '*');
        document.body.appendChild(s);
    }

    // Call the function to load tawk.to script
    loadTawkToScript();

});
