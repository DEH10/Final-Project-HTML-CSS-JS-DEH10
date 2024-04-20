document.addEventListener('DOMContentLoaded', function() {
    const newsApiKey = '7b921481edf0984cd4518d191e97bd356419a5977fe37dc9fef483664ff8554e'; // Your NewsAPI key

    // Function to handle click events on news items
    document.querySelectorAll('.news-item').forEach(item => {
        item.addEventListener('click', () => {
            const topic = item.id.replace('-news', ''); // Extract topic from the news item ID
            searchTopic(topic, newsApiKey); // Pass the apiKey and topic here
        }, { passive: true }); // Add { passive: true } here
    });

    // Show loading spinner
    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'block';
    } else {
        console.error('loading-spinner element not found');
    }

    async function searchTopic(topic, newsApiKey) {
    // Show loading spinner
    if (loadingSpinner) {
        loadingSpinner.style.display = 'block';
    }

    //const apiUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(topic)}&apiKey=${newsApiKey}`;
    const apiUrl = `https://api.serpapi.com/v1/search?q=${encodeURIComponent(topic)}&apiKey=${newsApiKey}`;
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
        
        // Log image URLs for each news article
        responseData.results.forEach(newsItem => {
            console.log('Image URL:', newsItem.urlToImage);
            // Optionally, you can open each URL in a new tab for manual inspection
            // window.open(newsItem.urlToImage, '_blank');
        });

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
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) {
        console.error('news-container element not found');
        return;
    }

    // Clear the existing content of the news container
    newsContainer.innerHTML = '';

    // Iterate over each news article and create HTML elements to display them
    responseData.results.forEach(newsItem => {
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
