const assert = require('assert')
const dotenv = require('dotenv')
import {expect} from 'chai'

dotenv.config()
//const LoginPage = require('../../../pages/login.page').default
import LoginPage from '../../../pages/login.page'
import SnPage from '../../../pages/sn.page'
import SideNav from '../../../pages/sidenav.comp'
import ProblemCreate from '../../../pages/problemCreate.page'
import TasksPage from '../../../pages/tasks.page'
import ServicesPage from '../../../pages/services.page'
import { type } from 'os'
describe('submit the problem', () => {
    let problemNumber;
    describe('open sn URL', ()=>{
        
        it('open browser', ()=>{
            SnPage.open()
            SnPage.fillCredential()
            SnPage.login()
            
            console.log(browser.getTitle())
            expect(browser.getTitle()).to.contains('System')
            
        })
    })
    describe('type filter and click create new',()=>{
        before(()=>{
            if (!browser.isChrome) {
                browser.switchToFrame(0)
            }
        })

        it('type problem as filter', ()=>{
            //browser.debug()
            SideNav.searchFilter('Problem')
        })

        it('click Create New', ()=>{
            SideNav.clickWidgetWithTitle('Create New')
        })
    })

    describe('capture the problem number', ()=> {
        it('is Problem Field disabled', ()=> {
            ProblemCreate.open()
            problemNumber = ProblemCreate.number.getValue()
            expect(ProblemCreate.number.getAttribute('class')).to.contains('disabled')
        })
        it('get random tasks', ()=>{
            let currentHandle = browser.getWindowHandle()
            ProblemCreate.clickFirstReported()
            expect(browser.getWindowHandle).not.equal(currentHandle,'Handle has changed')
            TasksPage.open()
            TasksPage.clickRandomId()
            console.log(problemNumber + "PROBLEM NUMBER")

        })
    })

    describe('select last number of options', ()=>{
        it('Only one Window', ()=>{
            expect(browser.getWindowHandles()).to.length(1)
            browser.switchToWindow(browser.getWindowHandles()[0])
            
        })
        it('Select last one', ()=>{
            
            ProblemCreate.pickLastCategory()
            browser.pause(3000)
            // let options = ProblemCreate.category.$('.//options')
            // let lastIndex = options.length -1
            // let lastName = options[lastIndex].getValue()
            // console.log('LastName is ' + lastName)
            // ProblemCreate.category.selectByIndex(lastIndex)
        })

        
    })
    describe('Select longest one in subCategory', ()=>{
        it('longest one', ()=>{
            ProblemCreate.pickLongestSubcategory()

        })
    })
    describe('last service', ()=>{
        it('get last service', ()=>{
            ProblemCreate.clickServiceLookup()
            expect(browser.getWindowHandles().length).not.equal(1)
            ServicesPage.open()
            ServicesPage.clickLastOfTable()
        })
    })

    describe('Choose configuration team', ()=>{
        let randomNumber;
        it('click on lookup icon', ()=>{
            ProblemCreate.clickConfigurationLookup()
            ConfigurationTeamPage.open()
            expect(browser.getTitle()).to.contains('Configuration Items')
        })
        it('find between 100 to overall count', ()=>{
            randomNumber = ConfigurationTeamPage.getRandomNumber();
        })
        it('type the number', ()=>{
            ConfigurationTeamPage.typePage(randomNumber)
        })
        it('click the first record', ()=>{
            ConfigurationTeamPage.clickFirstItem()
        })
    })

    describe('Type Problem statement',()=>{
        it('with timestamp', ()=>{
            let timestamp = Date.now()
            ProblemCreate.typeProblemStatement(`TESTLEAF CONTEST ${timestamp}`)
        })
    })

    describe('Confirm State Value', ()=>{
        it('with New', ()=>{
            let state = $('select[contains(@id,"state")]').getValue()
            expect(state).to.equal("New")
        })
    })
    describe('Select impact and urgency', ()=>{
        it('impact with JS',()=>{

        })
        it('urgency with JS',()=>{

        })
    })
    describe('Assigned to', ()=>{
        it('type Partial statement', ()=>{
            // 'Problem admini and choose first one
        })
    })
    describe('Submit', ()=>{
        it('Submit', ()=>{
            
        })
    })
    describe('Search and verify problem number', ()=>{
        it('Search the number', ()=>{
            // problemNumber
        })
    })
    /*it('should have the right title', () => {
        console.log(process.env.username)
        console.log(process.env.password)
        // browser.url('/')
        // const title = browser.getTitle()
        // assert.strictEqual(title, 'ServiceNow')
        LoginPage.open()
        LoginPage.username.setValue('foo')
        LoginPage.password.setValue('bar')
        LoginPage.submit()
        

        expect(LoginPage.flash.getText()).to.contain('Your username is invalid!')
    })*/




})