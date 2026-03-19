const API = "/api";

/* ═══════════════════════════════════════
   ТОВАРЫ  — полный пример (GET, POST, DELETE)
   ═══════════════════════════════════════ */

const productList = document.getElementById("product-list");
const productForm = document.getElementById("product-form");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");

async function loadProducts() {
  try {
    const res = await fetch(`${API}/products/`);
    const data = await res.json();
    productList.innerHTML = "";

    data.forEach((p) => {
      const li = document.createElement("li");

      const name = document.createElement("span");
      name.textContent = p.name;

      const price = document.createElement("span");
      price.className = "price";
      price.textContent = `${p.price.toLocaleString("ru-RU")} ₽`;

      const btn = document.createElement("button");
      btn.textContent = "✕";
      btn.addEventListener("click", () => deleteProduct(p.id));

      li.append(name, price, btn);
      productList.append(li);
    });
  } catch (err) {
    productList.innerHTML = "<li style='color:red'>❌ Ошибка загрузки. Проверь, запущен ли сервер (uvicorn main:app --reload)</li>";
    console.error("loadProducts error:", err);
  }
}

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetch(`${API}/products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: productName.value.trim(),
      price: Number(productPrice.value),
    }),
  });
  productForm.reset();
  loadProducts();
});

async function deleteProduct(id) {
  await fetch(`${API}/products/${id}`, { method: "DELETE" });
  loadProducts();
}

/* ═══════════════════════════════════════
   КАТЕГОРИИ  — только GET (остальное — задание)
   ═══════════════════════════════════════ */

const categoryList = document.getElementById("category-list");

async function loadCategories() {
  try {
    const res = await fetch(`${API}/categories/`);
    const data = await res.json();
    categoryList.innerHTML = "";

    data.forEach((c) => {
      const li = document.createElement("li");
      li.textContent = c.name;
      // ЗАДАНИЕ: добавь кнопку «✕» для удаления категории
      categoryList.append(li);
    });
  } catch (err) {
    categoryList.innerHTML = "<li style='color:red'>❌ Ошибка загрузки категорий</li>";
    console.error("loadCategories error:", err);
  }
}

// ══════════════════════════════════════════════════════════════
// ЗАДАНИЕ:
// 1. Раскомментируй форму в index.html
// 2. Получи элементы формы (getElementById)
// 3. Повесь обработчик submit → отправь POST на /api/categories/
// 4. Добавь кнопку удаления в loadCategories → отправь DELETE
// 5. Не забудь дописать POST и DELETE в backend/routers/categories.py
// ══════════════════════════════════════════════════════════════

/* ── Загрузка при старте ── */
loadProducts();
loadCategories();
