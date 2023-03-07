import createVerticalTabs from "https://shawn-ettrics.github.io/wildfire/scripts/createVerticalTabs.js"
import { resizeObserver, getTabPos } from "https://shawn-ettrics.github.io/wildfire/scripts/utilities.js"

const vertTabs = document.querySelectorAll('.tabs-vertical')
// const tabImgFrames = document.querySelectorAll('.relative')


// tabImgFrames.forEach(frame => {
//     frame.style.padding = '0'
//     resizeObserver.observe(frame)
// })

const tabObjArr = []

vertTabs.forEach((vt, i) => {

    const relativeDiv = vt.querySelector('.relative')
    // relativeDiv.style.padding = 0
    resizeObserver.observe(relativeDiv)
    const tabObj = createVerticalTabs(vt, i)
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
