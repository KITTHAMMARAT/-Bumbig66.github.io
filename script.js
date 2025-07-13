const products = Array.from({length: 50}, (_, i) => ({
    id: i + 1,
    name: `สินค้า ${i + 1}`,
    price: 100 + (i * 10),
    img: [
        "image.1.png",
        "image.2.png.png",
        "image.3.png",
        "image.4.png",
        "image.5.png"
        "image.6.png"
    ][i % 6]
}));

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart') || "[]");
    const product = products.find(p => p.id === id);
    const idx = cart.findIndex(item => item.id === id);
    if (idx > -1) {
        cart[idx].qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showToast(`${product.name} ถูกหยิบใส่ตะกร้าแล้ว`);
    setTimeout(()=>window.location.href="cart.html",700);
}

function renderProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) return;
    productList.innerHTML = "";
    products.forEach(product => {
        const prod = document.createElement('div');
        prod.className = 'product';
        prod.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} บาท</p>
            <button class="action-btn" onclick="addToCart(${product.id})">หยิบใส่ตะกร้า</button>
        `;
        productList.appendChild(prod);
    });
}

function showToast(text) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.style.display = 'block';
    setTimeout(() => {toast.style.display='none';}, 2300);
}

document.addEventListener("DOMContentLoaded", renderProducts);
window.addToCart = addToCart;
