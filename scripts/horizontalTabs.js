const timeInterval = 4
const mobileBreakpoint = 767

const tabMenus = document.querySelectorAll('.w-tab-menu')

document.querySelector(':root').style.setProperty('--time', `${timeInterval}s`)

tabMenus.forEach( menu => {

    const tabLinks = menu.querySelectorAll('.tab-link')


    let i = 0
    const clickNext = () => {
        tabLinks[i].click()
        i++
        setTimeout(() => {
            clickNext()
        }, timeInterval)
    } 

})



