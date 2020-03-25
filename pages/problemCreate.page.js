import Page from './page'
import helper from '../helper'
import TasksPage from './tasks.page'

class ProblemCreatePage extends Page {
    get mainIframe() { return $("#gsft_main")}
    get number(){ return $('input[aria-label=Number]')}

    get subCategory() { return $("select[name$='subcategory']")}
    
    get lookupButtonFirstReported(){ return $('button[name="lookup.problem.first_reported_by_task"]')}
    get category() { return $("//select[contains(@name,'problem.category')]")}

    get lookupButtonService(){ return $('button[name="lookup.problem.business_service"]')}
    get lookupButtonConfiguration() { return $('button[name="lookup.problem.cmdb_ci"]')}
    get problemStatementInput(){ return $('input[name="problem.short_description"]')}

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
        //helper.backtoOriginWindow()
        // the contents in the subcategory are dynamically loaded. 
        //browser.pause(1000)
        /*if ( !this.subCategory.isDisplayed())
            browser.waitUntil(()=>{this.subCategory.isDisplayed()})
        */
        browser.waitUntil(()=>{
            return $("select[name$='subcategory']").$$("./option").length >1
        }, 3000)
        
        const options = $("select[name$='subcategory']").$$("./option")
        console.log(options)

        const longest = options.reduce((prev,cur)=>{
            if ( prev.getText().length > cur.getText().length){
                console.log(`Prev : ${prev.getText()}`)
                return prev
            } else {
                console.log(`cur : ${cur.getText()}`)
                return cur
            }
        })
        console.log('Longest')
        console.log(longest.getText())
        this.subCategory.selectByVisibleText(longest.getText())

        //this.subCategory.selectByIndex(2)
    }

    clickServiceLookup(){
        this.lookupButtonService.click()
    }

    clickConfigurationLookup(){
        this.lookupButtonConfiguration.click()
    }

    typeProblemStatement(statement){
        this.problemStatementInput.setValue(statement)
    }
}

export default new ProblemCreatePage()