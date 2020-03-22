import Page from './page'
import helper from '../helper'
import TasksPage from './tasks.page'

class ProblemCreatePage extends Page {
    get number(){ return $('input[aria-label=Number]')}

    
    get lookupButtonFirstReported(){ return $('button[name="lookup.problem.first_reported_by_task"]')}
    get category() { return $("//select[contains(@name,'problem.category')]")}

    open(){
        browser.switchToFrame('gsft_main')
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
        browser.switchToFrame('gsft_main') // When back to previous window, the frame named gsft_main is not focused
        //this.category.click()
        const lastIndex = $$("//select[contains(@name,'problem.category')]/option")
        this.category.selectByIndex(lastIndex.length -1)
    }


}

export default new ProblemCreatePage()