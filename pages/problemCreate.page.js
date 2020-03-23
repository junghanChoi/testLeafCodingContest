import Page from './page'
import helper from '../helper'
import TasksPage from './tasks.page'

class ProblemCreatePage extends Page {
    get mainIframe() { return $("#gsft_main")}
    get number(){ return $('input[aria-label=Number]')}

    get subCategory() { return $("//select[contains(@name, 'problem.subcategory')]")}
    
    get lookupButtonFirstReported(){ return $('button[name="lookup.problem.first_reported_by_task"]')}
    get category() { return $("//select[contains(@name,'problem.category')]")}

    get lookupButtonService(){ return $('button[name="lookup.problem.business_service"]')}
    open(){
        browser.switchToFrame(this.mainIframe)
    }

    saveNumber(){
        this._number = this.number.getValue()
    }
    getSavedNumber(){
        return this._number
    }

    clickFirstReported(){
        this.lookupButtonFirstReported.click()
        let handles = browser.getWindowHandles()
        browser.switchToWindow(handles.pop())  
    }
    pickLastCategory(){
         // When back to previous window, the frame named gsft_main is not focused
        if (browser.isChrome) {
            browser.switchToFrame(this.mainIframe)
        }
        //this.category.click()
        const lastIndex = $$("//select[contains(@name,'problem.category')]/option")
        this.category.selectByIndex(lastIndex.length -1)
    }

    pickLongestSubcategory(){
        if ( !this.subCategory.isDisplayed())
            browser.waitUntil(()=>{this.subCategory.isDisplayed()})
        
        // if (browser.isChrome) {
        //     browser.switchToFrame(this.mainIframe)
        // }
        const options = this.subCategory.$$(".//option")
        const longest = options.reduce((prev,cur)=>{
            if ( prev.getText().length > cur.getText().length){
                return prev
            } else {
                return cur
            }
        })
        console.log('Longest')
        console.log(longest.getText())
        this.subCategory.selectByVisibleText(longest.getText())

    }

    clickServiceLookup(){
        this.lookupButtonService.click()
    }
}

export default new ProblemCreatePage()