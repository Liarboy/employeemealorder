(function () {
  const cartKey = "meal-order-cart";

  function clearCart() {
    localStorage.setItem(cartKey, JSON.stringify([]));
    window.updateNavCartBadge?.();
  }

  function markOrderSubmitted() {
    const form = document.querySelector(".checkout-form");
    const success = document.getElementById("order-success");
    const submitButton = document.getElementById("submit-order");
    const backLink = document.querySelector(".summary-card .secondary-button");
    const status = document.querySelector(".checkout-card .status-dot");

    clearCart();
    document.body.classList.add("order-submitted");

    if (success) {
      success.hidden = false;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "訂單已送出";
    }

    if (status) {
      status.textContent = "已完成";
    }

    if (backLink) {
      backLink.textContent = "回到訂餐頁";
      backLink.href = "index.html";
    }

    form?.querySelectorAll("input, select, button").forEach((control) => {
      if (control !== submitButton) {
        control.disabled = true;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submit-order")?.addEventListener("click", () => {
      markOrderSubmitted();
    });
  });
})();
