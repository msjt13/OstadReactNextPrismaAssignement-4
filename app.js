import products from './product.js';
import { cartItems, addToCart, clearCart, removeCartItem, updateCartItemQuantity } from './cart.js';

const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartButton = document.getElementById('clear-cart');

// Display products
function displayProducts() {
    const productContainer = document.getElementById('product-list');
    console.log('products', products);

    products.forEach((product, index) => {
        const row = document.createElement('tr');

        const serialCell = document.createElement('td');
        serialCell.textContent = index + 1;
        row.appendChild(serialCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = `${product.price} Tk.`;
        row.appendChild(priceCell);

        const addToCartCell = document.createElement('td');
        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('btn', 'btn-dark', 'add-to-cart');
        addToCartButton.innerHTML = '<i class="bi bi-cart-plus"></i> Add to cart';
        // addToCartButton.textContent = 'Add to Cart';
        addToCartButton.addEventListener('click', () => {
            const quantity = 1;
            addToCart(product, quantity);
            displayCartItems();
        });
        addToCartCell.appendChild(addToCartButton);
        row.appendChild(addToCartCell);

        productContainer.appendChild(row);
    });
}

// Display cart items
function displayCartItems() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cartItems.forEach((cartItem, index) => {
        const { product, quantity } = cartItem;
        const itemTotal = product.price * quantity;
        total += itemTotal;

        const row = document.createElement('tr');

        const serialCell = document.createElement('td');
        serialCell.textContent = index + 1;
        row.appendChild(serialCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        const quantityCell = document.createElement('td');
        quantityCell.classList.add('text-nowrap');

        const decreaseButton = document.createElement('button');
        decreaseButton.classList.add('btn', 'btn-secondary', 'btn-sm', 'decrease-quantity');
        decreaseButton.textContent = '-';
        decreaseButton.addEventListener('click', () => {
            if (quantity > 1) {
                updateCartItemQuantity(index, quantity - 1);
                displayCartItems();
            }
        });
        decreaseButton.disabled = quantity <= 1;
        quantityCell.appendChild(decreaseButton);

        const quantityText = document.createElement('span');
        quantityText.classList.add('mx-2', 'fs-5');
        quantityText.textContent = quantity;
        quantityCell.appendChild(quantityText);

        const increaseButton = document.createElement('button');
        increaseButton.classList.add('btn', 'btn-secondary', 'btn-sm', 'increase-quantity');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', () => {
            updateCartItemQuantity(index, quantity + 1);
            displayCartItems();
        });
        quantityCell.appendChild(increaseButton);

        row.appendChild(quantityCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = `${product.price} Tk.`;
        row.appendChild(priceCell);

        const itemTotalCell = document.createElement('td');
        itemTotalCell.textContent = `${itemTotal} Tk.`;
        row.appendChild(itemTotalCell);

        const removeFromCartCell = document.createElement('td');
        const removeFromCartButton = document.createElement('button');
        removeFromCartButton.classList.add('btn', 'btn-danger', 'btn-sm', 'remove-from-cart');
        removeFromCartButton.innerHTML = '<i class="bi bi-trash"></i>';
        // removeFromCartButton.textContent = 'Remove';
        removeFromCartButton.addEventListener('click', () => {
            removeCartItem(index);
            displayCartItems();
        });
        removeFromCartCell.appendChild(removeFromCartButton);
        row.appendChild(removeFromCartCell);

        cartItemsContainer.appendChild(row);
    });

    cartTotal.textContent = `${total} Tk.`;

    if (cartItems.length > 0) {
        clearCartButton.style.display = 'block';
    } else {
        clearCartButton.style.display = 'none';
    }
}

// Clear the cart
function clearCartHandler() {
    clearCart();
    displayCartItems();
}

// Initialize the application
function init() {
    displayProducts();
    displayCartItems();
    clearCartButton.addEventListener('click', clearCartHandler);
}

init();
