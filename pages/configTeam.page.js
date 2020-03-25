import Page from './page'
import helper from '../helper'
class ConfigurationTeamPage extends Page {

    get input () { return $('.list_row_number_input.form-control')}
    
    open(){
        if ( browser.getTitle().includes('Create')){
            browser.switchToWindow(browser.getWindowHandles()[1])
        }
        browser.waitUntil(()=>browser.getTitle().includes('Configuration'), 10000)
    }

    getRandomNumber(){
        let overall = $$('.vcr_controls .list_row_number_input span')[1].getText().replace(',','')
        console.log("OVERALL")
        console.log(overall)
        if (overall<100)
            return 105
        else 
            return helper.getRandomInt(100, Number(overall))
        
    }

    typePage(pageNumber){
        this.input.clearValue()
        this.input.setValue(pageNumber)
        console.log(pageNumber)
        console.log("PAGE NUMBER")
        browser.keys("\uE007")
    }

    clickFirstItem(){
        browser.pause(1000)
        $('tbody.list2_body tr:nth-child(1) td a').click()
        //browser.switchWindow(new RegExp('Create*'))
        browser.pause(1000)
        helper.backtoOriginWindow()
   }
}




export default new ConfigurationTeamPage()