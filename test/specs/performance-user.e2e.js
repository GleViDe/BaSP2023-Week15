import LoginPage from '../pageobjects/login.page.js';

describe('My Performance Glitch Login', () => {
    beforeAll('Visit Main Page', () => {
        browser.url('https://www.saucedemo.com/');
    });

    it('should login with standard credentials and in less than 2 seconds', async () => {
        const startTime = new Date().getTime();

        await LoginPage.login('performance_glitch_user', 'secret_sauce');
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toEqual('https://www.saucedemo.com/inventory.html');
        

        const endTime = new Date().getTime();
        const elapsedTime = endTime - startTime;
        expect(elapsedTime).toBeLessThanOrEqual(2000);
    });
});