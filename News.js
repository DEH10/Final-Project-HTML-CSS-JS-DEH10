// Define the AJAX prefilter to append the CORS proxy URL
jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

const apiKey = '5c836577668c041bc597e3ee36ba5a11';

// Function to handle click events on news items
$('.news-item').click(function() {
    const topic = this.id.replace('news', ''); // Extract topic from the news item ID
    searchTopic(topic, apiKey); // Pass the apiKey here
});

async function searchTopic(topic, apiKey) {
    // Show loading spinner
    $('#loading-spinner').show();

    const apiUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(topic)}&apiKey=${apiKey}`;

    try {
        const response = await $.ajax({
            url: apiUrl,
            method: 'GET',
            dataType: 'json'
        });

        console.log(response); // Log Response Data

        if (!response || !response.articles) {
            throw new Error('Response data or articles not found');
        }

        displayNewsOnPage(response.articles);
    } catch (error) {
        // Display error message
        $('#error-message').text('Error fetching news: ' + error.message);
    } finally {
        // Hide loading spinner
        $('#loading-spinner').hide();
    }
}

// Function to display news articles on the webpage
function displayNewsOnPage(news) {
    const newsContent = news.map(createNewsHtml).join('<hr>'); // Join news articles with a horizontal line
    $('#news-container').html(newsContent); // Set the news content in the container
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
