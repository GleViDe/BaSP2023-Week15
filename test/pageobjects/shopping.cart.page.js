class CartPage {
    get cartItems() {
        return $('#cart_contents_container > div > div.cart_list').$$('.cart_item');
    }

    get backToShopping() {
        return $('#continue-shopping');
    }

    get checkout() {
        return $('#checkout');
    }
}

export default new CartPage();