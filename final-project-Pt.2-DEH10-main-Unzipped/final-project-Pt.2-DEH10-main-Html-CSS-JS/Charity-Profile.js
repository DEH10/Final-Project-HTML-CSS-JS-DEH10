// charity_profile.js

document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the "Volunteer Now" button
    var volunteerButton = document.querySelector('#volunteer-button');
    volunteerButton.addEventListener('click', redirectToVolunteerPage);

    // Add event listener to display additional charity details on hover
    var charityDescription = document.querySelector('#charity-description');
    charityDescription.addEventListener('mouseover', displayAdditionalDetailsOnce);
});

// Flag to track whether additional details have been displayed
var additionalDetailsDisplayed = false;

// Function to redirect to the volunteer info page
function redirectToVolunteerPage() {
    window.location.href = 'Volunteer-Info.html';
}

// Function to display additional charity details only once
function displayAdditionalDetailsOnce() {
    if (!additionalDetailsDisplayed) {
        var additionalDetails = document.createElement('p');
        additionalDetails.textContent = "Founded in 2010, HelpHub has facilitated over $100 million in donations to various causes worldwide.";
        additionalDetails.style.color = 'blue';
        
        var charityDescription = document.querySelector('#charity-description');
        charityDescription.appendChild(additionalDetails);

        // Set the flag to true to indicate that details have been displayed
        additionalDetailsDisplayed = true;
    }
}
