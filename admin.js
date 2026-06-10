(function () {
  const fallbackImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80";
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
  const cropAspectRatio = 16 / 9;
  const cropOutputWidth = 900;
  const cropOutputHeight = Math.round(cropOutputWidth / cropAspectRatio);
  let imageCropper = null;
  let cropPreviewTimer = null;

  const getProducts = () => window.ProductDB.getProducts();
  const saveProducts = (products) => window.ProductDB.saveProducts(products);

  function fieldValue(id) {
    return document.getElementById(id).value.trim();
  }

  function setFieldValue(id, value) {
    document.getElementById(id).value = value || "";
  }

  function selectedValue(name) {
    return document.querySelector(`input[name="${name}"]:checked`).value;
  }

  function selectedDiets() {
    return Array.from(document.querySelectorAll('input[name="diet"]:checked')).map((input) => input.value);
  }

  function setDiets(diets) {
    document.querySelectorAll('input[name="diet"]').forEach((input) => {
      input.checked = diets.includes(input.value);
    });
  }

  function setTranslationStatus(message) {
    const status = document.getElementById("translation-status");
    if (status) {
      status.textContent = message || "";
    }
  }

  async function translateWithBrowserAI(text, sourceLanguage, targetLanguage) {
    if (!text) {
      return "";
    }

    const translatorFactory = window.Translator || window.ai?.translator;
    if (!translatorFactory?.create) {
      return "";
    }

    try {
      const translator = await translatorFactory.create({
        sourceLanguage,
        targetLanguage
      });
      return (await translator.translate(text)).trim();
    } catch (error) {
      return "";
    }
  }

  async function resolveLocalizedText(zhValue, enValue, fieldLabel) {
    const zh = zhValue.trim();
    const en = enValue.trim();

    if (!zh && !en) {
      throw new Error(`請至少輸入${fieldLabel}的其中一個語系。`);
    }

    if (zh && en) {
      return { zh, en };
    }

    if (zh) {
      const translated = await translateWithBrowserAI(zh, "zh-Hant", "en");
      if (translated) {
        setTranslationStatus(`${fieldLabel}英文已自動翻譯。`);
        return { zh, en: translated };
      }
      setTranslationStatus("此瀏覽器沒有可用的 AI 翻譯能力，已暫以中文同步缺少語系。");
      return { zh, en: zh };
    }

    const translated = await translateWithBrowserAI(en, "en", "zh-Hant");
    if (translated) {
      setTranslationStatus(`${fieldLabel}中文已自動翻譯。`);
      return { zh: translated, en };
    }
    setTranslationStatus("此瀏覽器沒有可用的 AI 翻譯能力，已暫以英文同步缺少語系。");
    return { zh: en, en };
  }

  async function productFromForm() {
    const diets = selectedDiets();
    const name = await resolveLocalizedText(fieldValue("product-name-zh"), fieldValue("product-name-en"), "商品名稱");
    const description = await resolveLocalizedText(fieldValue("product-description-zh"), fieldValue("product-description-en"), "商品描述");
    updateCroppedImage();
    return {
      id: fieldValue("product-id") || `product-${Date.now()}`,
      name: name.zh,
      nameZh: name.zh,
      nameEn: name.en,
      description: description.zh,
      descriptionZh: description.zh,
      descriptionEn: description.en,
      price: Number(fieldValue("product-price")),
      calories: Number(fieldValue("product-calories")),
      tag: fieldValue("product-tag"),
      image: fieldValue("product-image-data") || fallbackImage,
      site: selectedValue("site"),
      meal: selectedValue("meal"),
      diets: diets.length ? diets : ["diet-normal"],
      active: document.getElementById("product-active").checked,
      featured: document.getElementById("product-featured").checked,
      updatedAt: new Date().toISOString()
    };
  }

  function resetForm() {
    document.getElementById("product-form").reset();
    document.getElementById("product-id").value = "";
    setTranslationStatus("");
    document.getElementById("product-image-data").value = "";
    document.getElementById("upload-file-name").textContent = "尚未選取圖片";
    document.getElementById("image-cropper").hidden = true;
    document.getElementById("crop-image").removeAttribute("src");
    document.getElementById("image-preview").hidden = true;
    document.getElementById("image-preview").style.backgroundImage = "";
    destroyImageCropper();
    document.getElementById("admin-site-a").checked = true;
    document.getElementById("admin-lunch").checked = true;
    document.querySelector('input[name="diet"][value="diet-normal"]').checked = true;
    document.getElementById("product-active").checked = true;
    document.getElementById("form-mode").textContent = "新增";
  }

  function fillForm(product) {
    const hasCustomImage = product.image && product.image !== fallbackImage;
    document.getElementById("product-id").value = product.id;
    setFieldValue("product-name-zh", product.nameZh || product.name);
    setFieldValue("product-name-en", product.nameEn || "");
    document.getElementById("product-price").value = product.price;
    document.getElementById("product-calories").value = product.calories;
    document.getElementById("product-tag").value = product.tag;
    setFieldValue("product-description-zh", product.descriptionZh || product.description);
    setFieldValue("product-description-en", product.descriptionEn || "");
    setTranslationStatus("");
    document.getElementById("product-image-data").value = hasCustomImage ? product.image : "";
    document.getElementById("upload-file-name").textContent = hasCustomImage ? "已載入既有圖片，可重新裁切" : "尚未選取圖片";
    if (hasCustomImage) {
      loadImageIntoCropper(product.image, { resetOutput: false });
    } else {
      document.getElementById("image-cropper").hidden = true;
      document.getElementById("crop-image").removeAttribute("src");
      destroyImageCropper();
      document.getElementById("image-preview").hidden = true;
      document.getElementById("image-preview").style.backgroundImage = "";
    }
    document.querySelector(`input[name="site"][value="${product.site}"]`).checked = true;
    document.querySelector(`input[name="meal"][value="${product.meal}"]`).checked = true;
    setDiets(product.diets || []);
    document.getElementById("product-active").checked = product.active;
    document.getElementById("product-featured").checked = product.featured;
    document.getElementById("form-mode").textContent = "編輯";
    document.getElementById("product-name-zh").focus();
  }

  function destroyImageCropper() {
    if (!imageCropper) {
      return;
    }

    imageCropper.destroy();
    imageCropper = null;
  }

  function scheduleCroppedImageUpdate() {
    window.clearTimeout(cropPreviewTimer);
    cropPreviewTimer = window.setTimeout(updateCroppedImage, 180);
  }

  function updateCroppedImage() {
    if (!imageCropper) {
      return;
    }

    const canvas = imageCropper.getCroppedCanvas({
      width: cropOutputWidth,
      height: cropOutputHeight,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high"
    });

    if (!canvas) {
      return;
    }

    const croppedImage = canvas.toDataURL("image/jpeg", 0.9);
    document.getElementById("product-image-data").value = croppedImage;
    document.getElementById("image-preview").hidden = false;
    document.getElementById("image-preview").style.backgroundImage = `url("${croppedImage}")`;
  }

  function initializeImageCropper() {
    if (typeof Cropper === "undefined") {
      document.getElementById("upload-file-name").textContent = "圖片裁切工具載入失敗";
      return;
    }

    destroyImageCropper();
    imageCropper = new Cropper(document.getElementById("crop-image"), {
      aspectRatio: cropAspectRatio,
      viewMode: 1,
      autoCropArea: 0.82,
      background: false,
      responsive: true,
      restore: false,
      dragMode: "move",
      movable: true,
      zoomable: true,
      cropBoxMovable: true,
      cropBoxResizable: true,
      toggleDragModeOnDblclick: false,
      ready: updateCroppedImage,
      cropend: updateCroppedImage,
      zoom: scheduleCroppedImageUpdate
    });
  }

  function loadImageIntoCropper(src, options = {}) {
    const cropImage = document.getElementById("crop-image");
    const shouldResetOutput = options.resetOutput !== false;

    destroyImageCropper();
    cropImage.removeAttribute("src");
    window.clearTimeout(cropPreviewTimer);
    if (shouldResetOutput) {
      document.getElementById("product-image-data").value = "";
      document.getElementById("image-preview").hidden = true;
      document.getElementById("image-preview").style.backgroundImage = "";
    }

    document.getElementById("image-cropper").hidden = false;
    cropImage.addEventListener("load", () => {
      initializeImageCropper();
    }, { once: true });
    window.requestAnimationFrame(() => {
      cropImage.src = src;
    });
  }

  function handleImageFile(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      document.getElementById("upload-file-name").textContent = file.name;
      loadImageIntoCropper(reader.result);
    });
    reader.readAsDataURL(file);
  }

  async function renderProducts() {
    const products = await getProducts();
    const list = document.getElementById("product-list");
    const empty = document.getElementById("empty-products");
    const count = document.getElementById("product-count");
    list.innerHTML = "";
    count.textContent = `${products.length} 件`;
    empty.hidden = products.length > 0;

    products.forEach((product) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      const productSummary = document.createElement("div");
      const thumbnail = document.createElement("img");
      const copy = document.createElement("div");
      const name = document.createElement("strong");
      const meta = document.createElement("span");
      const nameZh = product.nameZh || product.name;
      const nameEn = product.nameEn || "";
      productSummary.className = "admin-product-summary";
      thumbnail.className = "admin-product-thumb";
      thumbnail.src = product.image || fallbackImage;
      thumbnail.alt = nameZh;
      name.textContent = nameEn ? `${nameZh} / ${nameEn}` : nameZh;
      meta.textContent = `${product.tag} · ${product.calories} kcal`;
      copy.append(name, meta);
      productSummary.append(thumbnail, copy);
      nameCell.appendChild(productSummary);

      const availabilityCell = document.createElement("td");
      availabilityCell.textContent = `${siteLabels[product.site]} · ${mealLabels[product.meal]}`;

      const priceCell = document.createElement("td");
      priceCell.textContent = `NT$ ${product.price}`;

      const statusCell = document.createElement("td");
      const status = document.createElement("span");
      status.className = `admin-status ${product.active ? "is-active" : ""}`;
      status.textContent = product.active ? "上架中" : "已下架";
      statusCell.appendChild(status);

      const actionCell = document.createElement("td");
      const actions = document.createElement("div");
      actions.className = "table-actions";
      [
        ["edit", "編輯"],
        ["toggle", product.active ? "下架" : "上架"],
        ["delete", "刪除"]
      ].forEach(([action, label]) => {
        const actionButton = document.createElement("button");
        actionButton.type = "button";
        actionButton.dataset.action = action;
        actionButton.dataset.id = product.id;
        actionButton.textContent = label;
        actions.appendChild(actionButton);
      });
      actionCell.appendChild(actions);

      row.append(nameCell, availabilityCell, priceCell, statusCell, actionCell);
      list.appendChild(row);
    });
  }

  async function upsertProduct(product) {
    const products = await getProducts();
    const index = products.findIndex((item) => item.id === product.id);
    if (index >= 0) {
      products[index] = product;
    } else {
      products.unshift(product);
    }
    await saveProducts(products);
  }

  async function handleTableAction(event) {
    const button = event.target.closest("button[data-action]");
    if (!button) {
      return;
    }

    const products = await getProducts();
    const product = products.find((item) => item.id === button.dataset.id);
    if (!product) {
      return;
    }

    if (button.dataset.action === "edit") {
      fillForm(product);
      return;
    }

    if (button.dataset.action === "toggle") {
      product.active = !product.active;
      product.updatedAt = new Date().toISOString();
      await saveProducts(products);
      renderProducts();
      return;
    }

    if (button.dataset.action === "delete") {
      await saveProducts(products.filter((item) => item.id !== product.id));
      renderProducts();
      resetForm();
    }
  }

  document.addEventListener("DOMContentLoaded", async () => {
    await window.ProductDB.migrateLegacyProducts();

    document.getElementById("product-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
        await upsertProduct(await productFromForm());
        await renderProducts();
        resetForm();
      } catch (error) {
        setTranslationStatus(error.message || "商品資料不完整。");
      }
    });

    const resetButton = document.getElementById("reset-form");
    if (resetButton) {
      resetButton.addEventListener("click", resetForm);
    }
    document.getElementById("product-image-file").addEventListener("change", handleImageFile);
    window.addEventListener("resize", () => {
      if (imageCropper) {
        window.requestAnimationFrame(updateCroppedImage);
      }
    });
    document.getElementById("product-list").addEventListener("click", handleTableAction);
    renderProducts();
  });
})();
