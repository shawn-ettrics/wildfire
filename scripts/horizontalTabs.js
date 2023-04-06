const tabMenus = document.querySelectorAll('.w-tab-menu')

tabMenus.forEach( menu => {

    const tabLinks = menu.querySelectorAll('.tab-link')

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



