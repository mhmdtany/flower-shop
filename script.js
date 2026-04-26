// ================= MENU =================
function toggleMenu() {
  let menu = document.getElementById("menu");
  if (menu) {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }
}

// ================= NAVIGATION =================
window.loadPage = function(page) {
  let frame = document.getElementById("frame");
  if (frame) frame.src = page;

  let menu = document.getElementById("menu");
  if (menu) menu.style.display = "none";
};

// ================= CART =================
window.addToCart = function(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
};

window.removeItem = function(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
};

// عرض السلة
if (document.getElementById("cart")) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  const data = {
    Rose: { img: "photo/images.webp" },
    Tulip: { img: "photo/download.jpg" }
  };

  let container = document.getElementById("cart");

  cart.forEach((item, index) => {
    total += item.price;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${data[item.name]?.img || ''}">
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p class="cart-price">$${item.price}</p>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: $" + total;
}

// ================= DETAILS =================
if (document.getElementById("details")) {
  const params = new URLSearchParams(window.location.search);
  const flower = params.get("flower");

  const data = {
    Tulip: {
      price: 50,
      desc: "Blue tulip is a rare and beautiful flower.",
      images: [
        "photo/photo_2026-04-26_22-00-47.jpg",
        "photo/photo_first.jpg",
        "photo/photo_lol.jpg"
      ]
    },
    Rose: {
      price: 15,
      desc: "Rose flower symbolizes love.",
      images: [
        "photo/images.webp",
        "photo/download.jpg"
      ]
    }
  };

  let current = 0;
  const images = data[flower].images;

  function showImage(index) {
    document.getElementById("slider-img").src = images[index];
  }

  window.nextImg = function() {
    current = (current + 1) % images.length;
    showImage(current);
  };

  window.prevImg = function() {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  };

  document.getElementById("details").innerHTML = `
    <h1>${flower}</h1>

    <div class="slider">
      <span class="arrow left" onclick="prevImg()">&#10094;</span>
      <img id="slider-img" src="${images[0]}">
      <span class="arrow right" onclick="nextImg()">&#10095;</span>
    </div>

    <p>${data[flower].desc}</p>

    <button onclick="parent.addToCart('${flower}', ${data[flower].price})">
      Add to Cart
    </button>
  `;
}

