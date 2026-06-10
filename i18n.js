(function () {
  const translations = {
    "網路訂餐系統": "Online Meal Ordering System",
    "訂餐": "Order",
    "我的訂單": "My Orders",
    "購物車": "Cart",
    "聯絡我們": "Contact Us",
    "後台": "Admin",
    "商品後台": "Product Admin",
    "建立可販售餐點，設定供應廠區、餐次、飲食標籤與上架狀態。": "Create sellable meals and configure site, meal period, dietary tags, and publishing status.",
    "上架商品": "Publish Product",
    "新增": "New",
    "編輯": "Edit",
    "商品名稱": "Product Name",
    "商品名稱（中文）": "Product Name (Chinese)",
    "商品名稱（英文）": "Product Name (English)",
    "售價": "Price",
    "熱量": "Calories",
    "商品標籤": "Product Tag",
    "商品描述": "Product Description",
    "商品描述（中文）": "Product Description (Chinese)",
    "商品描述（英文）": "Product Description (English)",
    "商品圖片": "Product Image",
    "選取本機圖片": "Choose Local Image",
    "尚未選取圖片": "No image selected",
    "已載入既有圖片": "Existing image loaded",
    "供應廠區": "Available Site",
    "飲食標籤": "Dietary Tags",
    "商品狀態": "Product Status",
    "上架中": "Published",
    "已下架": "Unpublished",
    "上架": "Publish",
    "下架": "Unpublish",
    "刪除": "Delete",
    "人氣版位": "Featured Placement",
    "清空表單": "Clear Form",
    "儲存商品": "Save Product",
    "商品列表": "Product List",
    "0 件": "0 Items",
    "商品": "Product",
    "供應": "Availability",
    "狀態": "Status",
    "操作": "Actions",
    "尚未建立商品": "No Products Yet",
    "新增第一個商品後，狀態為上架中的餐點會顯示在訂餐首頁。": "After adding your first product, published meals will appear on the ordering page.",
    "例如：香煎雞胸藜麥餐": "Example: Pan-seared Chicken Quinoa Meal",
    "Example: Pan-seared Chicken Quinoa Meal": "Example: Pan-seared Chicken Quinoa Meal",
    "例如：新品": "Example: New",
    "請輸入餐點內容、配菜或過敏原資訊": "Enter meal contents, sides, or allergen information",
    "Enter meal contents, sides, or allergen information": "Enter meal contents, sides, or allergen information",
    "今天想吃什麼，由你安排": "Plan what you want to eat today",
    "選擇廠區、日期、餐次與飲食偏好，快速加入購物車並完成公司帳務結帳。": "Choose a site, date, meal period, and dietary preference, then add meals to your cart and check out with company billing.",
    "訂餐條件": "Order Filters",
    "取餐日期": "Pickup Date",
    "取餐地點": "Pickup Location",
    "2F 員工餐廳": "2F Employee Cafeteria",
    "1F 大廳智能餐櫃": "1F Lobby Smart Locker",
    "B1 夜班取餐站": "B1 Night Shift Pickup Station",
    "訂餐廠區": "Site",
    "竹科 A 廠": "Hsinchu Site A",
    "竹科 B 廠": "Hsinchu Site B",
    "南科 C 廠": "Tainan Site C",
    "台中總部": "Taichung HQ",
    "餐次": "Meal Period",
    "早餐": "Breakfast",
    "午餐": "Lunch",
    "晚餐": "Dinner",
    "宵夜": "Late Night",
    "飲食選項": "Dietary Options",
    "全部": "All",
    "一般": "Regular",
    "素食": "Vegetarian",
    "含蛋": "Contains Egg",
    "五辛素": "Five Pungent Vegetarian",
    "不辣": "Non-spicy",
    "低卡": "Low Calorie",
    "今天可以吃這些": "Available Today",
    "排序": "Sort",
    "排序條件": "Sort field",
    "排序方向": "Sort direction",
    "條件": "Field",
    "方向": "Direction",
    "人氣": "Popularity",
    "價格": "Price",
    "由高到低": "High to Low",
    "由低到高": "Low to High",
    "人氣首選": "Popular Pick",
    "炙燒雞腿能量餐盒": "Seared Chicken Power Bento",
    "炙燒去骨雞腿、紫米飯、烤南瓜、溫沙拉與柚香醬。": "Seared boneless chicken thigh, purple rice, roasted pumpkin, warm salad, and yuzu dressing.",
    "加入購物車": "Add to Cart",
    "松露野菇豆腐餐": "Truffle Mushroom Tofu Meal",
    "板煎豆腐、松露野菇、藜麥毛豆、季節青蔬。": "Pan-seared tofu, truffle mushrooms, quinoa edamame, and seasonal greens.",
    "檸香鮭魚沙拉碗": "Lemon Salmon Salad Bowl",
    "鮭魚、綜合葉菜、烤櫛瓜、溏心蛋與油醋醬。": "Salmon, mixed greens, roasted zucchini, soft-boiled egg, and vinaigrette.",
    "宵夜可訂": "Late Night",
    "椒麻牛肉飯": "Mala Beef Rice",
    "薄切牛肉、溫泉蛋、青花菜、香蔥辣油與白飯。": "Sliced beef, onsen egg, broccoli, scallion chili oil, and steamed rice.",
    "厚蛋鮪魚晨光盒": "Tuna Omelet Breakfast Box",
    "厚蛋三明治、鮪魚沙拉、優格、無糖豆漿。": "Omelet sandwich, tuna salad, yogurt, and unsweetened soy milk.",
    "竹科 B 廠": "Hsinchu Site B",
    "味噌豬排晚餐盒": "Miso Pork Cutlet Dinner Box",
    "味噌豬排午餐盒": "Miso Pork Cutlet Lunch Box",
    "里肌豬排、味噌醬、玉子燒、海帶芽與米飯。": "Pork loin cutlet, miso sauce, tamagoyaki, wakame, and rice.",
    "南科素食": "Tainan Vegetarian",
    "彩蔬藜麥佛陀碗": "Colorful Quinoa Buddha Bowl",
    "藜麥、烤甜椒、鷹嘴豆、酪梨與芝麻葉。": "Quinoa, roasted peppers, chickpeas, avocado, and arugula.",
    "台中宵夜": "Taichung Late Night",
    "韓式泡菜牛五花": "Korean Kimchi Beef Belly",
    "牛五花、泡菜、豆芽、半熟蛋與海苔飯。": "Beef belly, kimchi, bean sprouts, soft egg, and seaweed rice.",
    "A 廠晚餐": "Site A Dinner",
    "A 廠午餐": "Site A Lunch",
    "蔥鹽舒肥雞胸飯": "Sous-vide Chicken Rice with Scallion Salt",
    "舒肥雞胸、蔥鹽醬、地瓜、花椰菜與半熟蛋。": "Sous-vide chicken breast, scallion salt sauce, sweet potato, broccoli, and soft egg.",
    "素食早餐": "Vegetarian Breakfast",
    "豆乳燕麥水果杯": "Soy Oat Fruit Cup",
    "豆乳燕麥、莓果、香蕉、堅果碎與黑芝麻粉。": "Soy oats, berries, banana, crushed nuts, and black sesame powder.",
    "輕宵夜": "Light Late Night",
    "味噌豆腐蔬菜湯": "Miso Tofu Vegetable Soup",
    "嫩豆腐、菇類、高麗菜、玉米筍與玄米飯糰。": "Soft tofu, mushrooms, cabbage, baby corn, and brown rice ball.",
    "B 廠早餐": "Site B Breakfast",
    "火腿起司貝果盒": "Ham and Cheese Bagel Box",
    "烤貝果、火腿起司、凱薩沙拉與冷泡茶。": "Toasted bagel, ham and cheese, Caesar salad, and cold brew tea.",
    "B 廠午餐": "Site B Lunch",
    "蒜香烤雞義式餐盒": "Garlic Roast Chicken Pasta Box",
    "蒜香烤雞、番茄筆管麵、烤甜椒與芝麻葉。": "Garlic roast chicken, tomato penne, roasted peppers, and arugula.",
    "B 廠素食": "Site B Vegetarian",
    "香煎櫛瓜豆包飯": "Pan-seared Zucchini Tofu Skin Rice",
    "豆包、櫛瓜、玉米筍、糙米飯與胡麻醬。": "Tofu skin, zucchini, baby corn, brown rice, and sesame dressing.",
    "B 廠宵夜": "Site B Late Night",
    "鹽烤鯖魚飯糰盒": "Salt-grilled Mackerel Rice Ball Box",
    "鯖魚飯糰、玉子燒、毛豆、味噌湯與小菜。": "Mackerel rice balls, tamagoyaki, edamame, miso soup, and side dishes.",
    "晚餐素食": "Vegetarian Dinner",
    "泰式打拋菇菇飯": "Thai Basil Mushroom Rice",
    "杏鮑菇、九層塔、糙米飯、涼拌青木瓜。": "King oyster mushrooms, Thai basil, brown rice, and green papaya salad.",
    "南科早餐": "Tainan Breakfast",
    "燻雞蛋沙拉可頌": "Smoked Chicken Egg Salad Croissant",
    "小可頌、燻雞蛋沙拉、蔬菜棒與拿鐵。": "Mini croissant, smoked chicken egg salad, veggie sticks, and latte.",
    "南科午餐": "Tainan Lunch",
    "台式滷雞腿便當": "Taiwanese Braised Chicken Bento",
    "滷雞腿、滷蛋、青江菜、豆干與白飯。": "Braised chicken leg, braised egg, bok choy, tofu, and rice.",
    "南科晚餐": "Tainan Dinner",
    "番茄牛肉燉飯": "Tomato Beef Risotto",
    "番茄燉牛肉、菇菇、花椰菜、帕瑪森起司。": "Tomato-braised beef, mushrooms, broccoli, and Parmesan.",
    "南科宵夜": "Tainan Late Night",
    "南瓜蔬菜濃湯組": "Pumpkin Vegetable Soup Set",
    "南瓜濃湯、佛卡夏、烤菇與鮮蔬杯。": "Pumpkin soup, focaccia, roasted mushrooms, and fresh vegetable cup.",
    "台中早餐": "Taichung Breakfast",
    "酪梨豆腐吐司": "Avocado Tofu Toast",
    "全麥吐司、酪梨泥、嫩豆腐、番茄與生菜。": "Whole wheat toast, avocado mash, soft tofu, tomato, and lettuce.",
    "台中午餐": "Taichung Lunch",
    "黑胡椒牛柳餐盒": "Black Pepper Beef Tenderloin Box",
    "牛柳、彩椒、洋蔥、蒜香飯與炒時蔬。": "Beef tenderloin, bell peppers, onion, garlic rice, and sauteed vegetables.",
    "台中晚餐": "Taichung Dinner",
    "香草烤魚蔬菜盤": "Herb Roasted Fish Plate",
    "香草白身魚、烤馬鈴薯、甜豆、檸檬優格醬。": "Herbed white fish, roasted potatoes, snap peas, and lemon yogurt sauce.",
    "這個條件暫時沒有餐點": "No Meals Match These Filters",
    "換個餐次、廠區或飲食偏好看看，廚房可能在其他時段有供應。": "Try another meal period, site, or dietary preference. The kitchen may offer more options at other times.",
    "購物車確認": "Cart Review",
    "核對餐點、數量、飲食偏好與公司補助後，再前往結帳。": "Review meals, quantities, dietary preferences, and company subsidies before checkout.",
    "已選餐點": "Selected Meals",
    "2 份": "2 Items",
    "午餐 · 竹科 A 廠 · 一般 / 不辣 · 620 kcal": "Lunch · Hsinchu Site A · Regular / Non-spicy · 620 kcal",
    "午餐 · 竹科 A 廠 · 素食 · 510 kcal": "Lunch · Hsinchu Site A · Vegetarian · 510 kcal",
    "餐點備註": "Meal Notes",
    "訂單摘要": "Order Summary",
    "餐點小計": "Meal Subtotal",
    "公司補助": "Company Subsidy",
    "環保餐具折抵": "Reusable Utensil Discount",
    "應付金額": "Amount Due",
    "繼續選餐": "Continue Ordering",
    "前往結帳": "Checkout",
    "結帳與取餐確認": "Checkout and Pickup Confirmation",
    "確認付款方式、收據設定與通知管道，送出後即可完成訂餐。": "Confirm payment, receipt settings, and notifications. Submit to complete your order.",
    "結帳資訊": "Checkout Details",
    "可結帳": "Ready",
    "付款方式": "Payment Method",
    "薪資扣款": "Payroll Deduction",
    "員工錢包": "Employee Wallet",
    "信用卡": "Credit Card",
    "發票 / 收據": "Invoice / Receipt",
    "公司統編": "Company Tax ID",
    "個人載具": "Personal Carrier",
    "通知方式": "Notification",
    "Email + Teams 推播": "Email + Teams Push",
    "僅 Email": "Email Only",
    "僅 Teams 推播": "Teams Push Only",
    "取餐提醒": "Pickup Reminder",
    "取餐前 15 分鐘": "15 Minutes Before Pickup",
    "取餐前 30 分鐘": "30 Minutes Before Pickup",
    "不提醒": "No Reminder",
    "取餐時間": "Pickup Time",
    "竹科 A 廠 · 2F 員工餐廳": "Hsinchu Site A · 2F Employee Cafeteria",
    "訂購人": "Ordered By",
    "我已確認訂餐內容、過敏資訊與取餐時間。": "I have confirmed the order details, allergy information, and pickup time.",
    "送出訂單": "Submit Order",
    "訂單已送出": "Order Submitted",
    "訂餐成功！": "Order successful!",
    "我們已收到你的訂單，取餐時間前會依設定通知你。": "We have received your order and will notify you before pickup based on your settings.",
    "已完成": "Completed",
    "回到訂餐頁": "Back to Order",
    "付款明細": "Payment Details",
    "返回購物車修改": "Back to Cart",
    "查看近期訂餐紀錄、取餐資訊與付款狀態，快速掌握每一筆餐點安排。": "View recent orders, pickup details, and payment status at a glance.",
    "近期訂單": "Recent Orders",
    "3 筆": "3 Orders",
    "今日": "Today",
    "炙燒雞腿能量餐盒、松露野菇豆腐餐": "Seared Chicken Power Bento, Truffle Mushroom Tofu Meal",
    "待取餐": "Pending Pickup",
    "明日": "Tomorrow",
    "香煎鮭魚藜麥餐": "Pan-seared Salmon Quinoa Meal",
    "已付款": "Paid",
    "完成": "Completed",
    "泰式打拋豬飯、溫沙拉": "Thai Basil Pork Rice, Warm Salad",
    "已取餐": "Picked Up",
    "評價此訂單": "Rate This Order",
    "分享餐點口味、份量或取餐體驗，協助餐廳調整供餐品質。": "Share feedback on taste, portion size, or pickup experience to help improve meal quality.",
    "尚未評價": "Not Rated",
    "評價內容": "Review",
    "送出評價": "Submit Review",
    "更新評價": "Update Review",
    "已送出評價": "Review Submitted",
    "請先選擇評分星等。": "Please choose a rating first.",
    "已儲存你的評價。": "Your review has been saved.",
    "今日取餐": "Today's Pickup",
    "付款狀態": "Payment Status",
    "薪資扣款 · NT$ 118": "Payroll Deduction · NT$ 118",
    "再訂一份餐點": "Order Another Meal",
    "餐點異動、付款問題或取餐協助，都可以透過表單送出，我們會盡快回覆。": "Use the form for meal changes, payment issues, or pickup help. We will respond as soon as possible.",
    "問題回報": "Support Request",
    "服務中": "Online",
    "問題類型": "Issue Type",
    "餐點內容": "Meal Details",
    "訂單修改": "Order Changes",
    "付款 / 收據": "Payment / Receipt",
    "取餐協助": "Pickup Help",
    "訂單編號": "Order Number",
    "問題描述": "Issue Description",
    "送出聯絡表單": "Submit Request",
    "服務資訊": "Service Info",
    "服務時間": "Service Hours",
    "週一至週五 08:30 - 18:30": "Mon-Fri 08:30 - 18:30",
    "客服信箱": "Support Email",
    "分機": "Extension",
    "緊急取餐": "Urgent Pickup",
    "請洽 2F 員工餐廳櫃台": "Please contact the 2F cafeteria counter",
    "主要導覽": "Main navigation",
    "語系切換": "Language switcher",
    "例如：飯少、醬另外放、請使用環保餐具": "Example: less rice, sauce on the side, please use reusable utensils",
    "請描述需要協助的內容": "Describe what you need help with",
    "評分星等": "Rating",
    "例如：餐點份量剛好、取餐速度很快，主菜可以再少油一點": "Example: the portion was right, pickup was fast, and the main dish could use a little less oil",
    "5 星": "5 stars",
    "4 星": "4 stars",
    "3 星": "3 stars",
    "2 星": "2 stars",
    "1 星": "1 star"
  };

  const titleTranslations = {
    "網路訂餐系統": "Online Meal Ordering System",
    "購物車 | 網路訂餐系統": "Cart | Online Meal Ordering System",
    "結帳 | 網路訂餐系統": "Checkout | Online Meal Ordering System",
    "我的訂單 | 網路訂餐系統": "My Orders | Online Meal Ordering System",
    "聯絡我們 | 網路訂餐系統": "Contact Us | Online Meal Ordering System",
    "商品後台 | 網路訂餐系統": "Product Admin | Online Meal Ordering System"
  };

  const textSources = new WeakMap();
  const attrSources = new WeakMap();
  const originalTitle = document.title;

  function currentLanguage() {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang === "en" || urlLang === "zh") {
      return urlLang;
    }
    return localStorage.getItem("meal-order-lang") || "zh";
  }

  function collectTextNodes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE"].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach((node) => {
      if (!textSources.has(node)) {
        textSources.set(node, node.nodeValue);
      }
    });
  }

  function translateTextNode(node, lang) {
    const source = textSources.get(node) || node.nodeValue;
    const trimmed = source.trim();
    const leading = source.match(/^\s*/)[0];
    const trailing = source.match(/\s*$/)[0];
    node.nodeValue = lang === "en" && translations[trimmed]
      ? `${leading}${translations[trimmed]}${trailing}`
      : source;
  }

  function translateAttributes(lang) {
    document.querySelectorAll("[placeholder], [aria-label], [title]").forEach((element) => {
      if (!attrSources.has(element)) {
        attrSources.set(element, {
          placeholder: element.getAttribute("placeholder"),
          ariaLabel: element.getAttribute("aria-label"),
          title: element.getAttribute("title")
        });
      }

      const source = attrSources.get(element);
      if (source.placeholder !== null) {
        element.setAttribute("placeholder", lang === "en" && translations[source.placeholder]
          ? translations[source.placeholder]
          : source.placeholder);
      }
      if (source.ariaLabel !== null) {
        element.setAttribute("aria-label", lang === "en" && translations[source.ariaLabel]
          ? translations[source.ariaLabel]
          : source.ariaLabel);
      }
      if (source.title !== null) {
        element.setAttribute("title", lang === "en" && translations[source.title]
          ? translations[source.title]
          : source.title);
      }
    });
  }

  function updateLanguageLinks(lang) {
    const page = window.location.pathname.split("/").pop() || "index.html";
    const zhLink = document.querySelector('.language-switch a[lang="zh-Hant"]');
    const enLink = document.querySelector('.language-switch a[lang="en"]');

    if (zhLink) {
      zhLink.href = page;
      zhLink.classList.toggle("active", lang === "zh");
    }
    if (enLink) {
      enLink.href = `${page}?lang=en`;
      enLink.classList.toggle("active", lang === "en");
    }
  }

  function updateUrl(lang) {
    const url = new URL(window.location.href);
    if (lang === "en") {
      url.searchParams.set("lang", "en");
    } else {
      url.searchParams.delete("lang");
    }
    window.history.replaceState({}, "", url);
  }

  function applyLanguage(lang, updateAddress) {
    document.documentElement.lang = lang === "en" ? "en" : "zh-Hant";
    document.title = lang === "en" && titleTranslations[originalTitle]
      ? titleTranslations[originalTitle]
      : originalTitle;

    collectTextNodes();
    document.querySelectorAll(".language-switch a").forEach((link) => {
      link.textContent = link.lang === "en" ? "EN" : "中";
    });
    document.querySelectorAll("body *").forEach((element) => {
      element.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && textSources.has(node)) {
          translateTextNode(node, lang);
        }
      });
    });
    translateAttributes(lang);
    updateLanguageLinks(lang);
    localStorage.setItem("meal-order-lang", lang);
    if (updateAddress) {
      updateUrl(lang);
    }
    window.dispatchEvent(new CustomEvent("meal-order-language-change", {
      detail: { lang }
    }));
  }

  document.addEventListener("DOMContentLoaded", () => {
    collectTextNodes();
    applyLanguage(currentLanguage(), false);

    document.querySelectorAll(".language-switch a").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        applyLanguage(link.lang === "en" ? "en" : "zh", true);
      });
    });
  });
})();
