const tabMenus = document.querySelectorAll('.w-tab-menu')

tabMenus.forEach( menu => {

    const tabLinks = menu.querySelectorAll('.tab-link')

    tabLinks.forEach(link => {
        link.onclick = () => {
            if (link.classList.contains('w--current')) {
                link.dataset.progress = 50
            }
        }
    })
})



