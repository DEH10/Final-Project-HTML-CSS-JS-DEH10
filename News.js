document.addEventListener('DOMContentLoaded', async function() {
    const username = "username";
    const password = "password";
    const appID = "ba04fd57";
    const newsApiKey = "4b6cab42f25b12b28a0b076c2008b080"; // Add your NewsAPI key here

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

    // Function to fetch token from Aylien API
    async function getToken() {
        try {
            const response = await fetch("https://api.aylien.com/v1/oauth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": 'Basic ' + btoa(`${username}:${password}`),
                }
            });
            const data = await response.json();
            if (!data.access_token) {
                throw new Error("Access token not found in response");
            }
            return data.access_token;
        } catch (error) {
            console.error('Error fetching token:', error);
            throw error;
        }
    }

    // Fetch token
    let token;
    try {
        token = await getToken();
    } catch (error) {
        console.error('Error getting token:', error);
        // Hide loading spinner
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
        return; // Stop further execution if token retrieval fails
    }

    // Fetch news articles using token
    const headers = {
        "Authorization": `Bearer ${token}`,
        "App-ID": appID,
    };

    const url = 'https://api.aylien.com/v6/news/stories?aql=topic:({{id:in.infomed}}) AND language:(en) AND categories:({{taxonomy:aylien AND id:ay.lifesoc}} OR {{taxonomy:aylien AND id:ay.biz}} OR {{taxonomy:aylien AND id:ay.gen}}) AND entities:({{id:Q5380740 AND overall_prominence:>=0.65}} OR {{id:Q24915087 AND overall_prominence:>=0.65}} OR {{id:Q794803 AND overall_prominence:>=0.65}}) AND sentiment.title.polarity:(negative neutral positive)&cursor=*&published_at.end=NOW&published_at.start=NOW-7DAYS/DAY';

    const requestOptions = {
        method: "GET",
        headers,
        redirect: "follow"
    };

    try {
        const response = await fetch(url, requestOptions);
        const responseData = await response.json();
        console.log(responseData); // Log Response Data

        if (!responseData || !responseData.stories) {
            throw new Error('Response data or stories not found');
        }

        // Display news articles on the webpage
        displayNewsOnPage(responseData.stories);
    } catch (error) {
        // Display error message on the website
        const errorMessageElement = document.getElementById('error-message');
        if (errorMessageElement) {
            errorMessageElement.innerText = 'Error fetching news: ' + error.message;
        } else {
            console.error('error-message element not found');
        }
    } finally {
        // Hide loading spinner
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
    }
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
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('news-item');

        const title = document.createElement('h3');
        title.textContent = newsItem.title;

        const description = document.createElement('p');
        description.textContent = newsItem.body;

        // Append title and description to the news item div
        newsDiv.appendChild(title);
        newsDiv.appendChild(description);

        // Append the news item div to the news container
        newsContainer.appendChild(newsDiv);
    });
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
