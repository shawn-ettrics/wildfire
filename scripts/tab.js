import createVerticalTabs from "https://shawn-ettrics.github.io/wildfire/scripts/createVerticalTabs.js"

const vertTabs = document.querySelectorAll('.tabs-vertical')
const tabImgFrames = document.querySelectorAll('.relative')

const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
        entry.target.style.height = `${entry.contentRect.width}px`
    })
})

tabImgFrames.forEach(frame => {
    frame.style.padding = '0'
    resizeObserver.observe(frame)
})

const tabObjArr = []

vertTabs.forEach((vt, i) => {

    const tabObj = createVerticalTabs(vt, i, tabImgFrames)
    tabObjArr.push(tabObj)

})

tabObjArr.forEach(obj => {
    obj.prepare()

})

let tabObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        let i = Number(entry.target.dataset.index)
        if (entry.isIntersecting) {
            tabObjArr[i].autoPlay()
            vertTabs[i].classList.add('show')
        } else {
            tabObjArr[i].stopPlaying()
        }
    })
}, {
    threshold: 0.7,
    rootMargin: `${0.3 * window.innerHeight}px 0px`, 
})


vertTabs.forEach((vt, i) => {
    vt.dataset.index = i
    tabObserver.observe(vt)
})


function getTabPos(child, parent) {
    let childY = child.getBoundingClientRect().bottom
    let parentY = parent.getBoundingClientRect().bottom
    return (parentY - childY)
}