class LoginPage {
    get mainTitle () {
        return $('#root > div > div.login_logo');
    }

    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('#login-button');
    }

    get errorContainer () {
        return $('#login_button_container > div > form > div.error-message-container.error > h3');
    }

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
}

export default new LoginPage();
