document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('generateBtn').addEventListener('click', async () => {
        const emailContent = document.getElementById('emailContent').value;
        const tone = document.getElementById('tone').value;
        const responseBox = document.getElementById('response');

        if (!emailContent) {
            alert('Please paste the original email content.');
            return;
        }

        responseBox.textContent = 'Generating reply...';

        try {
            const response = await fetch('https://email-generator-3hn7.onrender.com/api/email/generate', {
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
                throw new Error(`Failed to generate reply: ${response.statusText}`);
            }

            const data = await response.text();
            responseBox.textContent = data;
        } catch (error) {
            responseBox.textContent = 'Error: ' + error.message;
            console.error('Fetch error:', error);
        }
    });
});
