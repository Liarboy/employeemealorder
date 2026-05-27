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
  const cropState = {
    image: null,
    crop: null,
    dragging: false,
    dragOffsetX: 0,
    dragOffsetY: 0,
    pointerId: null
  };

  const getProducts = () => window.ProductDB.getProducts();
  const saveProducts = (products) => window.ProductDB.saveProducts(products);

  function fieldValue(id) {
    return document.getElementById(id).value.trim();
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

  function productFromForm() {
    const diets = selectedDiets();
    return {
      id: fieldValue("product-id") || `product-${Date.now()}`,
      name: fieldValue("product-name"),
      description: fieldValue("product-description"),
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
    document.getElementById("product-image-data").value = "";
    document.getElementById("upload-file-name").textContent = "尚未選取圖片";
    document.getElementById("image-cropper").hidden = true;
    document.getElementById("crop-image").removeAttribute("src");
    document.getElementById("image-preview").hidden = true;
    document.getElementById("image-preview").style.backgroundImage = "";
    cropState.image = null;
    cropState.crop = null;
    document.getElementById("admin-site-a").checked = true;
    document.getElementById("admin-lunch").checked = true;
    document.querySelector('input[name="diet"][value="diet-normal"]').checked = true;
    document.getElementById("product-active").checked = true;
    document.getElementById("form-mode").textContent = "新增";
  }

  function fillForm(product) {
    document.getElementById("product-id").value = product.id;
    document.getElementById("product-name").value = product.name;
    document.getElementById("product-price").value = product.price;
    document.getElementById("product-calories").value = product.calories;
    document.getElementById("product-tag").value = product.tag;
    document.getElementById("product-description").value = product.description;
    document.getElementById("product-image-data").value = product.image === fallbackImage ? "" : product.image;
    document.getElementById("upload-file-name").textContent = product.image === fallbackImage ? "尚未選取圖片" : "已載入既有圖片";
    document.getElementById("image-cropper").hidden = true;
    document.getElementById("crop-image").removeAttribute("src");
    document.getElementById("image-preview").hidden = product.image === fallbackImage;
    document.getElementById("image-preview").style.backgroundImage = product.image === fallbackImage ? "" : `url("${product.image}")`;
    document.querySelector(`input[name="site"][value="${product.site}"]`).checked = true;
    document.querySelector(`input[name="meal"][value="${product.meal}"]`).checked = true;
    setDiets(product.diets || []);
    document.getElementById("product-active").checked = product.active;
    document.getElementById("product-featured").checked = product.featured;
    document.getElementById("form-mode").textContent = "編輯";
    document.getElementById("product-name").focus();
  }

  function displayedImageRect() {
    const stageRect = document.getElementById("crop-stage").getBoundingClientRect();
    const imageRect = document.getElementById("crop-image").getBoundingClientRect();
    return {
      left: imageRect.left - stageRect.left,
      top: imageRect.top - stageRect.top,
      width: imageRect.width,
      height: imageRect.height
    };
  }

  function constrainCrop(crop) {
    const imageRect = displayedImageRect();
    const maxX = imageRect.left + imageRect.width - crop.width;
    const maxY = imageRect.top + imageRect.height - crop.height;
    return {
      x: Math.min(Math.max(crop.x, imageRect.left), maxX),
      y: Math.min(Math.max(crop.y, imageRect.top), maxY),
      width: crop.width,
      height: crop.height
    };
  }

  function updateCropBox() {
    if (!cropState.crop) {
      return;
    }

    const cropBox = document.getElementById("crop-box");
    cropBox.style.left = `${cropState.crop.x}px`;
    cropBox.style.top = `${cropState.crop.y}px`;
    cropBox.style.width = `${cropState.crop.width}px`;
    cropBox.style.height = `${cropState.crop.height}px`;
  }

  function updateCroppedImage() {
    if (!cropState.image || !cropState.crop) {
      return;
    }

    const imageRect = displayedImageRect();
    const scaleX = cropState.image.naturalWidth / imageRect.width;
    const scaleY = cropState.image.naturalHeight / imageRect.height;
    const sourceX = (cropState.crop.x - imageRect.left) * scaleX;
    const sourceY = (cropState.crop.y - imageRect.top) * scaleY;
    const sourceWidth = cropState.crop.width * scaleX;
    const sourceHeight = cropState.crop.height * scaleY;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = cropOutputWidth;
    canvas.height = cropOutputHeight;
    context.drawImage(cropState.image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);

    const croppedImage = canvas.toDataURL("image/jpeg", 0.9);
    document.getElementById("product-image-data").value = croppedImage;
    document.getElementById("image-preview").hidden = false;
    document.getElementById("image-preview").style.backgroundImage = `url("${croppedImage}")`;
  }

  function initializeCrop() {
    const imageRect = displayedImageRect();
    let width = imageRect.width * 0.82;
    let height = width / cropAspectRatio;
    if (height > imageRect.height * 0.82) {
      height = imageRect.height * 0.82;
      width = height * cropAspectRatio;
    }

    cropState.crop = {
      x: imageRect.left + (imageRect.width - width) / 2,
      y: imageRect.top + (imageRect.height - height) / 2,
      width,
      height
    };
    updateCropBox();
    updateCroppedImage();
  }

  function handleCropDragStart(event) {
    if (!cropState.crop) {
      return;
    }

    const stageRect = document.getElementById("crop-stage").getBoundingClientRect();
    const cropBox = document.getElementById("crop-box").getBoundingClientRect();
    const isInsideCropBox = event.clientX >= cropBox.left &&
      event.clientX <= cropBox.right &&
      event.clientY >= cropBox.top &&
      event.clientY <= cropBox.bottom;

    cropState.dragging = true;
    cropState.pointerId = event.pointerId;
    cropState.dragOffsetX = isInsideCropBox ? event.clientX - stageRect.left - cropState.crop.x : cropState.crop.width / 2;
    cropState.dragOffsetY = isInsideCropBox ? event.clientY - stageRect.top - cropState.crop.y : cropState.crop.height / 2;
    document.getElementById("crop-stage").setPointerCapture(event.pointerId);
    handleCropDrag(event);
    event.preventDefault();
  }

  function handleCropDrag(event) {
    if (!cropState.dragging || !cropState.crop) {
      return;
    }

    const stageRect = document.getElementById("crop-stage").getBoundingClientRect();
    cropState.crop = constrainCrop({
      x: event.clientX - stageRect.left - cropState.dragOffsetX,
      y: event.clientY - stageRect.top - cropState.dragOffsetY,
      width: cropState.crop.width,
      height: cropState.crop.height
    });
    updateCropBox();
    updateCroppedImage();
  }

  function handleCropDragEnd() {
    if (cropState.pointerId !== null) {
      const stage = document.getElementById("crop-stage");
      if (stage.hasPointerCapture(cropState.pointerId)) {
        stage.releasePointerCapture(cropState.pointerId);
      }
    }
    cropState.dragging = false;
    cropState.pointerId = null;
  }

  function handleImageFile(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const cropImage = document.getElementById("crop-image");
      document.getElementById("upload-file-name").textContent = file.name;
      document.getElementById("image-cropper").hidden = false;
      cropImage.addEventListener("load", () => {
        cropState.image = cropImage;
        initializeCrop();
      }, { once: true });
      cropImage.src = reader.result;
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
      productSummary.className = "admin-product-summary";
      thumbnail.className = "admin-product-thumb";
      thumbnail.src = product.image || fallbackImage;
      thumbnail.alt = product.name;
      name.textContent = product.name;
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
      await upsertProduct(productFromForm());
      await renderProducts();
      resetForm();
    });

    document.getElementById("reset-form").addEventListener("click", resetForm);
    document.getElementById("product-image-file").addEventListener("change", handleImageFile);
    document.getElementById("crop-stage").addEventListener("pointerdown", handleCropDragStart);
    document.getElementById("crop-stage").addEventListener("pointermove", handleCropDrag);
    document.getElementById("crop-stage").addEventListener("pointerup", handleCropDragEnd);
    document.getElementById("crop-stage").addEventListener("pointercancel", handleCropDragEnd);
    window.addEventListener("resize", () => {
      if (cropState.image && !document.getElementById("image-cropper").hidden) {
        initializeCrop();
      }
    });
    document.getElementById("product-list").addEventListener("click", handleTableAction);
    renderProducts();
  });
})();
