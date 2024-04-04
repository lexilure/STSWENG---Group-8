const form = document.querySelector('#property-form');
const fieldset = document.querySelector('textarea')
const errorMessage = document.querySelector('#error-message');

form.addEventListener('submit', (event) => {

    event.preventDefault();
    const inputs = form.querySelectorAll('input');
    let hasMissingValues = false;

    // Check for missing values
    inputs.forEach((input) => {
        if (input.value.trim() === '') {
            hasMissingValues = true;

            // Set border color to red
            input.style.border = '1px solid red';
            input.addEventListener('input', () => {
                input.style.border = '';
            });
        }
    });

    if (fieldset.value.trim() === '') {
        fieldset.style.border = '1px solid red';
        fieldset.addEventListener('input', () => {
            fieldset.style.border = '';
        })
    }

    if (hasMissingValues) {
        errorMessage.textContent = 'Please provide all necessary details and images.';
        errorMessage.style.display = 'block';
    } else {
        form.submit();
    }
});