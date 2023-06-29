class UserPage {
    get mainTitle() {
        return $('#header_container > div.primary_header > div.header_label > div')
    }

    get hambMenu() {
        return $('#react-burger-menu-btn');
    }

    get cartIcon() {
        return $('#shopping_cart_container');
    }

    get prdTitle() {
        return $('#header_container > div.header_secondary_container > span');
    }

    get filterBar() {
        return $('#header_container > div.header_secondary_container > div > span > select')
    }

    get invList() {
        return $('#inventory_container > div');
    }

    get invItems() {
        return $('#inventory_container > div').$$('.inventory_item');
    }

    get hambButtons() {
        return $('#menu_button_container > div > div.bm-menu-wrap > div.bm-menu > nav');
    }

    get closeHambMenu() {
        return $('#react-burger-cross-btn');
    }

    get logOut() {
        return $('#logout_sidebar_link');
    }

    get twitter() {
        return $('#page_wrapper > footer > ul > li.social_twitter > a');
    }

    get facebook() {
        return $('#page_wrapper > footer > ul > li.social_facebook > a');
    }

    get linkedin() {
        return $('#page_wrapper > footer > ul > li.social_linkedin > a');
    }

    get footerText() {
        return $('#page_wrapper > footer > div');
    }
}

export default new UserPage();