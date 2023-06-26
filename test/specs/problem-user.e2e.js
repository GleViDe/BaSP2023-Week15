import LoginPage from '../pageobjects/login.page.js';
import UserPage from '../pageobjects/user.page.js';
import InvElementPage from '../pageobjects/inv.element.page.js';

describe('My Problem Login', () => {
    beforeAll('Visit Main Page', () => {
        browser.url('https://www.saucedemo.com/');
    });

    it('should correctly login with standard credentials', async () => {
        await LoginPage.login('problem_user', 'secret_sauce');
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toEqual('https://www.saucedemo.com/inventory.html');
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
        expect(UserPage.invItems[0].$('button').getText()).toEqual('Add to cart');
    });

    it('should add a visited product to the cart', async () => {
        const elemtTitle = await UserPage.invItems[0].$('.inventory_item_name');
        await elemtTitle.click();
        await InvElementPage.elemtImg.waitForDisplayed();
        await InvElementPage.addToCart.click();
        await expect(InvElementPage.removeOfCart).toBeDisplayed(); 
        //expect(InvElementPage.addToCart.getText()).toEqual('Remove');
    });

    it('should remove a visited product of the cart', async () => {
        await InvElementPage.removeOfCart.click();
        await expect(InvElementPage.addToCart).toBeDisplayed();
        //expect(InvElementPage.addToCart.getText()).toEqual('Add to cart');
    });
});