document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }));
  }

  const filters = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".menu-item");
  const search = document.querySelector("#menu-search");
  let category = "all";
  function filterMenu() {
    const query = (search?.value || "").trim().toLocaleLowerCase("vi");
    let shown = 0;
    items.forEach(item => {
      const categoryMatch = category === "all" || item.dataset.category === category;
      const textMatch = (item.dataset.name || item.textContent).toLocaleLowerCase("vi").includes(query);
      const visible = categoryMatch && textMatch;
      item.hidden = !visible;
      if (visible) shown++;
    });
    const empty = document.querySelector("#empty-results");
    if (empty) empty.hidden = shown !== 0;
  }
  filters.forEach(button => button.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    category = button.dataset.filter;
    filterMenu();
  }));
  if (search) search.addEventListener("input", filterMenu);

  const notice = document.querySelector("#order-notice");
  const selectedItems = [];
  document.querySelectorAll(".add-order").forEach(button => button.addEventListener("click", () => {
    selectedItems.push(button.dataset.item);
    if (notice) notice.textContent = `Bạn đã chọn ${selectedItems.length} món: ${selectedItems.join(", ")}. Hãy sang trang Liên hệ để gửi yêu cầu đặt món.`;
  }));

  const orderForm = document.querySelector("#order-form");
  if (orderForm) orderForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(orderForm);
    const name = String(data.get("name") || "").trim();
    const drink = String(data.get("drink") || "");
    const message = document.querySelector("#order-message");
    if (message) message.textContent = `Cảm ơn ${name}! Yêu cầu về "${drink}" đã được ghi nhận trên bản demo. Website hiện chưa gửi dữ liệu đến máy chủ.`;
    orderForm.reset();
  });

  const newsletter = document.querySelector("#newsletter-form");
  if (newsletter) newsletter.addEventListener("submit", event => {
    event.preventDefault();
    const message = newsletter.querySelector(".form-message");
    if (message) message.textContent = "Cảm ơn bạn! Đây là xác nhận demo, email chưa được lưu vào hệ thống.";
    newsletter.reset();
  });
});