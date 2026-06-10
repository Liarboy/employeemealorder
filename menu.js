(function () {
  const cartKey = "meal-order-cart";
  const siteLabels = {
    "site-a": "竹科 A 廠",
    "site-b": "竹科 B 廠",
    "site-south": "南科 C 廠",
    "site-taichung": "台中總部"
  };
  const mealLabels = {
    "meal-breakfast": "早餐",
    "meal-lunch": "午餐",
    "meal-dinner": "晚餐",
    "meal-night": "宵夜"
  };
  const dietLabels = {
    "diet-normal": "一般",
    "diet-vegan": "素食",
    "diet-egg": "含蛋",
    "diet-five-pungent": "五辛素",
    "diet-no-spicy": "不辣",
    "diet-low": "低卡"
  };

  const getProducts = () => window.ProductDB.getProducts();

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(cartKey)) || [];
    } catch (error) {
      return [];
    }
  }

  function addToCart(product) {
    const items = getCart();
    const existing = items.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        calories: product.calories,
        siteLabel: siteLabels[product.site],
        mealLabel: mealLabels[product.meal],
        diets: (product.diets || ["diet-normal"]).map((diet) => dietLabels[diet] || diet),
        quantity: 1
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(items));
  }

  function classValue(card, prefix) {
    return Array.from(card.classList).find((className) => className.startsWith(prefix));
  }

  function productFromStaticCard(card) {
    const name = card.querySelector("h3")?.textContent.trim() || "未命名餐點";
    const priceText = card.querySelector(".meal-footer strong")?.textContent || "0";
    const caloriesText = card.querySelector(".meal-meta small")?.textContent || "0";
    const site = classValue(card, "site-") || "site-a";
    const meal = classValue(card, "meal-") || "meal-lunch";
    const diets = Array.from(card.classList).filter((className) => className.startsWith("diet-"));

    return {
      id: `static-${name}`,
      name,
      price: Number(priceText.replace(/[^\d]/g, "")) || 0,
      calories: Number(caloriesText.replace(/[^\d]/g, "")) || 0,
      site,
      meal,
      diets: diets.length ? diets : ["diet-normal"]
    };
  }

  function attachStaticCartButtons() {
    document.querySelectorAll('.meal-card .meal-footer a.button[href="cart.html"]').forEach((button) => {
      button.addEventListener("click", (event) => {
        const card = button.closest(".meal-card");
        if (!card) {
          return;
        }

        event.preventDefault();
        addToCart(productFromStaticCard(card));
        window.location.href = "cart.html";
      });
    });
  }

  function removeStaticMenuCards(grid) {
    grid.querySelectorAll(".meal-card").forEach((card) => {
      card.remove();
    });
  }

  function createCard(product, index) {
    const card = document.createElement("article");
    card.className = [
      "meal-card",
      product.featured ? "featured" : "",
      product.meal,
      product.site,
      ...(product.diets || [])
    ].filter(Boolean).join(" ");
    card.dataset.sortIndex = String(index);
    card.dataset.price = String(product.price || 0);
    card.dataset.calories = String(product.calories || 0);

    const photo = document.createElement("div");
    const body = document.createElement("div");
    const meta = document.createElement("div");
    const tag = document.createElement("span");
    const calories = document.createElement("small");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const footer = document.createElement("div");
    const price = document.createElement("strong");
    const cartButton = document.createElement("button");

    photo.className = "meal-photo";
    photo.style.backgroundImage = `url("${product.image}")`;
    body.className = "meal-body";
    meta.className = "meal-meta";
    footer.className = "meal-footer";
    cartButton.className = "button";
    cartButton.type = "button";

    tag.textContent = product.tag;
    calories.textContent = `${product.calories} kcal`;
    title.textContent = product.name;
    description.textContent = product.description;
    price.textContent = `NT$ ${product.price}`;
    cartButton.textContent = "加入購物車";
    cartButton.addEventListener("click", () => {
      addToCart(product);
      window.location.href = "cart.html";
    });

    meta.append(tag, calories);
    footer.append(price, cartButton);
    body.append(meta, title, description, footer);
    card.append(photo, body);
    return card;
  }

  function sortProductsForMenu(products, sortValue) {
    return [...products].sort((a, b) => {
      if (sortValue === "calories-asc") {
        return (Number(a.calories) || 0) - (Number(b.calories) || 0) || a.menuOrder - b.menuOrder;
      }

      if (sortValue === "price-asc") {
        return (Number(a.price) || 0) - (Number(b.price) || 0) || a.menuOrder - b.menuOrder;
      }

      return a.menuOrder - b.menuOrder;
    });
  }

  function renderMenuCards(grid, emptyState, products, sortValue) {
    removeStaticMenuCards(grid);
    sortProductsForMenu(products, sortValue).forEach((product, index) => {
      grid.insertBefore(createCard(product, index), emptyState);
    });
  }

  document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.querySelector(".menu-grid");
    const emptyState = document.querySelector(".empty-state");
    const sortSelect = document.getElementById("menu-sort");
    if (!grid || !emptyState) {
      return;
    }

    removeStaticMenuCards(grid);

    const products = await window.ProductDB.migrateLegacyProducts();
    const activeProducts = products
      .filter((product) => product.active)
      .map((product, index) => {
        return { ...product, menuOrder: index };
      });

    renderMenuCards(grid, emptyState, activeProducts, sortSelect?.value || "popular");
    if (sortSelect) {
      const updateSort = () => {
        renderMenuCards(grid, emptyState, activeProducts, sortSelect.value);
      };
      sortSelect.addEventListener("input", updateSort);
      sortSelect.addEventListener("change", updateSort);
    }

    const topbar = document.querySelector(".topbar");
    const hero = document.querySelector(".hero");
    const orderPanel = document.querySelector(".order-panel");
    const menuSection = document.querySelector(".menu-section");
    if (!topbar || !hero || !orderPanel || !menuSection) {
      return;
    }

    const allDiet = document.getElementById("diet-all");
    const dietOptions = Array.from(document.querySelectorAll('input[name="diet"]')).filter((input) => input !== allDiet);

    function syncDietSelection(changedInput) {
      if (!allDiet) {
        return;
      }

      if (changedInput === allDiet && allDiet.checked) {
        dietOptions.forEach((input) => {
          input.checked = false;
        });
      } else if (changedInput !== allDiet && changedInput.checked) {
        allDiet.checked = false;
      }

      if (!allDiet.checked && !dietOptions.some((input) => input.checked)) {
        allDiet.checked = true;
      }
    }

    if (allDiet) {
      [allDiet, ...dietOptions].forEach((input) => {
        input.addEventListener("change", () => {
          syncDietSelection(input);
          updateFilterState();
        });
      });
    }

    function updateStickyTop() {
      document.documentElement.style.setProperty("--sticky-filter-top", `${topbar.offsetHeight}px`);
    }

    function updatePanelOffset() {
      const threshold = menuSection.offsetTop - topbar.offsetHeight - 24;
      const shouldReserveSpace = window.scrollY > threshold - 80;

      if (!shouldReserveSpace) {
        document.documentElement.style.setProperty("--condensed-filter-offset", "0px");
        return;
      }

      document.documentElement.style.setProperty("--condensed-filter-offset", `${orderPanel.offsetHeight + 18}px`);
    }

    function updateFilterState() {
      const threshold = menuSection.offsetTop - topbar.offsetHeight - 24;
      document.body.classList.toggle("filters-condensed", window.scrollY > threshold);
      updatePanelOffset();
    }

    updateStickyTop();
    updateFilterState();
    window.addEventListener("resize", () => {
      updateStickyTop();
      updateFilterState();
    });
    window.addEventListener("scroll", updateFilterState, { passive: true });
  });
})();
