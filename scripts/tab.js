
const vertTabs = document.querySelectorAll('.tabs-vertical')
const tabCards = document.querySelectorAll('.relative')

const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
        entry.target.style.height = `${entry.contentRect.width}px`
    })
})

tabCards.forEach(c => {
    c.style.padding = '0'
    resizeObserver.observe(c)
})

const tabObjArr = []

function createVerticalTabs(vtElm, vtIndex) {
    return {
        container: vtElm,
        indicator: vtElm.querySelector('.tab-vertical-active-indicator'),
        tabs: vtElm.querySelectorAll('.tab'),
        activeIndex: 0,
        timeoutFunc: null,
        frame: tabCards[vtIndex].querySelector('.frame'),
        imgs: tabCards[vtIndex].querySelectorAll('img'),
        srcs: [...tabCards[vtIndex].querySelectorAll('img')].map(img => {
            return img.src
        }),
        moveIndicator() {
            this.indicator.style.opacity = '0.3'
            this.indicator.style.height = '0.5em'
            setTimeout(() => {
                this.indicator.style.opacity = '1'
                this.indicator.style.height = '1.5em'
                let pos = getTabPos(this.tabs[this.activeIndex].querySelector('.tab-number'), this.container)
                this.indicator.style.bottom = `calc(${pos}px + 0.2em)`
            }, 600);
        },

        prepare() {

            this.tabs.forEach((tab, i) => {
                tab.addEventListener('click', ()=>{
                    this.tabClickHandler(i)
                })

                let tabImg = document.createElement('img')
                tabImg.src = this.srcs[i]

                tab.append(tabImg)

            })
            this.activate(this.activeIndex)

            this.frame.onmouseover = () => {
                this.stopPlaying()
            }
            this.frame.onmouseout = () => {
                this.autoPlay()
            }
        },

        activate(tabIndex) {
            this.tabs.forEach((tab, i) => {
                const img = tab.querySelector('img')
                img.onmouseover = () => {
                    this.stopPlaying()
                }
                img.onmouseout = () => {
                    this.autoPlay()
                }
                if (i===tabIndex) {
                    tab.classList.add('active')
                    resizeObserver.observe(img)
                } else {
                    tab.classList.remove('active')
                    resizeObserver.unobserve(img)
                    img.style.height = 0
                }
            })
            this.activeIndex = tabIndex
            this.moveIndicator()

            this.frame.classList.remove('active')
            void this.frame.offsetWidth
            this.frame.classList.add('active')
            this.imgs.forEach((img, i) => {
                if (i === tabIndex) {
                    img.classList.add('active')

                } else {
                    img.classList.remove('active')
                    
                }
            })
        },
        tabClickHandler(clickedIndex) {
            clearTimeout(this.timeoutFunc)
            this.activate(clickedIndex)
        },
        autoPlay() {
            this.timeoutFunc = setTimeout(() => {
                this.activeIndex = (this.activeIndex >= this.tabs.length - 1)? 0 : this.activeIndex + 1
                this.tabs[this.activeIndex].click()
                this.autoPlay()
            }, 4000);
        },
        stopPlaying() {
            clearTimeout(this.timeoutFunc)
        }
        
    }
}


vertTabs.forEach((item, i) => {

    const tabObj = createVerticalTabs(item, i)
    tabObjArr.push(tabObj)

    // let nextPls
    // tabObjArr.push({
    //     container: item,
    //     indicator: item.querySelector('.tab-vertical-active-indicator'),
    //     tabs: item.querySelectorAll('.tab'),
    //     activeIndex: 0,
    //     frame: tabCards[i].querySelector('.frame'),
    //     imgs: tabCards[i].querySelectorAll('img'),
    //     srcs: [...tabCards[i].querySelectorAll('img')].map(img => {
    //         return img.src
    //     }),

    //     moveIndicator() {
    //         this.indicator.style.opacity = '0.3'
    //         this.indicator.style.height = '0.5em'
    //         setTimeout(() => {
    //             this.indicator.style.opacity = '1'
    //             this.indicator.style.height = '1.5em'
    //             let pos = getTabPos(this.tabs[this.activeIndex].querySelector('.tab-number'), this.container)
    //             this.indicator.style.bottom = `calc(${pos}px + 0.2em)`
    //         }, 600);
    //     },

    //     prepare() {

    //         this.tabs.forEach((tab, i) => {
    //             tab.addEventListener('click', ()=>{
    //                 this.tabClickHandler(i)
    //             })

    //             let tabImg = document.createElement('img')
    //             tabImg.src = this.srcs[i]

    //             tabImg.onclick = () => {

    //             }

    //             tab.append(tabImg)

    //         })
    //         this.activate(this.activeIndex)
    //         // this.hoverHandler(this.frame)
    //         this.frame.onmouseover = () => {
    //             this.stopPlaying()
    //         }
    //         this.frame.onmouseout = () => {
    //             this.autoPlay()
    //         }
    //     },

    //     activate(index) {
    //         this.tabs.forEach((tab, i) => {
    //             const img = tab.querySelector('img')
    //             img.onmouseover = () => {
    //                 this.stopPlaying()
    //             }
    //             img.onmouseout = () => {
    //                 this.autoPlay()
    //             }
    //             if (i===index) {
    //                 tab.classList.add('active')
    //                 resizeObserver.observe(img)
    //             } else {
    //                 tab.classList.remove('active')
    //                 resizeObserver.unobserve(img)
    //                 img.style.height = 0
    //             }
    //         })
    //         this.activeIndex = index
    //         this.moveIndicator()

    //         this.frame.classList.remove('active')
    //         void this.frame.offsetWidth
    //         this.frame.classList.add('active')
    //         this.imgs.forEach((img, i) => {
    //             if (i === index) {
    //                 img.classList.add('active')

    //             } else {
    //                 img.classList.remove('active')
                    
    //             }
    //         })
    //     },


    //     tabClickHandler(clickedIndex) {
    //         clearTimeout(nextPls)
    //         this.activate(clickedIndex)
    //     },
    //     autoPlay() {
    //         nextPls = setTimeout(() => {
    //             this.activeIndex = (this.activeIndex >= this.tabs.length - 1)? 0 : this.activeIndex + 1
    //             this.tabs[this.activeIndex].click()
    //             this.autoPlay()
    //         }, 4000);
    //     },
    //     stopPlaying() {
    //         clearTimeout(nextPls)
    //     }
    // })
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