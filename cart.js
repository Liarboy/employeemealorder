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
      const name = document.createElement("strong");
      const meta = document.createElement("p");
      const price = document.createElement("span");
      const removeButton = document.createElement("button");

      row.className = "cart-item";
      quantityControls.className = "quantity-control";
      decreaseButton.type = "button";
      decreaseButton.dataset.action = "decrease";
      decreaseButton.dataset.id = item.id;
      decreaseButton.textContent = "-";
      decreaseButton.disabled = item.quantity <= 1;
      quantity.className = "qty";
      quantity.textContent = item.quantity;
      increaseButton.type = "button";
      increaseButton.dataset.action = "increase";
      increaseButton.dataset.id = item.id;
      increaseButton.textContent = "+";
      name.textContent = item.name;
      meta.textContent = itemMeta(item);
      price.textContent = money(item.price * item.quantity);
      removeButton.type = "button";
      removeButton.className = "remove-cart-item";
      removeButton.dataset.action = "remove";
      removeButton.dataset.id = item.id;
      removeButton.textContent = "刪除";

      quantityControls.append(decreaseButton, quantity, increaseButton);
      content.append(name, meta);
      row.append(quantityControls, content, price, removeButton);
      itemList.appendChild(row);
    });

    document.getElementById("cart-subtotal").textContent = money(subtotal);
    document.getElementById("cart-subsidy").textContent = `- ${money(subsidy)}`;
    document.getElementById("cart-discount").textContent = `- ${money(discount)}`;
    document.getElementById("cart-total").textContent = money(total);
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
      items[index].quantity = Math.max(1, items[index].quantity - 1);
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
