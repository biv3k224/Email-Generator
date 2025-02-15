document.getElementById('generateBtn').addEventListener('click', async () => {
    const emailContent = document.getElementById('emailContent').value;
    const tone = document.getElementById('tone').value;

    if (!emailContent) {
        alert('Please paste the original email content.');
        return;
    }

    const responseBox = document.getElementById('response');
    responseBox.textContent = 'Generating reply...';

    try {
        const response = await fetch('http://localhost:8080/api/email/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailContent: emailContent,
                tone: tone,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate reply.');
        }

        const data = await response.text();
        responseBox.textContent = data;
    } catch (error) {
        responseBox.textContent = 'Error: ' + error.message;
    }
});