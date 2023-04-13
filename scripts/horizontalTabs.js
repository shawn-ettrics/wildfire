const timeInterval = 4
const mobileBreakpoint = 767

const tabMenus = document.querySelectorAll('.w-tab-menu')

document.querySelector(':root').style.setProperty('--time', `${timeInterval}s`)

tabMenus.forEach( menu => {

    // let scrolldiv = document.createElement('div')
    // scrolldiv.classList.add('scroll-div')
    // menu.parentElement.insertBefore(scrolldiv, menu)
    // scrolldiv.append(menu)

    // menu.style.overflow = 'scroll'
    const tabLinks = menu.querySelectorAll('.tab-link')

    tabLinks.forEach( link => {
        link.onclick = (e) => {
            console.log(link)
        }
    })
    
    tabLinks[1].click()

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



