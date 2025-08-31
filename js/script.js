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
  const techContainer = document.querySelector('#tech-products .products-grid');
  const kawaiiContainer = document.querySelector('#kawaii-products .products-grid');

  const products = await fetch("assets/products.json").then((res) => res.json());

  // Función para renderizar productos en su contenedor
  const renderProducts = (products, container, categoryClass) => {
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card", categoryClass);
      productCard.innerHTML = `
        <img src="assets/img/products/${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <button class="whatsapp-btn" onclick="buyOnWhatsApp('${product.name}')">
                <i class="fab fa-whatsapp whatsapp-icon"></i> Comprar por WhatsApp
            </button>
        </div>
      `;
      container.appendChild(productCard);
    });
  };

  // Renderizar tech
  renderProducts(products.filter((p) => p.category === "tech"), techContainer, "tech-product");

  // Renderizar kawaii
  renderProducts(products.filter((p) => p.category === "kawaii"), kawaiiContainer, "kawaii-product");
});
