// script.js


document.addEventListener('DOMContentLoaded', () => {
    // 1. Highlight active nav link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === window.location.pathname.split('/').pop()) {
        link.classList.add('active');
      }
    });
  
    // 2. Feedback form handling
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
      const feedbackMessage = document.getElementById('feedback-message');
      feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = feedbackForm.name.value.trim();
        const email = feedbackForm.email.value.trim();
        const message = feedbackForm.message.value.trim();
  
        if (!name || !email || !message) {
          feedbackMessage.textContent = 'Please fill in all fields.';
          feedbackMessage.style.color = 'red';
          return;
        }
  
        // Store feedback in localStorage
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        feedbacks.push({ name, email, message, date: new Date().toISOString() });
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

          //Show a generic reply
        feedbackReplyBox.textContent = `Thanks ${name}, we received your question: "${message}". We'll get back to you soon!`;
        feedbackReplyBox.style.color = "green";
          
        feedbackForm.reset();
      });
    }
  
    // 3. Checklist persistence
    const checklist = document.getElementById('checklist');
    if (checklist) {
      const savedState = JSON.parse(localStorage.getItem('checklistState') || '{}');
      const items = checklist.querySelectorAll('li input[type="checkbox"]');
      items.forEach((checkbox, index) => {
        // Restore checked state
        checkbox.checked = savedState[index] || false;
        // Save on change
        checkbox.addEventListener('change', () => {
          savedState[index] = checkbox.checked;
          localStorage.setItem('checklistState', JSON.stringify(savedState));
        });
      });
    }
  });
  
