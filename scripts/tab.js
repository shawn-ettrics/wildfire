import createVerticalTabs from "https://shawn-ettrics.github.io/wildfire/scripts/createVerticalTabs.js"
import { resizeObserver } from "https://shawn-ettrics.github.io/wildfire/scripts/utilities.js"

const vertTabs = document.querySelectorAll('.vertical-tabs')
// const tabImgFrames = document.querySelectorAll('.relative')


// tabImgFrames.forEach(frame => {
//     frame.style.padding = '0'
//     resizeObserver.observe(frame)
// })

const vtObjs = []

vertTabs.forEach(vt => {

    const relativeDiv = vt.querySelector('.relative')
    console.log(relativeDiv)

    // relativeDiv.style.padding = 0
    resizeObserver.observe(relativeDiv)
    const tabObj = createVerticalTabs(vt)
    console.log(tabObj.frame)
    vtObjs.push(tabObj)

})

vtObjs.forEach(obj => {
    obj.prepare()
})

let tabObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        let i = Number(entry.target.dataset.index)
        if (entry.isIntersecting) {
            vtObjs[i].autoPlay()
            vertTabs[i].classList.add('show')
        } else {
            vtObjs[i].stopPlaying()
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
