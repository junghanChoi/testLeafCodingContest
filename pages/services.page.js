import Page from './page'

class ServicesPage extends Page {

    get tr() { return $$("tr.list_row")}

    open(){
        if ( browser.getTitle().includes('Create')){
            browser.switchToWindow(browser.getWindowHandles()[1])
        }
        browser.waitUntil(()=>browser.getTitle().includes('Services'), 10000)
    }

    clickLastOfTable() {
        const lastTr = this.tr[this.tr.length -1]
        lastTr.scrollIntoView()
        
        lastTr.$('.//a').click()
        browser.switchWindow(new RegExp("Create*"))

    }

}

export default new ServicesPage()