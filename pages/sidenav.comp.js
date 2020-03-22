import Page from './page'

class SideNav extends Page {
    get filter() { return $('#filter') }

    get loading() { return $("div[ng-hide='navigatorLoaded']")}
    // get displayedList (){ return $$('.sn-widget-list-title').find((element)=>{
    //     return element.getCSSProperty('display').value !== "none"
    // })}

    searchFilter(name) {
        this.filter.setValue(name)
        browser.pause(3000)
        browser.waitUntil(()=> !this.loading.isDisplayed())
    }

    clickWidgetWithTitle(title){
        const item = $$(`//*[@class='sn-widget-list-title'][contains(text(),'Create New')]`)
        .find((element)=> element.isDisplayed())
        

        //const item = $$(`//*[@class='sn-widget-list-title'][contains(text(),'Create New')]`)
        console.log(item)
        console.log(item.getText())
        item.click()
        browser.pause(5000)
        
    }

}

export default new SideNav()