(function () {
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

  function showMessage(message) {
    document.getElementById("db-message").textContent = message;
  }

  function formatDate(value) {
    if (!value) {
      return "尚無資料";
    }

    return new Intl.DateTimeFormat("zh-Hant", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date(value));
  }

  async function renderProducts() {
    const products = await window.ProductDB.getProducts();
    const list = document.getElementById("db-product-list");
    const empty = document.getElementById("empty-db-products");
    const activeCount = products.filter((product) => product.active).length;
    const latest = products.reduce((latestDate, product) => {
      const productDate = new Date(product.updatedAt || 0);
      return productDate > latestDate ? productDate : latestDate;
    }, new Date(0));

    list.innerHTML = "";
    document.getElementById("db-product-count").textContent = `${products.length} 件`;
    document.getElementById("db-active-count").textContent = activeCount;
    document.getElementById("db-inactive-count").textContent = products.length - activeCount;
    document.getElementById("db-updated-at").textContent = latest.getTime() ? formatDate(latest.toISOString()) : "尚無資料";
    empty.hidden = products.length > 0;

    products.forEach((product) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const availabilityCell = document.createElement("td");
      const priceCell = document.createElement("td");
      const statusCell = document.createElement("td");
      const updatedCell = document.createElement("td");
      const name = document.createElement("strong");
      const meta = document.createElement("span");
      const status = document.createElement("span");

      name.textContent = product.name;
      meta.textContent = `${product.tag} · ${product.calories} kcal`;
      availabilityCell.textContent = `${siteLabels[product.site]} · ${mealLabels[product.meal]}`;
      priceCell.textContent = `NT$ ${product.price}`;
      status.className = `admin-status ${product.active ? "is-active" : ""}`;
      status.textContent = product.active ? "上架中" : "已下架";
      updatedCell.textContent = formatDate(product.updatedAt);

      nameCell.append(name, meta);
      statusCell.appendChild(status);
      row.append(nameCell, availabilityCell, priceCell, statusCell, updatedCell);
      list.appendChild(row);
    });
  }

  async function exportProducts() {
    const products = await window.ProductDB.getProducts();
    const blob = new Blob([JSON.stringify(products, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `meal-order-products-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showMessage("已匯出商品 JSON。");
  }

  function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result));
      reader.addEventListener("error", () => reject(reader.error));
      reader.readAsText(file);
    });
  }

  async function importProducts(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    try {
      const imported = JSON.parse(await readFile(file));
      if (!Array.isArray(imported)) {
        throw new Error("JSON 必須是商品陣列。");
      }

      await window.ProductDB.saveProducts(imported);
      await renderProducts();
      showMessage(`已匯入 ${imported.length} 件商品。`);
    } catch (error) {
      showMessage("匯入失敗，請確認 JSON 格式。");
    } finally {
      event.target.value = "";
    }
  }

  async function clearProducts() {
    if (!window.confirm("確定要清空商品 DB？這會移除目前瀏覽器內的所有商品資料。")) {
      return;
    }

    await window.ProductDB.clearProducts();
    await renderProducts();
    showMessage("商品 DB 已清空。");
  }

  document.addEventListener("DOMContentLoaded", async () => {
    await window.ProductDB.migrateLegacyProducts();
    document.getElementById("export-products").addEventListener("click", exportProducts);
    document.getElementById("import-products").addEventListener("change", importProducts);
    document.getElementById("clear-products").addEventListener("click", clearProducts);
    renderProducts();
  });
})();
