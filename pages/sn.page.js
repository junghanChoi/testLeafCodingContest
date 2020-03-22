import Page from './page'
import Dotenv from 'dotenv'
Dotenv.config()

class SnPage extends Page {
    open(){
        const url = "https://dev52004.service-now.com/"
        super.open(url)
        const mainFrame = $('#gsft_main')
        browser.switchToFrame(mainFrame)
    }

    get usernameInput() { return $('input#user_name') }
    get passwordInput() { return $('input#user_password') }
    get loginBtn() { return $('#sysverb_login') }

    setUsername() {
        this.usernameInput.setValue(process.env.SNusername)
    }
    setPassword() {
        this.passwordInput.setValue(process.env.SNpassword)
        console.log(process.env.password)
    }

    fillCredential() {
        this.setUsername()
        this.setPassword()
    }
    login() {
        this.loginBtn.click()
        browser.waitUntil(()=>{
            return browser.getTitle().includes('Home')
        })
    }
}
export default new SnPage()