(function () {
  const cartKey = "meal-order-cart";
  const defaultQuantity = 2;

  function getCartItems() {
    const raw = localStorage.getItem(cartKey);
    if (raw === null) {
      return [{ quantity: defaultQuantity }];
    }

    try {
      const items = JSON.parse(raw);
      return Array.isArray(items) ? items : [];
    } catch (error) {
      return [];
    }
  }

  function cartQuantity() {
    return getCartItems().reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  }

  function updateNavCartBadge() {
    const cartLink = document.querySelector('.main-nav a[href="cart.html"]');
    if (!cartLink) {
      return;
    }

    let badge = cartLink.querySelector(".nav-badge");
    const quantity = cartQuantity();

    if (quantity <= 0) {
      if (badge) {
        badge.remove();
      }
      return;
    }

    if (!badge) {
      badge = document.createElement("span");
      badge.className = "nav-badge";
      badge.setAttribute("aria-label", "購物車商品數量");
      cartLink.appendChild(badge);
    }

    badge.textContent = quantity > 99 ? "99+" : String(quantity);
  }

  window.updateNavCartBadge = updateNavCartBadge;
  document.addEventListener("DOMContentLoaded", updateNavCartBadge);
  window.addEventListener("storage", (event) => {
    if (event.key === cartKey) {
      updateNavCartBadge();
    }
  });
})();
