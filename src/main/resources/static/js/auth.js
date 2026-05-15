/** Shared auth helpers — JWT is stored in HttpOnly cookie by the server. */
const AUTH_FETCH_OPTIONS = { credentials: "include" };

function clearLegacyTokenStorage() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
}

async function fetchCurrentUser() {
  const res = await fetch(`${window.location.origin}/auth/current`, {
    ...AUTH_FETCH_OPTIONS,
  });
  if (!res.ok) {
    throw new Error("Not authenticated");
  }
  return res.json();
}

async function logout() {
  await fetch(`${window.location.origin}/auth/logout`, {
    method: "POST",
    ...AUTH_FETCH_OPTIONS,
  });
  clearLegacyTokenStorage();
  window.location.href = "/login.html";
}
