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
import ConfigurationTeamPage from '../../../pages/configTeam.page'
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
            //browser.pause(3000)
            // let options = ProblemCreate.category.$('.//options')
            // let lastIndex = options.length -1
            // let lastName = options[lastIndex].getValue()
            // console.log('LastName is ' + lastName)
            // ProblemCreate.category.selectByIndex(lastIndex)
        })

        it('longest one in subcategory', ()=>{
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
        // after('Back to main', ()=>{
        //     if (browser.isChrome){
        //         let handles = browser.getWindowHandles()
        //         browser.switchToWindow(handles[0])
        //         browser.switchToFrame($("#gsft_main"))
        //     }
        // })
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
            let state = $('//select[contains(@id,"state")]').getText().split('\n')[0]
            expect(state).to.equal("New")
        })
    })
    describe('Select impact and urgency', ()=>{
        it('impact with JS',()=>{
            browser.executeScript(`
                let imp = document.getElementById("problem.impact")
                imp.setValue(2)
            `,[])
        })
        it('urgency with JS',()=>{
            browser.executeScript(`
                let urg = document.getElementById("problem.urgency")
                urg.setValue(2)
            `,[])
        })
    })
    describe('Assigned to', ()=>{
        it('type Partial statement', ()=>{
            // 'Problem admini and choose first one
            let assigned = $("//input[contains(@id,'sys_display.problem.assigned_to')]")
            assigned.setValue('problem admini')
            //$('//div[contains(@id,"AC.problem.assi")]').$$('.//tr[@role="option"]//td')[1].click()
            // td element is not clickable for now( I couldn't find it)
            browser.pause(2000)
            let location = assigned.getLocation()
            assigned.click({x: 10, y: 20})
            
        })
    })
    describe('Submit', ()=>{
        it('Submit', ()=>{
            $('#sysverb_insert_bottom').scrollIntoView()
            $('#sysverb_insert_bottom').click()
        })
    })
    describe('Search and verify problem number', ()=>{
        it('Search the number', ()=>{
            browser.waitUntil(()=>{
                return browser.getTitle().includes('Problems')
            })
            //browser.switchToFrame($("#gsft_main"))
            console.log(`Problem Number is ${problemNumber}`)
            let searchInput = $('.input-group input')
            searchInput.setValue(problemNumber)
            browser.keys('Enter')
            browser.pause(2000)
            expect($("//td//a[contains(@aria-label,'PRB0040111') and @class='linked formlink']"))
                .to.not.equal(null)
        })
    })

    describe('Logout and close',()=>{
        it('Logout and close', ()=>{
            browser.switchToParentFrame()
            $('#user_info_dropdown').click()
            let ul = $("ul[aria-labelledby='user_info_dropdown']")
            browser.waitUntil(()=>{
                return ul.isDisplayed()
            })
            ul.$('=Logout').click()
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