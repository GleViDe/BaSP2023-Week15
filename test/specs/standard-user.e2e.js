import LoginPage from '../pageobjects/login.page.js';
import UserPage from '../pageobjects/user.page.js';
import InvElementPage from '../pageobjects/inv.element.page.js';
import CartPage from '../pageobjects/shopping.cart.page.js';
import PurchaseInfoPage from '../pageobjects/purchase.info.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';
import PurchaseFinishPage from '../pageobjects/purchase.finish.page.js';

describe('My Correct Login', () => {
    beforeAll('Visit Main Page', () => {
        browser.url('https://www.saucedemo.com/');
    });

    it('should retrieve the correct data from main title', async () => {
        await LoginPage.mainTitle.waitForDisplayed();
        await expect(LoginPage.mainTitle).toHaveTextContaining('Swag Labs');
        await expect(LoginPage.btnSubmit).toBeDisplayed();
    });

    it('should login with standard credentials and in less than 2 seconds', async () => {
        const startTime = new Date().getTime();

        await LoginPage.login('standard_user', 'secret_sauce');
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toEqual('https://www.saucedemo.com/inventory.html');

        const endTime = new Date().getTime();
        const elapsedTime = endTime - startTime;
        expect(elapsedTime).toBeLessThanOrEqual(2000);
    });

    it('should retrieve the correct data from standard user view', async () => {
        await expect(UserPage.mainTitle).toHaveTextContaining('Swag Labs');
        await expect(UserPage.hambMenu).toBeDisplayed();
        await expect(UserPage.cartIcon).toBeDisplayed();
        await expect(UserPage.prdTitle).toHaveTextContaining('Products');
        await expect(UserPage.filterBar).toBeDisplayed();
        await expect(UserPage.invList).toBeDisplayed();
        await expect(UserPage.twitter).toBeDisplayed();
        await expect(UserPage.facebook).toBeDisplayed();
        await expect(UserPage.linkedin).toBeDisplayed();
        await expect(UserPage.footerText).toHaveTextContaining('© 2023 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
    });

    it('the image in the list of elements should match the image of the element itself', async () => {
        const invLength = await UserPage.invItems.length;
        for (let i = 0; i < invLength; i++) {
            const imgElemtList = await UserPage.invItems[i].$('img').getAttribute('src');
            const elemtTitle = await UserPage.invItems[i].$('.inventory_item_name');
            await elemtTitle.click();
            await InvElementPage.elemtImg.waitForDisplayed();
            const elemtImgSrc = await InvElementPage.elemtImg.getAttribute('src');
            expect(imgElemtList).toEqual(elemtImgSrc);
            await InvElementPage.backToProdBtn.click();
        }
    });

    it('should add a product to the cart', async () => {
        const addToCartBtn = await UserPage.invItems[0].$('button');
        await addToCartBtn.click();
        expect(UserPage.invItems[0].$('button')).toHaveTextContaining('Remove');
    });

    it('should remove a product of the cart', async () => {
        const addToCartBtn = await UserPage.invItems[0].$('button');
        await addToCartBtn.click();
        expect(UserPage.invItems[0].$('button')).toHaveTextContaining('Add to cart');
    });

    it('should add a visited product to the cart', async () => {
        const elemtTitle = await UserPage.invItems[0].$('.inventory_item_name');
        await elemtTitle.click();
        await InvElementPage.elemtImg.waitForDisplayed();
        await InvElementPage.addToCart.click();
        await expect(InvElementPage.removeOfCart).toBeDisplayed();
    });

    it('should remove a visited product of the cart', async () => {
        await InvElementPage.removeOfCart.click();
        await expect(InvElementPage.addToCart).toBeDisplayed();
        await InvElementPage.backToProdBtn.click();
    });

    it('should let access to the product by the cart button and check the added items', async () => {
        const addToCartBtn = await UserPage.invItems[0].$('button');
        await addToCartBtn.click();
        await UserPage.cartIcon.click();
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toEqual('https://www.saucedemo.com/cart.html');
        const cartLength = await CartPage.cartItems.length;
        expect(cartLength).toBeGreaterThan(0);
    });

    it('checkout button should lead to the purchase information form', async () => {
        await CartPage.checkout.click();
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toEqual('https://www.saucedemo.com/checkout-step-one.html');
    });

    it('should show an error with empty purchase info', async () => {
        await PurchaseInfoPage.continueBtn.click();
        expect(PurchaseInfoPage.errorMsg).toHaveTextContaining('Error: First Name is required');
    });

    it('should show lastname required with empty lastname field in purchase info', async () => {
        await PurchaseInfoPage.nameInput.setValue('Manu');
        await PurchaseInfoPage.continueBtn.click();
        expect(PurchaseInfoPage.errorMsg).toHaveTextContaining('Error: Postal Code is required');
    });

    it('should show postal code required with empty postal code field in purchase info', async () => {
        await PurchaseInfoPage.lastNameInput.setValue('Cornet');
        await PurchaseInfoPage.continueBtn.click();
        expect(PurchaseInfoPage.errorMsg).toHaveTextContaining('Error: Last Name is required');
    });

    it('should show postal code required with empty postal code field in purchase info', async () => {
        await PurchaseInfoPage.lastNameInput.setValue('Cornet');
        await PurchaseInfoPage.continueBtn.click();
        expect(PurchaseInfoPage.errorMsg).toHaveTextContaining('Error: Last Name is required');
    });

    it('continue button should lead to the checkoutpage after the form is fully filled', async () => {
        await PurchaseInfoPage.postalCode.setValue('2000');
        await PurchaseInfoPage.continueBtn.click();
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toEqual('https://www.saucedemo.com/checkout-step-two.html');
    });

    it('finish button shoul lead to the end of the purchase process', async () => {
        await CheckoutPage.finishBtn.click();
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toEqual('https://www.saucedemo.com/checkout-complete.html');
    });

    it('back home button should lead to the main page', async () => {
        await PurchaseFinishPage.backHome.click();
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toEqual('https://www.saucedemo.com/inventory.html');
    });
});

describe('My Incorrect Login', () => {
    beforeAll('Visit Main Page', () => {
        browser.url('https://www.saucedemo.com/');
    });

    it('should show an error for fields required', async () => {
        await LoginPage.login('', '');
        await expect(LoginPage.errorContainer).toHaveTextContaining('Epic sadface: Username is required');
    });

    it('should show an error for password required', async () => {
        await LoginPage.login('manolo', '');
        await expect(LoginPage.errorContainer).toHaveTextContaining('Epic sadface: Password is required');
    });

    it('should show an error for username and password do not match', async () => {
        await LoginPage.login('manolo', 'password');
        await expect(LoginPage.errorContainer).toHaveTextContaining('Epic sadface: Username and password do not match any user in this service');
    });
});
