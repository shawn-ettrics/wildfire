const timeInterval = 4
const mobileBreakpoint = 767

const tabMenus = document.querySelectorAll('.w-tab-menu')

document.querySelector(':root').style.setProperty('--time', `${timeInterval}s`)

tabMenus.forEach( menu => {


    tabLinks.forEach(link => {

        console.log(link)
        link.dataset.progress = 1
        link.onclick = () => {
            if (link.classList.contains('w--current')) {
                link.dataset.progress = 50
            }
        }
    })
})



