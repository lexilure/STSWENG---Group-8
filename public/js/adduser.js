const form = document.querySelector('form');
const errorMessage = document.querySelector('#error-message');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get all input fields
    const inputs = form.querySelectorAll('input');

    // Check if any input field is empty
    let hasEmptyField = false;
    inputs.forEach((input) => {
        if (input.value.trim() === '') {
            hasEmptyField = true;
            input.style.border = '1px solid red';
            input.addEventListener('input', () => {
                input.style.border = '';
            });
        }
    });

    // Set error message to block to display error message if there are missing fields
    if (hasEmptyField) {
        errorMessage.textContent = 'Please fill up all fields.';
        errorMessage.style.display = 'block';
    } else {
        form.submit();
    }
});