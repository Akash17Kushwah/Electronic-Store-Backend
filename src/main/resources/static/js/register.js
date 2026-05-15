const API_BASE = window.location.origin;

const form = document.getElementById("registerForm");
const alertBox = document.getElementById("alert");
const submitBtn = document.getElementById("submitBtn");
const termsCheckbox = document.getElementById("terms");

function showAlert(message, type = "error") {
  alertBox.textContent = message;
  alertBox.className = `alert alert-${type} show`;
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!termsCheckbox.checked) {
    showAlert("Please agree to the terms & conditions.");
    return;
  }

  const payload = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value,
    gender: document.getElementById("gender").value.trim() || "Male",
    about: "New user",
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Creating...";

  try {
    const res = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const msg =
        typeof data === "object" && data.email
          ? data.email
          : data.message || "Registration failed.";
      throw new Error(msg);
    }

    showAlert("Account created! Redirecting to sign in...", "success");
    setTimeout(() => {
      window.location.href = "/login.html";
    }, 1200);
  } catch (err) {
    showAlert(err.message || "Something went wrong.");
    submitBtn.disabled = false;
    submitBtn.textContent = "Create account";
  }
});
