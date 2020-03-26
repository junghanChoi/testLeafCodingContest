seleniumContest
=====

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

### mocha test framework.
> To acheive goal(submit a problem), devided each tasks into describe block.

### Page object
> impemented page object pattern. But I couldn't find a way to return the page or new page. It could be resolved to research JS syntax.
> the later part of the tasks, I just wrote codes in the describe block, not in the page. 


