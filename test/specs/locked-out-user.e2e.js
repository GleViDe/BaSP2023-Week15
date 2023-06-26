import LoginPage from '../pageobjects/login.page.js';

describe('My Lock Out Login', () => {
    beforeAll('Visit Main Page', () => {
        browser.url('https://www.saucedemo.com/');
    });

    it('should show an error for user locked out', async () => {
        await LoginPage.login('locked_out_user', 'secret_sauce');
        await expect(LoginPage.errorContainer).toHaveTextContaining('Epic sadface: Sorry, this user has been locked out.');
    });
});