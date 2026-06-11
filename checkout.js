const API_BASE = "https://api.formatnest.me";
const checkoutStatus = document.querySelector("#checkoutStatus");
const checkoutActions = document.querySelector("#checkoutActions");
const retryCheckout = document.querySelector("#retryCheckout");

function authToken() {
  return localStorage.getItem("formatnest_token");
}

function currentUser() {
  return JSON.parse(localStorage.getItem("convertdesk_user") || "null");
}

function setStatus(title, message, showActions = false) {
  checkoutStatus.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
  checkoutActions.hidden = !showActions;
}

async function createCheckoutSession() {
  const token = authToken();
  const user = currentUser();

  if (!token || !user) {
    setStatus(
      "Account required",
      "Log in or create a free account first. Then return here to continue with payment.",
      true
    );
    return;
  }

  setStatus("Preparing payment...", "Connecting your account to the secure payment processor.");

  try {
    const response = await fetch(`${API_BASE}/billing/create-checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: "{}"
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.detail || "Payment setup failed.");
    window.location.href = data.checkout_url;
  } catch (error) {
    setStatus(
      "Payment setup needs attention",
      `${error.message} If this continues, check the Stripe keys on the backend server.`,
      true
    );
  }
}

retryCheckout.addEventListener("click", createCheckoutSession);
createCheckoutSession();
