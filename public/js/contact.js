const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const formStartTime = Date.now();

function showSuccess() {
  form.reset();
  statusEl.textContent = "Thanks, we'll be in touch within one business day.";
  statusEl.classList.add('form-status--success');
}

form.addEventListener('submit', async (event) => {
  event.preventDefault(); 
  
  const data = Object.fromEntries(new FormData(form));
  data.formStartTime = formStartTime;
  const button = form.querySelector('button[type="submit"]');
  
  statusEl.textContent = '';
  statusEl.className = 'form-status';

  const formLoadTime = Date.now() - formStartTime; 
  if (formLoadTime < 3000) {
    showSuccess();
    console.log("Submission too quick! Submission dropped.");
    return; 
  }
  
  if (data.guest) {
    showSuccess();
    return;
  }
  
  button.disabled = true;

  try {
    const response = await fetch('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!result.ok) {
      throw new Error(result.error || 'Something went wrong.');
    }

    form.reset();
    statusEl.textContent = "Thanks, we'll be in touch within one business day.";
    statusEl.classList.add('form-status--success');

  } catch (error) {
    statusEl.textContent = error.message || 'Something went wrong. Please email hello@calicomedia.co instead.';
    statusEl.classList.add('form-status--error');

  } finally {
    button.disabled = false;
  }
});

