const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');
const path = require('path');

// Correct the path to reference the Excel file relative to the contact.js file location
const workbookPath = path.join(__dirname, '../data/inquiries.xlsx');

router.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body; // Extract data from form submission
    
    // Load or initialize the workbook
    let workbook;
    try {
        workbook = xlsx.readFile(workbookPath);
    } catch (error) {
        // If the workbook does not exist, create a new one
        workbook = xlsx.utils.book_new();
        workbook.SheetNames.push('Submissions');
        const worksheet = xlsx.utils.aoa_to_sheet([['Name', 'Email', 'Subject', 'Message']]);
        workbook.Sheets['Submissions'] = worksheet;
    }

    // Load the worksheet
    const worksheet = workbook.Sheets['Submissions'];

    // Find the next empty row
    const ref = worksheet['!ref'];
    const range = xlsx.utils.decode_range(ref);
    const newRow = range.e.r + 1; // Assumes data starts at first row

    // Append new data
    xlsx.utils.sheet_add_aoa(worksheet, [[name, email, subject, message]], {origin: {r: newRow, c: 0}});

    // Update the range of the worksheet
    worksheet['!ref'] = xlsx.utils.encode_range(range.s, {r: newRow, c: range.e.c});

    // Save the workbook
    try {
        xlsx.writeFile(workbook, workbookPath);
        res.status(200).send('Your message has been received. Thank you!');
    } catch (writeError) {
        console.error(writeError);
        res.status(500).send('An error occurred while saving your message.');
    }
});


module.exports = router;