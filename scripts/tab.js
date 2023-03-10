import createVerticalTabs from "https://shawn-ettrics.github.io/wildfire/scripts/createVerticalTabs.js"
import { resizeObserver } from "https://shawn-ettrics.github.io/wildfire/scripts/helpers.js"

const vertTabs = document.querySelectorAll('.vertical-tabs')

const vtObjs = []

vertTabs.forEach(vt => {

    const relativeDiv = vt.querySelector('.relative')

    resizeObserver.observe(relativeDiv)
    const tabObj = createVerticalTabs(vt)
    tabObj.prepare()

})

// vtObjs.forEach(obj => {
//     obj.prepare()
// })




// vertTabs.forEach((vt, i) => {
//     vt.dataset.index = i
//     tabObserver.observe(vt)
// })
