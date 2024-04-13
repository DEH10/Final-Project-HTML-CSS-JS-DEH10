document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the "Volunteer Now" button
    var volunteerButton = document.querySelector('#volunteer-now-button');
    if (volunteerButton) {
        volunteerButton.addEventListener('click', displayVolunteerForm);
    }

    // Add event listener to display additional charity details on hover
    var charityDescription = document.querySelector('#charity-description');
    if (charityDescription) {
        charityDescription.addEventListener('mouseover', displayAdditionalDetailsOnce);
    }
});

// Function to display the volunteer form
function displayVolunteerForm() {
    // Display the volunteer form
    var volunteerForm = document.querySelector('#volunteer-form');
    if (volunteerForm) {
        volunteerForm.style.display = 'block';
    }
}

// Flag to track whether additional details have been displayed
var additionalDetailsDisplayed = false;

// Function to display additional charity details only once
function displayAdditionalDetailsOnce() {
    if (!additionalDetailsDisplayed) {
        var additionalDetails = document.createElement('p');
        additionalDetails.textContent = "Founded in 2010, HelpHub has facilitated over $100 million in donations to various causes worldwide.";
        additionalDetails.style.color = 'blue';
        
        var charityDescription = document.querySelector('#charity-description');
        if (charityDescription) {
            charityDescription.appendChild(additionalDetails);
        }

        // Set the flag to true to indicate that details have been displayed
        additionalDetailsDisplayed = true;
    }
}
