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
        const addToCartBtn = await UserPage.invItems[0].$('#add-to-cart-sauce-labs-backpack');
        await addToCartBtn.click();
        await expect(UserPage.invItems[0].$('button')).toHaveId('remove-sauce-labs-backpack');
    });

    it('should remove a product to the cart', async () => {
        const addToCartBtn = await UserPage.invItems[0].$('#remove-sauce-labs-backpack');
        await addToCartBtn.click();
        expect(UserPage.invItems[0].$('button').getAttribute('id')).toEqual('add-to-cart-sauce-labs-backpack');
    });
});