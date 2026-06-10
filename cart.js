(function () {
  const cartKey = "meal-order-cart";
  const defaultCart = [
    {
      id: "sample-chicken",
      name: "炙燒雞腿能量餐盒",
      price: 95,
      calories: 620,
      siteLabel: "竹科 A 廠",
      mealLabel: "午餐",
      diets: ["一般", "不辣"],
      quantity: 1
    },
    {
      id: "sample-tofu",
      name: "松露野菇豆腐餐",
      price: 88,
      calories: 510,
      siteLabel: "竹科 A 廠",
      mealLabel: "午餐",
      diets: ["素食"],
      quantity: 1
    }
  ];

  function getCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(cartKey));
      if (Array.isArray(saved)) {
        return saved;
      }
    } catch (error) {
      return [];
    }

    return defaultCart;
  }

  function saveCart(items) {
    localStorage.setItem(cartKey, JSON.stringify(items));
  }

  function money(amount) {
    return `NT$ ${Math.max(0, amount)}`;
  }

  function itemMeta(item) {
    const diets = item.diets && item.diets.length ? item.diets.join(" / ") : "一般";
    return `${item.mealLabel} · ${item.siteLabel} · ${diets} · ${item.calories} kcal`;
  }

  function trashIcon() {
    return [
      '<svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">',
      '<path d="M3 6h18"></path>',
      '<path d="M8 6V4h8v2"></path>',
      '<path d="M19 6l-1 14H6L5 6"></path>',
      '<path d="M10 11v5"></path>',
      '<path d="M14 11v5"></path>',
      "</svg>"
    ].join("");
  }

  function renderCart() {
    const items = getCart();
    const itemList = document.getElementById("cart-items");
    const empty = document.getElementById("empty-cart");
    const count = document.getElementById("cart-count");
    const checkoutLink = document.getElementById("checkout-link");
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const subsidy = totalQuantity > 0 ? Math.min(totalQuantity * 30, subtotal) : 0;
    const discount = totalQuantity > 0 ? 5 : 0;
    const total = Math.max(0, subtotal - subsidy - discount);

    itemList.innerHTML = "";
    count.textContent = `${totalQuantity} 份`;
    empty.hidden = items.length > 0;
    checkoutLink.classList.toggle("is-disabled", items.length === 0);
    checkoutLink.setAttribute("aria-disabled", String(items.length === 0));

    items.forEach((item) => {
      const row = document.createElement("div");
      const quantityControls = document.createElement("div");
      const decreaseButton = document.createElement("button");
      const quantity = document.createElement("span");
      const increaseButton = document.createElement("button");
      const content = document.createElement("div");
      const itemActions = document.createElement("div");
      const name = document.createElement("strong");
      const meta = document.createElement("p");
      const price = document.createElement("span");

      row.className = "cart-item";
      content.className = "cart-item-info";
      itemActions.className = "cart-item-actions";
      quantityControls.className = "quantity-control";
      decreaseButton.type = "button";
      decreaseButton.dataset.action = item.quantity <= 1 ? "remove" : "decrease";
      decreaseButton.dataset.id = item.id;
      decreaseButton.setAttribute("aria-label", item.quantity <= 1 ? "刪除商品" : "減少數量");
      if (item.quantity <= 1) {
        decreaseButton.className = "trash-quantity";
        decreaseButton.innerHTML = trashIcon();
      } else {
        decreaseButton.textContent = "-";
      }
      quantity.className = "qty";
      quantity.textContent = item.quantity;
      increaseButton.type = "button";
      increaseButton.dataset.action = "increase";
      increaseButton.dataset.id = item.id;
      increaseButton.setAttribute("aria-label", "增加數量");
      increaseButton.textContent = "+";
      name.textContent = item.name;
      meta.textContent = itemMeta(item);
      price.className = "cart-line-price";
      price.textContent = money(item.price * item.quantity);

      quantityControls.append(decreaseButton, quantity, increaseButton);
      content.append(name, meta);
      itemActions.append(quantityControls, price);
      row.append(content, itemActions);
      itemList.appendChild(row);
    });

    document.getElementById("cart-subtotal").textContent = money(subtotal);
    document.getElementById("cart-subsidy").textContent = `- ${money(subsidy)}`;
    document.getElementById("cart-discount").textContent = `- ${money(discount)}`;
    document.getElementById("cart-total").textContent = money(total);
    window.updateNavCartBadge?.();
  }

  function updateItem(id, action) {
    const items = getCart();
    const index = items.findIndex((item) => item.id === id);
    if (index < 0) {
      return;
    }

    if (action === "increase") {
      items[index].quantity += 1;
    }

    if (action === "decrease") {
      if (items[index].quantity <= 1) {
        items.splice(index, 1);
      } else {
        items[index].quantity -= 1;
      }
    }

    if (action === "remove") {
      items.splice(index, 1);
    }

    saveCart(items);
    renderCart();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cart-items").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-action]");
      if (!button) {
        return;
      }

      updateItem(button.dataset.id, button.dataset.action);
    });

    document.getElementById("checkout-link").addEventListener("click", (event) => {
      if (getCart().length === 0) {
        event.preventDefault();
      }
    });

    renderCart();
  });
})();
