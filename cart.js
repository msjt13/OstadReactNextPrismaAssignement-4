const cartItems = getCartItemsFromStorage() || [];

function addToCart(product, ...quantities) {
    quantities.forEach((quantity) => {
        const existingCartItem = cartItems.find((item) => item.product.id === product.id);

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
        } else {
            const cartItem = {
                product,
                quantity,
            };

            cartItems.push(cartItem);
        }
    });

    saveCartItemsToStorage();
}

function removeCartItem(index) {
    cartItems.splice(index, 1);
    saveCartItemsToStorage();
}

function updateCartItemQuantity(index, quantity) {
    cartItems[index].quantity = quantity;
    saveCartItemsToStorage();
}

function clearCart() {
    cartItems.length = 0;
    saveCartItemsToStorage();
}

function saveCartItemsToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function getCartItemsFromStorage() {
    const storedItems = localStorage.getItem('cartItems');
    return JSON.parse(storedItems);
}

export { cartItems, addToCart, clearCart, removeCartItem, updateCartItemQuantity };
