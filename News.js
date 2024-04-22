// Show loading spinner
const loadingSpinner = document.getElementById('loading-spinner');
if (loadingSpinner) {
    loadingSpinner.style.display = 'block';
} else {
    console.error('loading-spinner element not found');
}

// Define searchTopic function
async function searchTopic(topic, newsApiKey) {
    // Show loading spinner
    if (loadingSpinner) {
        loadingSpinner.style.display = 'block';
    }

    const apiUrl = `https://api.worldnewsapi.com/search-news?q=${encodeURIComponent(topic)}&apiKey=${newsApiKey}`;
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
