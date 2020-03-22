import Page from './page'

class LoginPage extends Page {
    get username() { return $('#user_name') }
    get password() { return $('#user_password') }
    get submitBtn() { return $('form button[type="submit"]') }
    get flash() { return $('#flash') }
    get headerLinks() { return $$('#header a') }

    open() {
        super.open('http://the-internet.herokuapp.com/login')       
    }

    submit() {
        this.submitBtn.click()
    }
}

export default new LoginPage()