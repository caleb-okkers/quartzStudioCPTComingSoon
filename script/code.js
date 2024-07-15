document.addEventListener('DOMContentLoaded', function() {
    // Get the popup and open button elements
    var popup = document.getElementById('messagingPopup');
    var openButton = document.getElementById('openMessagingFab');
    var closeButtonIcon = openButton.querySelector('.fa-close');
    var openButtonIcon = openButton.querySelector('.fa-message');
    
    // Get the message sent popup and its close button
    var messageSentPopup = document.getElementById('messageSentPopup');
    
    // Toggle popup visibility when clicking on the open/close button
    openButton.onclick = function() {
        if (popup.style.display === 'block') {
            popup.style.display = 'none';
            openButton.classList.remove('active'); // Remove active class
            openButtonIcon.style.display = 'inline'; // Show open icon
            closeButtonIcon.style.display = 'none'; // Hide close icon
        } else {
            popup.style.display = 'block';
            openButton.classList.add('active'); // Add active class
            openButtonIcon.style.display = 'none'; // Hide open icon
            closeButtonIcon.style.display = 'inline'; // Show close icon
        }
    }

    // Optional: Close the popup when clicking on the close button or outside of it
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
            openButton.classList.remove('active'); // Remove active class
            openButtonIcon.style.display = 'inline'; // Show open icon
            closeButtonIcon.style.display = 'none'; // Hide close icon
        }
    }

    // Custom validation
    var form = document.getElementById('messagingForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission for custom validation
        var valid = true;

        var nameInput = document.getElementById('name');
        var emailInput = document.getElementById('email');
        var messageInput = document.getElementById('message');

        var nameError = document.getElementById('nameError');
        var emailError = document.getElementById('emailError');
        var messageError = document.getElementById('messageError');

        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';

        if (nameInput.value.trim() === '') {
            valid = false;
            nameError.textContent = 'Name is required.';
        }

        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            valid = false;
            emailError.textContent = 'Please enter a valid email address.';
        }

        if (messageInput.value.trim() === '') {
            valid = false;
            messageError.textContent = 'Message is required.';
        }

        if (valid) {
            // Handle form submission via AJAX or Formspree
            var formData = new FormData(form);
            var xhr = new XMLHttpRequest();
            xhr.open(form.method, form.action);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState !== XMLHttpRequest.DONE) return;
                if (xhr.status === 200) {
                    console.log('Form submission successful!');
                    // Optionally close the enquiry popup after successful submission
                    popup.style.display = 'none';
                    openButton.classList.remove('active'); // Remove active class
                    openButtonIcon.style.display = 'inline'; // Show open icon
                    closeButtonIcon.style.display = 'none'; // Hide close icon
                    // Show the message sent popup
                    messageSentPopup.style.display = 'block';
                    // Hide the message sent popup after 2 seconds
                    setTimeout(function() {
                        messageSentPopup.style.display = 'none';
                    }, 3500);
                } else {
                    console.error('Form submission failed:', xhr.status);
                    // Handle error or provide user feedback
                }
            };
            xhr.send(formData);
        }
    });

    // Clear error messages when the form is reset
    form.addEventListener('reset', function() {
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('messageError').textContent = '';
    });
});