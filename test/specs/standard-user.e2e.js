import LoginPage from '../pageobjects/login.page.js';
import UserPage from '../pageobjects/user.page.js';
import InvElementPage from '../pageobjects/inv.element.page.js';

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
        const addToCartBtn = await UserPage.invItems[0].$('#add-to-cart-sauce-labs-backpack');
        await addToCartBtn.click();
        await expect(UserPage.invItems[0].$('button')).toHaveId('remove-sauce-labs-backpack');
    });

    it('should remove a product to the cart', async () => {
        const addToCartBtn = await UserPage.invItems[0].$('#remove-sauce-labs-backpack');
        await addToCartBtn.click();
        await expect(UserPage.invItems[0].$('button')).toHaveId('add-to-cart-sauce-labs-backpack');
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
