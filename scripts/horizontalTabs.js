const tabDuration = 4000
const mobileBreakpoint = 767

const tabMenus = document.querySelectorAll('.w-tab-menu')

document.querySelector(':root').style.setProperty('--time', `${tabDuration}s`)

tabMenus.forEach( menu => {

    // let scrolldiv = document.createElement('div')
    // scrolldiv.classList.add('scroll-div')
    // menu.parentElement.insertBefore(scrolldiv, menu)
    // scrolldiv.append(menu)

    // menu.style.overflow = 'scroll'
    const tabLinks = menu.querySelectorAll('.tab-link')

    tabLinks.forEach( (tab, i) => {

        const progressbar = document.createElement('div')
        progressbar.classList.add('progressbar')
        tab.append(progressbar)
        tab.dataset.tabIndex = i
        if (tab.classList.contains('w--current')) {
            activateNext(tab)
        }
        tab.onclick = () => {
            activateNext(tab)
        }
    })
    
    function activateNext(currentTab) {
        let currentIndex = parseInt(currentTab.dataset.tabIndex)
        let nextIndex = currentIndex >= tabLinks.length - 1? 0 : currentIndex + 1
        let remainingDuration = tabDuration
        const activeBar = currentTab.querySelector('.progressbar')
        activeBar.style.width = `50%`

        // const progressTimer = () => {
        //     activeBar.style.width = `${(tabDuration - remainingDuration) / tabDuration * 100}%`
        //     remainingDuration = remainingDuration - 100
        //     if (remainingDuration > 0) {
        //         setTimeout(() => {
        //             progressTimer()
        //         }, 100)
        //     } else {
        //         tabLinks[nextIndex].click()
        //         let scrollAmount = tabLinks[nextIndex].offsetLeft
        //         currentTab.parentElement.scrollTo({left: scrollAmount, behavior: 'smooth'})
        //     }
        // }
        // progressTimer()



        // setTimeout( () => {
        //     tabLinks[nextIndex].click()
        //     let scrollAmount = tabLinks[nextIndex].offsetLeft
        //     currentTab.parentElement.scrollTo({left: scrollAmount, behavior: 'smooth'})
        // }, tabDuration)
    }
    // tabLinks[1].click()

    // let i = 0
    // const clickNext = () => {
    //     tabLinks[i].click()
    //     console.log(tabLinks[i])
    //     i++
    //     setTimeout(() => {
    //         clickNext()
    //     }, 1000 * timeInterval)
    // } 
    // clickNext()

})



