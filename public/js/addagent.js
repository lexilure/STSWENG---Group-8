const form = document.querySelector('form');
const errorMessage = document.querySelector('#error-message')

// Add event listener to the form submit event
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputs = form.querySelectorAll('.required');
    let hasMissingValues = false; // Check flag

    // Check fields if empty
    inputs.forEach((input) => {
        if (input.value.trim() === '') {
            hasMissingValues = true;

            // Set border color to red and add event listener for 'input'
            input.style.border = '1px solid red';
            input.addEventListener('input', () => {
                input.style.border = '';
            });
        }
    });

    if (hasMissingValues) {
        errorMessage.textContent = 'Please provide all necessary details and images.';
        errorMessage.style.display = 'block';
    } else {
        form.submit();
    }
});