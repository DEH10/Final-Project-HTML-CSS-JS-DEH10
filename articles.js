// Sample news data (replace this with your actual fetched data)
const newsData = [
    { title: "News Title 1", publishedAt: "2024-04-20", url: "https://example.com/news1" },
    { title: "News Title 2", publishedAt: "2024-04-19", url: "https://example.com/news2" },
    { title: "News Title 3", publishedAt: "2024-04-18", url: "https://example.com/news3" }
];

// Function to dynamically populate the table with fetched news data
function populateNewsTable(news) {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) {
        console.error('news-container element not found');
        return;
    }

    // Create a table element
    const table = document.createElement('table');

    // Create table header row
    const headerRow = table.insertRow();
    const headers = ['Title', 'Published At', 'Link'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    // Populate the table with news data
    news.forEach(newsItem => {
        const row = table.insertRow();
        const cell1 = row.insertCell();
        cell1.textContent = newsItem.title;
        const cell2 = row.insertCell();
        cell2.textContent = newsItem.publishedAt;
        const cell3 = row.insertCell();
        const link = document.createElement('a');
        link.href = newsItem.url;
        link.textContent = 'Read more';
        link.target = '_blank';
        cell3.appendChild(link);
    });

    // Append the table to the news container
    newsContainer.appendChild(table);
}

// Call the function to populate the table with sample news data
populateNewsTable(newsData);
