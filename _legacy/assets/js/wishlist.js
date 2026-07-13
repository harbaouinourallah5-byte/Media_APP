// ======================================
// MEDINA BEAUTY
// WISHLIST SYSTEM (localStorage)
// Allows adding/removing wishlist items and sending wishlist -> cart.
// ======================================

const WISHLIST_STORAGE_KEY = "wishlist";

function readWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeWishlist(items) {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
}

function normalizeId(id) {
  return Number(id);
}

function isInWishlist(id) {
  const items = readWishlist();
  return items.some((x) => Number(x.id) === Number(id));
}

function addToWishlist(productId) {
  const id = normalizeId(productId);
  if (!Number.isFinite(id)) return;

  const items = readWishlist();
  const existing = items.find((x) => Number(x.id) === id);

  if (!existing) {
    items.push({ id });
    writeWishlist(items);
  }

  renderWishlistCount();
}

function removeFromWishlist(productId) {
  const id = normalizeId(productId);
  const items = readWishlist().filter((x) => Number(x.id) !== id);
  writeWishlist(items);
  renderWishlistCount();
}

function renderWishlistCount() {
  const badge = document.getElementById("wishlistCount");
  if (!badge) return;
  const items = readWishlist();
  badge.textContent = String(items.length);
}

function wishlistToCart() {
  // Uses cart.js global window.addToCart
  if (typeof window.addToCart !== "function") return;

  const items = readWishlist();
  items.forEach((it) => window.addToCart(it.id, 1));

  // optional: clear wishlist after sending
  // writeWishlist([]);
  renderWishlistCount();
}

// Helper for inline HTML handlers
window.addToWishlist = (productId) => addToWishlist(productId);
window.removeFromWishlist = (productId) => removeFromWishlist(productId);
window.moveWishlistToCart = () => {
  wishlistToCart();
  // If wishlist page has an overlay/message, show it
  const el = document.getElementById("wishlistToast");
  if (el) {
    el.style.display = "block";
    setTimeout(() => (el.style.display = "none"), 2000);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderWishlistCount();
});

