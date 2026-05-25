(function () {
  const storageKey = "meal-order-review-MO-20260507-112913";
  const form = document.querySelector(".rating-form");

  if (!form) {
    return;
  }

  const status = form.querySelector(".rating-header strong");
  const message = form.querySelector(".rating-message");
  const textarea = form.querySelector("textarea");
  const submitButton = form.querySelector(".rating-submit");

  function isEnglish() {
    return document.documentElement.lang === "en";
  }

  function text(zh, en) {
    return isEnglish() ? en : zh;
  }

  function showMessage(zh, en) {
    if (message) {
      message.textContent = text(zh, en);
    }
  }

  function markSubmitted() {
    if (status) {
      status.textContent = text("已送出評價", "Review Submitted");
    }
    if (submitButton) {
      submitButton.textContent = text("更新評價", "Update Review");
    }
  }

  function restoreReview() {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (!saved) {
      return;
    }

    const selected = form.querySelector(`input[value="${saved.rating}"]`);
    if (selected) {
      selected.checked = true;
    }
    if (textarea) {
      textarea.value = saved.note || "";
    }
    markSubmitted();
    showMessage("已儲存你的評價。", "Your review has been saved.");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  submitButton.addEventListener("click", () => {
    const selected = form.querySelector("input[name='order-rating-20260507']:checked");
    if (!selected) {
      showMessage("請先選擇評分星等。", "Please choose a rating first.");
      return;
    }

    localStorage.setItem(storageKey, JSON.stringify({
      rating: selected.value,
      note: textarea ? textarea.value.trim() : "",
      submittedAt: new Date().toISOString()
    }));

    markSubmitted();
    showMessage("已儲存你的評價。", "Your review has been saved.");
  });

  document.querySelectorAll(".language-switch a").forEach((link) => {
    link.addEventListener("click", () => {
      window.setTimeout(restoreReview, 0);
    });
  });

  restoreReview();
})();
