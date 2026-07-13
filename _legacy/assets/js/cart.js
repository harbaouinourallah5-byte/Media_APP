// ======================================
// MEDINA BEAUTY
// CART SYSTEM (localStorage)
// Allows adding multiple products and quantities.
// ======================================

const CART_STORAGE_KEY = "cart";

function readCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

function getProductById(id) {
  return id;
}

export function addToCart(productId, quantityToAdd = 1) {
  const id = Number(productId);
  const qty = Math.max(1, Number(quantityToAdd) || 1);

  const items = readCart();
  const existing = items.find((x) => Number(x.id) === id);

  if (existing) {
    existing.quantity = (Number(existing.quantity) || 1) + qty;
  } else {
    items.push({ id, quantity: qty });
  }

  writeCart(items);
}

export function getCartItems() {
  return readCart();
}

export function clearCart() {
  writeCart([]);
}

// Helper used by inline HTML handlers (no modules)
window.addToCart = (productId, quantityToAdd = 1) => {
  addToCart(productId, quantityToAdd);
};

window.getCart = () => getCartItems();

// Update cart count badge if exists
function updateCartBadge() {
  const badge = document.getElementById("cartCount");
  if (!badge) return;

  const items = readCart();
  const totalQty = items.reduce((sum, it) => sum + (Number(it.quantity) || 0), 0);
  badge.textContent = String(totalQty);
}

document.addEventListener("DOMContentLoaded", updateCartBadge);

