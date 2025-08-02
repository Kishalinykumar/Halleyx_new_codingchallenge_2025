document.addEventListener("DOMContentLoaded", () => {
  console.log("Checkout page loaded");

  const form = document.getElementById("checkoutForm");
  if (!form) {
    console.error("Checkout form not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const address = document.getElementById("address")?.value.trim();
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const token = localStorage.getItem("token");

    console.log("Address:", address);
    console.log("Cart Items:", cartItems);

    if (!address || cartItems.length === 0) {
      alert("Please enter address and make sure your cart is not empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5005/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems,
          total: cartItems.reduce((sum, item) => sum + item.price, 0),
          address,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        window.location.href = "order-success.html";
      } else {
        console.error(data.message);
        alert("Error placing order: " + data.message);
      }
    } catch (error) {
      console.error;
      alert("Something went wrong.");
    }
  });
});

// scripts/checkout.js
const placeOrder = async () => {
  const token = localStorage.getItem('token');
  const total = document.getElementById('totalAmount').textContent;
  const cartRes = await fetch('/api/cart', { headers: { Authorization: `Bearer ${token}` } });
  const cart = await cartRes.json();

  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ items: cart.items, total })
  });

  if (res.ok) {
    alert('Order placed successfully');
    window.location.href = '/order-history.html';
  } else {
    alert('Error placing order');
  }
};
