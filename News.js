// Define searchTopic function
async function searchTopic(topic, newsApiKey) {
    // Show loading spinner
    if (loadingSpinner) {
        loadingSpinner.style.display = 'block';
    }

	//const apiUrl = `https://api.worldnewsapi.com/search-news?q=${encodeURIComponent(topic)}&country=us&apiKey=${newsApiKey}`; //By Country
    const apiUrl = `https://api.worldnewsapi.com/search-news?q=${encodeURIComponent(topic)}&language=en&apiKey=${newsApiKey}`; //By language
    const requestOptions = {
        method: 'GET',
        headers: {
            'x-api-key': newsApiKey
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

// Show loading spinner
const loadingSpinner = document.getElementById('loading-spinner');
if (loadingSpinner) {
    loadingSpinner.style.display = 'block';
} else {
    console.error('loading-spinner element not found');
}

document.addEventListener('DOMContentLoaded', async function() {
    const newsApiKey = 'a92ea4464a8d4a98916fab91f6bad992'; // Your NewsAPI key

    // Function to handle click events on news items
    document.querySelectorAll('.news-item').forEach(item => {
        item.addEventListener('click', () => {
            const topic = item.id.replace('-news', ''); // Extract topic from the news item ID
            searchTopic(topic, newsApiKey); // Pass the apiKey and topic here
        }, { passive: true }); // Add { passive: true } here
    });

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

// Function to display news articles on the webpage
function displayNewsOnPage(news) {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) {
        console.error('news-container element not found');
        return;
    }

    // Clear the existing content of the news container
    newsContainer.innerHTML = '';

    // Iterate over each news article and create HTML elements to display them
    news.forEach(newsItem => {
        // Create a container for each news article
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('news-item');

        // Create image element
        const image = document.createElement('img');
        image.src = newsItem.urlToImage;
        image.alt = newsItem.title;

        // Create title element
        const title = document.createElement('h3');
        title.textContent = newsItem.title;

        // Create date element
        const date = document.createElement('p');
        date.textContent = `Date: ${newsItem.publishedAt}`;

        // Create link element
        const link = document.createElement('a');
        link.href = newsItem.url;
        link.target = '_blank';
        link.textContent = 'Read more';

        // Append image, title, date, and link to the news item div
        newsDiv.appendChild(image);
        newsDiv.appendChild(title);
        newsDiv.appendChild(date);
        newsDiv.appendChild(link);

        // Append the news item div to the news container
        newsContainer.appendChild(newsDiv);
    });
   // Redirect to the news.html page after displaying the articles
    window.location.href = 'news.html';
}
