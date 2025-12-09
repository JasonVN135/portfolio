const sidebar = document.querySelector(".sidebar");
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("contact-form-btn");
const originalText = submitBtn.textContent; // store original button text

function showSidebar() {
    sidebar.style.display = "flex";
}

function hideSidebar() {
    sidebar.style.display = "none";
}

contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Clear previous errors
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.style.display = 'none');

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    if (name === '') {
        document.getElementById('messageError').textContent = 'Name is required';
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailPattern.test(email)) {
        document.getElementById('messageError').textContent = 'Valid email is required';
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }

    if (message === '') {
        document.getElementById('messageError').textContent = 'Message is required';
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        try {
            const response = await fetch("/.netlify/functions/send-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();

            if (data.success) {
                alert("Success! Your message has been sent.");
                contactForm.reset();
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
});