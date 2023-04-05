const tabLinks = document.querySelectorAll('.tab-link')

tabLinks.forEach(link => {
    link.onclick = () => {
        if (link.classList.includes('w--current')) {
            link.dataset.progress = 50
        }
    }
})