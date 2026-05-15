const API_BASE = window.location.origin;

const form = document.getElementById("loginForm");
const alertBox = document.getElementById("alert");
const submitBtn = document.getElementById("submitBtn");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const termsCheckbox = document.getElementById("terms");

function showAlert(message, type = "error") {
  alertBox.textContent = message;
  alertBox.className = `alert alert-${type} show`;
}

function hideAlert() {
  alertBox.className = "alert";
  alertBox.textContent = "";
}

function onLoginSuccess(user) {
  clearLegacyTokenStorage();
  showAlert(`Welcome back, ${user?.name || "User"}!`, "success");
  submitBtn.textContent = "Success!";
  setTimeout(() => {
    window.location.href = "/home.html";
  }, 800);
}

togglePassword?.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
});

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  hideAlert();

  if (!termsCheckbox.checked) {
    showAlert("Please agree to the terms & conditions.");
    return;
  }

  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value;

  submitBtn.disabled = true;
  submitBtn.textContent = "Signing in...";

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || "Login failed. Check email and password.");
    }

    onLoginSuccess(data.user);
  } catch (err) {
    showAlert(err.message || "Something went wrong. Is the server running?");
    submitBtn.disabled = false;
    submitBtn.textContent = "Sign In";
  }
});

const GOOGLE_CLIENT_ID = window.GOOGLE_CLIENT_ID || "";

function parseJwtPayload(token) {
  const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
}

async function handleGoogleCredential(response) {
  hideAlert();
  const idToken = response.credential;
  let payload;
  try {
    payload = parseJwtPayload(idToken);
  } catch {
    showAlert("Could not read Google account details.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        idToken,
        name: payload.name || "Google User",
        photoUrl: payload.picture || "",
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || "Google sign-in failed.");
    }

    onLoginSuccess(data.user);
  } catch (err) {
    showAlert(err.message || "Google sign-in failed.");
  }
}

function initGoogleSignIn() {
  if (!GOOGLE_CLIENT_ID || typeof google === "undefined") return;

  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleCredential,
  });
}

document.getElementById("btnGoogle")?.addEventListener("click", () => {
  if (!termsCheckbox.checked) {
    showAlert("Please agree to the terms & conditions.");
    return;
  }
  if (!GOOGLE_CLIENT_ID) {
    showAlert("Google Client ID is not configured.");
    return;
  }
  if (typeof google === "undefined") {
    showAlert("Google sign-in is still loading. Try again in a moment.");
    return;
  }
  initGoogleSignIn();
  google.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      showAlert(
        "Google sign-in was blocked. Allow popups, or add http://localhost:9090 as an authorized origin in Google Cloud Console."
      );
    }
  });
});

window.addEventListener("load", initGoogleSignIn);

document.getElementById("btnFacebook")?.addEventListener("click", () => {
  showAlert("Facebook login is not configured in this backend yet.");
});
