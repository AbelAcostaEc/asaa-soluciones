// Funciones para navegación
function showSection(section) {
  document.getElementById("main-screen").classList.add("hidden-section");

  if (section === "tech") {
    document.getElementById("tech-products").classList.add("active-section");
    document
      .getElementById("kawaii-products")
      .classList.remove("active-section");
  } else {
    document.getElementById("kawaii-products").classList.add("active-section");
    document.getElementById("tech-products").classList.remove("active-section");
  }
}

function showMainScreen() {
  document.getElementById("main-screen").classList.remove("hidden-section");
  document.getElementById("tech-products").classList.remove("active-section");
  document.getElementById("kawaii-products").classList.remove("active-section");
}

// Función para comprar por WhatsApp
function buyOnWhatsApp(productName, price) {
  // Reemplaza con tu número de WhatsApp (en formato internacional sin +)
  const phoneNumber = "56912345678";

  // Mensaje predefinido
  const message = `¡Hola! Estoy interesado/a en comprar el producto: ${productName} por $${price.toLocaleString()}.`;

  // Crear el enlace de WhatsApp
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  // Abrir en una nueva pestaña
  window.open(whatsappURL, "_blank");
}

// Renderizado de productos tech
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM fully loaded and parsed");
  const techContainer = document.querySelector('#tech-products .products-grid');
  const kawaiiContainer = document.querySelector('#kawaii-products .products-grid');

  const products = await fetch("assets/products.json").then((res) => res.json());
const renderProducts = (products, container, categoryClass) => {
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card", categoryClass);

    // Si es un solo producto dejamos product.image como string, si es array lo usamos
    const images = Array.isArray(product.images) ? product.images : [product.image];

    // Generamos HTML de las imágenes
    const imageSlides = images.map((img, i) => `
      <img src="assets/img/products/${img}" alt="${product.name}" class="product-image ${i === 0 ? 'active' : ''}">
    `).join("");

    productCard.innerHTML = `
      <div class="product-images-container">
        ${imageSlides}
        ${images.length > 1 ? `
          <button class="prev-btn">&lt;</button>
          <button class="next-btn">&gt;</button>
        ` : ""}
      </div>
      <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <button class="whatsapp-btn" onclick="buyOnWhatsApp('${product.name}')">
              <i class="fab fa-whatsapp whatsapp-icon"></i> Comprar por WhatsApp
          </button>
      </div>
    `;

    container.appendChild(productCard);

    // Slider si hay más de una imagen
    if (images.length > 1) {
      const imgs = productCard.querySelectorAll(".product-image");
      let current = 0;
      const prevBtn = productCard.querySelector(".prev-btn");
      const nextBtn = productCard.querySelector(".next-btn");

      prevBtn.addEventListener("click", () => {
        imgs[current].classList.remove("active");
        current = (current - 1 + imgs.length) % imgs.length;
        imgs[current].classList.add("active");
      });

      nextBtn.addEventListener("click", () => {
        imgs[current].classList.remove("active");
        current = (current + 1) % imgs.length;
        imgs[current].classList.add("active");
      });
    }
  });
};


  // Renderizar tech
  renderProducts(products.filter((p) => p.category === "tech"), techContainer, "tech-product");

  // Renderizar kawaii
  renderProducts(products.filter((p) => p.category === "kawaii"), kawaiiContainer, "kawaii-product");
});
