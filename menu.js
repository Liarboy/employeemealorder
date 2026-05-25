(function () {
  const storageKey = "meal-order-admin-products";

  function getProducts() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch (error) {
      return [];
    }
  }

  function createCard(product) {
    const card = document.createElement("article");
    card.className = [
      "meal-card",
      product.featured ? "featured" : "",
      product.meal,
      product.site,
      ...(product.diets || [])
    ].filter(Boolean).join(" ");

    const photo = document.createElement("div");
    const body = document.createElement("div");
    const meta = document.createElement("div");
    const tag = document.createElement("span");
    const calories = document.createElement("small");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const footer = document.createElement("div");
    const price = document.createElement("strong");
    const cartLink = document.createElement("a");

    photo.className = "meal-photo";
    photo.style.backgroundImage = `url("${product.image}")`;
    body.className = "meal-body";
    meta.className = "meal-meta";
    footer.className = "meal-footer";
    cartLink.className = "button";
    cartLink.href = "cart.html";

    tag.textContent = product.tag;
    calories.textContent = `${product.calories} kcal`;
    title.textContent = product.name;
    description.textContent = product.description;
    price.textContent = `NT$ ${product.price}`;
    cartLink.textContent = "加入購物車";

    meta.append(tag, calories);
    footer.append(price, cartLink);
    body.append(meta, title, description, footer);
    card.append(photo, body);
    return card;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".menu-grid");
    const emptyState = document.querySelector(".empty-state");
    if (!grid || !emptyState) {
      return;
    }

    getProducts()
      .filter((product) => product.active)
      .forEach((product) => {
        grid.insertBefore(createCard(product), emptyState);
      });

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
