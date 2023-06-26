class InvElementPage {
    get elemtImg() {
        return $('#inventory_item_container > div > div > div.inventory_details_img_container > img');
    }

    get backToProdBtn() {
        return $('#back-to-products');
    }

    get addToCart() {
        return $('button=Add to cart');
    }

    get removeOfCart() {
        return $('button=Remove');
    }
}

export default new InvElementPage();