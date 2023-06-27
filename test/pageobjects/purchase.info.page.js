class PurchaseInfoPage {
    get continueBtn() {
        return $('#continue');
    }

    get errorMsg() {
        return $('#checkout_info_container > div > form > div.checkout_info > div.error-message-container.error > h3');
    }

    get nameInput() {
        return $('#first-name');
    }

    get lastNameInput() {
        return $('#last-name');
    }

    get postalCode() {
        return $('#postal-code');
    }
}

export default new PurchaseInfoPage();