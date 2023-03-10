const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
        entry.target.style.height = `${entry.contentRect.width}px`
    })
})

let tabObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // let i = Number(entry.target.dataset.index)
        // if (entry.isIntersecting) {
        //     vtObjs[i].autoPlay()
        //     vertTabs[i].classList.add('show')
        // } else {
        //     vtObjs[i].stopPlaying()
        // }
        if (entry.isIntersecting) {
            entry.target.autoplay()
        } else {
            entry.target.stopPlaying()
        }
    })
}, {
    threshold: 0.7,
    rootMargin: `${0.3 * window.innerHeight}px 0px`, 
})

function getTabPos(child, parent) {
    let childY = child.getBoundingClientRect().bottom
    let parentY = parent.getBoundingClientRect().bottom
    return (parentY - childY)
}




export {resizeObserver, tabObserver, getTabPos}