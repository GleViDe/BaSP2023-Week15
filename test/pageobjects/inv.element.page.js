class InvElementPage {
    get elemtImg() {
        return $('#inventory_item_container > div > div > div.inventory_details_img_container > img');
    }

    get backToProdBtn() {
        return $('#back-to-products');
    }

    get addToCart() {
        return $('#add-to-cart-sauce-labs-fleece-jacket');
    }
}

export default new InvElementPage();