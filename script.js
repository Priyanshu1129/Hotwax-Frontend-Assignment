// Handle Registration
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Enter a valid email.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Get users array from localStorage or initialize
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      alert("Email is already registered.");
      return;
    }

    // Add new user
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    window.location.href = "login.html";
  });
}

// Handle Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document
      .getElementById("loginEmail")
      .value.trim()
      .toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      alert("Invalid email or password.");
      return;
    }

    // Save current user to session/localStorage
    localStorage.setItem("currentUser", JSON.stringify(matchedUser));

    alert("Login successful!");
    window.location.href = "index.html";
  });
}

// Logout function
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// handle products
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
let allProducts = [];

async function loadProducts() {
  const spinner = document.getElementById("loadingSpinner");
  spinner.style.display = "block";

  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    allProducts = products;
    renderCategories(products);
    displayProducts(products);
  } catch (err) {
    productList.innerHTML = "<p>Failed to load products.</p>";
  } finally {
    spinner.style.display = "none";
  }
}

// Render products
function displayProducts(products) {
  productList.innerHTML = "";

  products.forEach((product) => {
    const item = document.createElement("div");
    item.className = "product-card";
    item.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p><strong>$${product.price}</strong></p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(item);
  });
}

function addToCart(productId) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("Please login to add items to your cart.");
    window.location.href = "login.html";
    return;
  }

  const product = allProducts.find((p) => p.id === productId);
  const userEmail = currentUser.email;

  // Get all carts or initialize
  let allCarts = JSON.parse(localStorage.getItem("carts")) || {};

  // Get this user's cart or initialize
  let cart = allCarts[userEmail] || [];

  // Check for existing item
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  // Update user's cart and save back
  allCarts[userEmail] = cart;
  localStorage.setItem("carts", JSON.stringify(allCarts));

  alert("Added to cart!");
}

// Render categories
function renderCategories(products) {
  const categories = ["all", ...new Set(products.map((p) => p.category))];
  categoryFilter.innerHTML = categories
    .map((cat) => `<option value="${cat}">${cat}</option>`)
    .join("");
}

// Filter & Search Logic
searchInput.addEventListener("input", () => applyFilters());
categoryFilter.addEventListener("change", () => applyFilters());

function applyFilters() {
  const keyword = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  let filtered = allProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(keyword) &&
      (category === "all" || p.category === category)
  );

  displayProducts(filtered);
}

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  alert("Please login first.");
  window.location.href = "login.html";
} else {
  loadProducts(); // Only load if user is authenticated
}

loadProducts();
