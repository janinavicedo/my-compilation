let cart = [];

let products = {
    'Cargo Jeans': { price: 2500, stock: 15 },
    'Baggy Jeans': { price: 3000, stock: 15 },
    'Flared Jeans': { price: 3700, stock: 15 },
    'Ripped Jeans': { price: 2000, stock: 15 },
    'DEGRADED Crew Neck Tee': { price: 500, stock: 15 },
    'Buzzer Beater Paisley Tee': { price: 650, stock: 15 },
    'SNUG boxy fit shirt': { price: 600, stock: 15 },
    'MYX Beyond Culture shirt': { price: 580, stock: 15 },
    'Katy Perry Meow': { price: 5500, stock: 15 },
    'Versace Eros Flame': { price: 8000, stock: 15 },
    'Giorgio Armani Acqua di Gio': { price: 7500, stock: 15 },
    'Le Labo Another 13': { price: 9500, stock: 15 },
    'INSPI Muscle Tee': { price: 700, stock: 15 },
    'ZARA Racerback Tank Top': { price: 300, stock: 15 },
    'Adidas Terrex Xperior Singlet': { price: 1200, stock: 15 },
    'Under Armour Breeze Tank': { price: 900, stock: 15 },
    'Quick Push Pop It': { price: 600, stock: 15 },
    'Teddy Bear': { price: 1000, stock: 15 },
    'Remote Control Car': { price: 1300, stock: 15 },
    'Kuromi Plushie': { price: 950, stock: 15 }
};

function initializeProducts() {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(products));
    } else {
        products = JSON.parse(localStorage.getItem('products'));
    }
}

initializeProducts();

function addToCart(itemName) {
    const quantitySpan = document.getElementById(`quantity-${itemName.replace(/\s/g, '')}`);
    let quantity = parseInt(quantitySpan.textContent);

    if (quantity > products[itemName].stock) {
        alert("Sorry, this item is out of stock.");
        return;
    }

    products[itemName].stock -= quantity;
    localStorage.setItem('products', JSON.stringify(products));
    cart.push({ name: itemName, price: products[itemName].price, quantity: quantity });

    updateStockDisplay(itemName);

    const remainingStock = products[itemName].stock;
    const remainingStockSpan = document.getElementById(`remaining-stock-${itemName.replace(/\s/g, '')}`);
    remainingStockSpan.textContent = remainingStock; // Update the remaining stock displayed in the store

    if (remainingStock === 0) {
        const addToCartButton = document.querySelector(`.product.${itemName.replace(/\s/g, '')} button`);
        addToCartButton.disabled = true;
    }
	quantitySpan.textContent = 1;

    displayCart();
}

function updateStockDisplay(itemName) {
    const stockSpan = document.getElementById(`remaining-stock-${itemName.replace(/\s/g, '')}`);
    stockSpan.textContent = products[itemName].stock;
}


function incrementQuantity(itemName) {
    const quantitySpan = document.getElementById(`quantity-${itemName.replace(/\s/g, '')}`);
    let quantity = parseInt(quantitySpan.textContent);

    if (quantity < products[itemName].stock) {
        quantity++;
        quantitySpan.textContent = quantity;
    }
}

function decrementQuantity(itemName) {
    const quantitySpan = document.getElementById(`quantity-${itemName.replace(/\s/g, '')}`);
    let quantity = parseInt(quantitySpan.textContent);

    if (quantity > 1) {
        quantity--;
        quantitySpan.textContent = quantity;
    }
}

function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerText = `${item.name} x${item.quantity} - $${itemTotal}`;
        cartItemsDiv.appendChild(cartItem);
    });

    document.getElementById('cart-total').innerText = total.toFixed(2);
}



function displayCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  cartItemsDiv.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity; 
    total += itemTotal; 
	const formattedItemTotal = itemTotal.toLocaleString();
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerText = `${item.name} x${item.quantity} - PHP ${formattedItemTotal}`;
    cartItemsDiv.appendChild(cartItem);
  });
  const formattedTotal = total.toLocaleString();
  document.getElementById('cart-total').innerText = formattedTotal;
}


    function filterProducts(category) {
      const products = document.querySelectorAll('.product');
      products.forEach(product => {
        if (product.classList.contains(category.toLowerCase())) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    }

    function showAllProducts() {
      const products = document.querySelectorAll('.product');
      products.forEach(product => {
        product.style.display = 'block';
      });
    }
	
	function generateNewOrder() {
    cart = [];
    displayCart();

    alert("Preparation for your order is in progress!");
}

function applyDiscount() {
  let discount = 0;
  if (document.getElementById('senior').checked) {
    discount = 0.20;
  } else if (document.getElementById('pwd').checked) {
    discount = 0.30;
  } else if (document.getElementById('student').checked) {
    discount = 0.10;
  }

  let total = cart.reduce((sum, item) => sum + (products[item.name].price * item.quantity), 0);
  let discountedTotal = total - (total * discount);
  
  document.getElementById('cart-total').innerText = discountedTotal.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function goToStockRoom() {
    window.location.href = 'stockroom.html';
}



function addStockFromStockRoom(itemName) {
    const stockInput = document.getElementById(`add-stock-${itemName.replace(/\s/g, '')}`);
    let addedStock = parseInt(stockInput.value);

    if (isNaN(addedStock) || addedStock <= 0) {
        alert("Please enter a valid stock amount.");
        return;
    }

    products[itemName].stock += addedStock;
    localStorage.setItem('products', JSON.stringify(products));
    updateStockRoomDisplay(itemName);
}

function updateStockRoomDisplay(itemName) {
    const stockTd = document.getElementById(`stock-${itemName.replace(/\s/g, '')}`);
    stockTd.textContent = products[itemName].stock;
}

 document.addEventListener('DOMContentLoaded', (event) => {
        initializeProducts();
        for (let itemName in products) {
            updateStockDisplay(itemName);
        }
    });
	
document.addEventListener('DOMContentLoaded', (event) => {
        initializeProducts();
        for (let itemName in products) {
            updateStockRoomDisplay(itemName);
        }
    });

