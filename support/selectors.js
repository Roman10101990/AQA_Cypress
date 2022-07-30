class PageElements {

    loginButton = '[id^=login-button]';
    inputUserName = '[id^=user-name]';
    inputPassword = '[id^=password]';
    errorAlert = '[data-test=error]';
    burgerMenuBtn = '[id^=react-burger-menu-btn]';
    logOutBtn = '[id^=logout_sidebar_link]';
}

module.exports = new PageElements();