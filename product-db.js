(function () {
  const dbName = "meal-order-db";
  const storeName = "products";
  const legacyStorageKey = "meal-order-admin-products";
  const dbVersion = 1;

  function openDatabase() {
    return new Promise((resolve, reject) => {
      if (!("indexedDB" in window)) {
        reject(new Error("IndexedDB is not supported."));
        return;
      }

      const request = indexedDB.open(dbName, dbVersion);
      request.addEventListener("upgradeneeded", () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: "id" });
        }
      });
      request.addEventListener("success", () => resolve(request.result));
      request.addEventListener("error", () => reject(request.error));
    });
  }

  function transaction(mode, callback) {
    return openDatabase().then((db) => new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, mode);
      const store = tx.objectStore(storeName);
      const result = callback(store);
      tx.addEventListener("complete", () => {
        db.close();
        resolve(result);
      });
      tx.addEventListener("error", () => {
        db.close();
        reject(tx.error);
      });
    }));
  }

  function sortProducts(products) {
    return products.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  }

  async function getProducts() {
    return transaction("readonly", (store) => new Promise((resolve, reject) => {
      const request = store.getAll();
      request.addEventListener("success", () => resolve(sortProducts(request.result || [])));
      request.addEventListener("error", () => reject(request.error));
    })).catch(() => {
      try {
        return JSON.parse(localStorage.getItem(legacyStorageKey)) || [];
      } catch (error) {
        return [];
      }
    });
  }

  async function saveProducts(products) {
    await transaction("readwrite", (store) => {
      store.clear();
      products.forEach((product) => {
        store.put(product);
      });
    });
    localStorage.setItem(legacyStorageKey, JSON.stringify(products));
  }

  async function migrateLegacyProducts() {
    const existing = await getProducts();
    if (existing.length) {
      return existing;
    }

    try {
      const legacy = JSON.parse(localStorage.getItem(legacyStorageKey)) || [];
      if (legacy.length) {
        await saveProducts(legacy);
      }
      return legacy;
    } catch (error) {
      return [];
    }
  }

  async function clearProducts() {
    await transaction("readwrite", (store) => {
      store.clear();
    });
    localStorage.removeItem(legacyStorageKey);
  }

  window.ProductDB = {
    getProducts,
    saveProducts,
    migrateLegacyProducts,
    clearProducts
  };
})();
