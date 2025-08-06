// گرفتن المنت های html 
const itemInput = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const itemList = document.getElementById("itemList");
const clearAllBtn = document.getElementById("clearAllBtn");
const totalItems = document.getElementById("totalItems");

// آرایه‌ای برای ذخیره‌ی آیتم‌ها
let items = [];

// اضافه کردن آیتم جدید
addBtn.addEventListener("click", function () {
  const text = itemInput.value.trim();

  // اگر ورودی خالی بود، کاری نکن
  if (text === "") return;

  // ایجاد شیء آیتم جدید
  const newItem = {
    id: Date.now(), // شناسه‌ی یکتا
    name: text,
    checked: false
  };

  // اضافه کردن آیتم به آرایه
  items.push(newItem);

  // ریست کردن ورودی
  itemInput.value = "";

  // به‌روزرسانی نمایش
  renderItems();
});

// حذف همه‌ی آیتم‌ها
clearAllBtn.addEventListener("click", () => {
  items = [];
  renderItems();
});

// تابع برای ساختن و نمایش لیست آیتم‌ها
function renderItems() {
  // پاک کردن لیست قبلی
  itemList.innerHTML = "";

  // ساختن دوباره‌ی آیتم‌ها
  items.forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    // اگر آیتم تیک خورده بود، کلاس خاص اضافه کن
    if (item.checked) {
      li.classList.add("checked");
    }

    li.textContent = item.name;

    // دکمه حذف
    const delBtn = document.createElement("button");
    delBtn.className = "btn btn-sm btn-outline-danger";
    delBtn.textContent = "🗑";

    // جلوگیری از کلیک روی آیتم هنگام حذف
    delBtn.onclick = (e) => {
      e.stopPropagation();
      items = items.filter(i => i.id !== item.id);
      renderItems();
    };

    // تیک زدن با کلیک روی آیتم
    li.addEventListener("click", () => {
      item.checked = !item.checked;
      renderItems();
    });

    li.appendChild(delBtn);
    itemList.appendChild(li);
  });

  // نمایش تعداد آیتم‌ها
  totalItems.textContent = `Total: ${items.length} items`;
}