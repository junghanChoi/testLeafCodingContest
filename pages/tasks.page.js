import Page from './page'
import helper from '../helper'
class TasksPage extends Page {
    
    open(){
        driver.waitUntil(()=>browser.getTitle().includes('Tasks'))
    }

    get taskList() { return $$('#task_table tr')}

    /**
     * call between 3 and 10 
     * @param {Integer} from at least 3
     * @param {Integer} to at maximum 22
     */
    getRandom(from, to) {
        let index = helper.getRandomInt(from, to)
        return this.taskList[index]
    }

    clickRandomId(){
        this.getRandom(3,10).$('.//td[4]/a').click()
        let handles = browser.getWindowHandles()
        browser.switchToWindow(handles[0])
    }
}

export default new TasksPage()