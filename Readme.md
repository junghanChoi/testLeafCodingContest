seleniumContest
=====
Finished all the tasks.
Main goal : submit a problem

# tricky parts
### iframe
> the main page is in the iframe.
> Combined with new window, when switching back to original window or page transitioning,
> managing browsing context is important..

### dynamic loading
> - iframe loading
> - filtered search list
> - dropdown menu
> - loading page
> Should be used explicit wait. But at some point(ex: click then page closed), I > > used browser.pause()

----
# implementation
Language: Javascript
Framework: Webdriverio, mocha, html report.

### mocha test framework.
> To acheive goal(submit a problem), devided each tasks into describe block.

### Page object Pattern
> impemented page object pattern. But I couldn't find a way to return the page or new page. It could be resolved to research JS syntax.
> the later part of the tasks, I just wrote codes in the describe block, not in the page. 

### Logging and screenshot
> I added log4js but didn't used. I webdriverio's debug method was helpful. But mocha framework's timeout problem. It was not great. (adjust timing constant could resolve this).



