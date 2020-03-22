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
describe('submit the problem', () => {
    let problemNumber;
    describe('open sn URL', ()=>{
        
        it('open browser', ()=>{
            SnPage.open()
            SnPage.fillCredential()
            SnPage.login()
            
            console.log('TITLE' + browser.getTitle)
            expect(browser.getTitle()).to.contains('Home')
        })
    })
    describe('type filter and click create new',()=>{
        it('type problem as filter', ()=>{
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