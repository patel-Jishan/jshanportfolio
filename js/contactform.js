document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "5ae71307-5d8f-4a63-ab26-bcac6f416803");

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        alert("✅ Message sent successfully!");
        form.reset();
      } else {
        alert("❌ Something went wrong");
      }
    } catch {
      alert("⚠️ Network error");
    } finally {
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
    }
  });
});
