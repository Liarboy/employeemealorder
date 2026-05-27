(function () {
  const dbName = "meal-order-db";
  const storeName = "products";
  const legacyStorageKey = "meal-order-admin-products";
  const defaultSeedKey = "meal-order-default-products-seeded";
  const dbVersion = 1;
  const defaultProducts = [
    { id: "default-01", name: "炙燒雞腿能量餐盒", description: "炙燒去骨雞腿、紫米飯、烤南瓜、溫沙拉與柚香醬。", price: 95, calories: 620, tag: "人氣首選", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80", site: "site-a", meal: "meal-lunch", diets: ["diet-normal", "diet-no-spicy"], active: true, featured: true },
    { id: "default-02", name: "松露野菇豆腐餐", description: "板煎豆腐、松露野菇、藜麥毛豆、季節青蔬。", price: 88, calories: 510, tag: "素食", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80", site: "site-a", meal: "meal-lunch", diets: ["diet-vegan", "diet-five-pungent", "diet-low", "diet-no-spicy"], active: true, featured: false },
    { id: "default-03", name: "檸香鮭魚沙拉碗", description: "鮭魚、綜合葉菜、烤櫛瓜、溏心蛋與油醋醬。", price: 118, calories: 460, tag: "低卡", image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=900&q=80", site: "site-a", meal: "meal-lunch", diets: ["diet-egg", "diet-low", "diet-no-spicy"], active: true, featured: false },
    { id: "default-04", name: "蒜香烤雞義式餐盒", description: "蒜香烤雞、番茄筆管麵、烤甜椒與芝麻葉。", price: 98, calories: 650, tag: "A 廠午餐", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80", site: "site-a", meal: "meal-lunch", diets: ["diet-normal", "diet-no-spicy"], active: true, featured: false },
    { id: "default-05", name: "台式滷雞腿便當", description: "滷雞腿、滷蛋、青江菜、豆干與白飯。", price: 94, calories: 670, tag: "A 廠午餐", image: "https://images.unsplash.com/photo-1625938144755-652e08e359b7?auto=format&fit=crop&w=900&q=80", site: "site-a", meal: "meal-lunch", diets: ["diet-normal", "diet-egg"], active: true, featured: false },
    { id: "default-06", name: "香煎櫛瓜豆包飯", description: "豆包、櫛瓜、玉米筍、糙米飯與胡麻醬。", price: 86, calories: 455, tag: "素食", image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=900&q=80", site: "site-a", meal: "meal-lunch", diets: ["diet-vegan", "diet-low", "diet-no-spicy"], active: true, featured: false },
    { id: "default-07", name: "黑胡椒牛柳餐盒", description: "牛柳、彩椒、洋蔥、蒜香飯與炒時蔬。", price: 112, calories: 690, tag: "A 廠午餐", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80", site: "site-a", meal: "meal-lunch", diets: ["diet-normal", "diet-no-spicy"], active: true, featured: false },
    { id: "default-08", name: "香草烤魚蔬菜盤", description: "香草白身魚、烤馬鈴薯、甜豆、檸檬優格醬。", price: 116, calories: 575, tag: "低卡", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80", site: "site-a", meal: "meal-lunch", diets: ["diet-low", "diet-no-spicy"], active: true, featured: false },
    { id: "default-09", name: "味噌豬排午餐盒", description: "里肌豬排、味噌醬、玉子燒、海帶芽與米飯。", price: 102, calories: 680, tag: "A 廠午餐", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80", site: "site-a", meal: "meal-lunch", diets: ["diet-normal", "diet-egg", "diet-no-spicy"], active: true, featured: false },
    { id: "default-10", name: "彩蔬藜麥佛陀碗", description: "藜麥、烤甜椒、鷹嘴豆、酪梨與芝麻葉。", price: 92, calories: 480, tag: "素食", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80", site: "site-a", meal: "meal-lunch", diets: ["diet-vegan", "diet-low", "diet-no-spicy"], active: true, featured: false },
    { id: "default-11", name: "椒麻牛肉飯", description: "薄切牛肉、溫泉蛋、青花菜、香蔥辣油與白飯。", price: 105, calories: 700, tag: "宵夜可訂", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=900&q=80", site: "site-a", meal: "meal-night", diets: ["diet-normal", "diet-egg"], active: true, featured: false },
    { id: "default-12", name: "厚蛋鮪魚晨光盒", description: "厚蛋三明治、鮪魚沙拉、優格、無糖豆漿。", price: 72, calories: 390, tag: "早餐", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80", site: "site-a", meal: "meal-breakfast", diets: ["diet-normal", "diet-egg", "diet-no-spicy"], active: true, featured: false },
    { id: "default-13", name: "味噌豬排晚餐盒", description: "里肌豬排、味噌醬、玉子燒、海帶芽與米飯。", price: 102, calories: 680, tag: "竹科 B 廠", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80", site: "site-b", meal: "meal-dinner", diets: ["diet-normal", "diet-egg", "diet-no-spicy"], active: true, featured: false },
    { id: "default-14", name: "彩蔬藜麥佛陀碗", description: "藜麥、烤甜椒、鷹嘴豆、酪梨與芝麻葉。", price: 92, calories: 480, tag: "南科素食", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80", site: "site-south", meal: "meal-lunch", diets: ["diet-vegan", "diet-low", "diet-no-spicy"], active: true, featured: false },
    { id: "default-15", name: "韓式泡菜牛五花", description: "牛五花、泡菜、豆芽、半熟蛋與海苔飯。", price: 108, calories: 740, tag: "台中宵夜", image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80", site: "site-taichung", meal: "meal-night", diets: ["diet-normal", "diet-egg"], active: true, featured: false },
    { id: "default-16", name: "蔥鹽舒肥雞胸飯", description: "舒肥雞胸、蔥鹽醬、地瓜、花椰菜與半熟蛋。", price: 96, calories: 590, tag: "A 廠晚餐", image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80", site: "site-a", meal: "meal-dinner", diets: ["diet-normal", "diet-egg", "diet-no-spicy"], active: true, featured: false },
    { id: "default-17", name: "豆乳燕麥水果杯", description: "豆乳燕麥、莓果、香蕉、堅果碎與黑芝麻粉。", price: 68, calories: 360, tag: "素食早餐", image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=900&q=80", site: "site-a", meal: "meal-breakfast", diets: ["diet-vegan", "diet-low", "diet-no-spicy"], active: true, featured: false },
    { id: "default-18", name: "味噌豆腐蔬菜湯", description: "嫩豆腐、菇類、高麗菜、玉米筍與玄米飯糰。", price: 82, calories: 430, tag: "輕宵夜", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80", site: "site-a", meal: "meal-night", diets: ["diet-vegan", "diet-low", "diet-no-spicy"], active: true, featured: false },
    { id: "default-19", name: "火腿起司貝果盒", description: "烤貝果、火腿起司、凱薩沙拉與冷泡茶。", price: 78, calories: 420, tag: "B 廠早餐", image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=900&q=80", site: "site-b", meal: "meal-breakfast", diets: ["diet-normal", "diet-no-spicy"], active: true, featured: false },
    { id: "default-20", name: "蒜香烤雞義式餐盒", description: "蒜香烤雞、番茄筆管麵、烤甜椒與芝麻葉。", price: 98, calories: 650, tag: "B 廠午餐", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80", site: "site-b", meal: "meal-lunch", diets: ["diet-normal", "diet-no-spicy"], active: true, featured: false },
    { id: "default-21", name: "香煎櫛瓜豆包飯", description: "豆包、櫛瓜、玉米筍、糙米飯與胡麻醬。", price: 86, calories: 455, tag: "B 廠素食", image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=900&q=80", site: "site-b", meal: "meal-lunch", diets: ["diet-vegan", "diet-low", "diet-no-spicy"], active: true, featured: false },
    { id: "default-22", name: "鹽烤鯖魚飯糰盒", description: "鯖魚飯糰、玉子燒、毛豆、味噌湯與小菜。", price: 90, calories: 610, tag: "B 廠宵夜", image: "https://images.unsplash.com/photo-1562158070-622a5bba5d3f?auto=format&fit=crop&w=900&q=80", site: "site-b", meal: "meal-night", diets: ["diet-normal", "diet-egg", "diet-no-spicy"], active: true, featured: false },
    { id: "default-23", name: "泰式打拋菇菇飯", description: "杏鮑菇、九層塔、糙米飯、涼拌青木瓜。", price: 89, calories: 500, tag: "晚餐素食", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80", site: "site-b", meal: "meal-dinner", diets: ["diet-vegan", "diet-five-pungent", "diet-low", "diet-no-spicy"], active: true, featured: false },
    { id: "default-24", name: "燻雞蛋沙拉可頌", description: "小可頌、燻雞蛋沙拉、蔬菜棒與拿鐵。", price: 76, calories: 410, tag: "南科早餐", image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80", site: "site-south", meal: "meal-breakfast", diets: ["diet-normal", "diet-egg", "diet-no-spicy"], active: true, featured: false },
    { id: "default-25", name: "台式滷雞腿便當", description: "滷雞腿、滷蛋、青江菜、豆干與白飯。", price: 94, calories: 670, tag: "南科午餐", image: "https://images.unsplash.com/photo-1625938144755-652e08e359b7?auto=format&fit=crop&w=900&q=80", site: "site-south", meal: "meal-lunch", diets: ["diet-normal", "diet-egg", "diet-no-spicy"], active: true, featured: false },
    { id: "default-26", name: "番茄牛肉燉飯", description: "番茄燉牛肉、菇菇、花椰菜、帕瑪森起司。", price: 106, calories: 630, tag: "南科晚餐", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=80", site: "site-south", meal: "meal-dinner", diets: ["diet-normal", "diet-no-spicy"], active: true, featured: false },
    { id: "default-27", name: "南瓜蔬菜濃湯組", description: "南瓜濃湯、佛卡夏、烤菇與鮮蔬杯。", price: 79, calories: 420, tag: "南科宵夜", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80", site: "site-south", meal: "meal-night", diets: ["diet-vegan", "diet-low", "diet-no-spicy"], active: true, featured: false },
    { id: "default-28", name: "酪梨豆腐吐司", description: "全麥吐司、酪梨泥、嫩豆腐、番茄與生菜。", price: 74, calories: 350, tag: "台中早餐", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80", site: "site-taichung", meal: "meal-breakfast", diets: ["diet-vegan", "diet-low", "diet-no-spicy"], active: true, featured: false },
    { id: "default-29", name: "黑胡椒牛柳餐盒", description: "牛柳、彩椒、洋蔥、蒜香飯與炒時蔬。", price: 112, calories: 690, tag: "台中午餐", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80", site: "site-taichung", meal: "meal-lunch", diets: ["diet-normal", "diet-no-spicy"], active: true, featured: false },
    { id: "default-30", name: "香草烤魚蔬菜盤", description: "香草白身魚、烤馬鈴薯、甜豆、檸檬優格醬。", price: 116, calories: 575, tag: "台中晚餐", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80", site: "site-taichung", meal: "meal-dinner", diets: ["diet-normal", "diet-no-spicy"], active: true, featured: false }
  ].map((product, index) => ({
    ...product,
    updatedAt: new Date(Date.UTC(2026, 4, 1, 0, index)).toISOString()
  }));

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
    let products = await getProducts();
    try {
      const legacy = JSON.parse(localStorage.getItem(legacyStorageKey)) || [];
      const knownIds = new Set(products.map((product) => product.id));
      legacy.forEach((product) => {
        if (!knownIds.has(product.id)) {
          products.push(product);
          knownIds.add(product.id);
        }
      });

      if (localStorage.getItem(defaultSeedKey) !== "true") {
        defaultProducts.forEach((product) => {
          if (!knownIds.has(product.id)) {
            products.push(product);
            knownIds.add(product.id);
          }
        });
        localStorage.setItem(defaultSeedKey, "true");
      }

      if (products.length) {
        await saveProducts(sortProducts(products));
      }
      return sortProducts(products);
    } catch (error) {
      if (products.length) {
        return products;
      }

      await saveProducts(defaultProducts);
      localStorage.setItem(defaultSeedKey, "true");
      return defaultProducts;
    }
  }

  async function clearProducts() {
    await transaction("readwrite", (store) => {
      store.clear();
    });
    localStorage.removeItem(legacyStorageKey);
    localStorage.setItem(defaultSeedKey, "true");
  }

  window.ProductDB = {
    getProducts,
    saveProducts,
    migrateLegacyProducts,
    clearProducts
  };
})();
