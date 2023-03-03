
const vertTabs = document.querySelectorAll('.tabs-vertical')
const tabCards = document.querySelectorAll('.relative')

const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
        // console.log(entry.target, entry.contentRect.width)
        entry.target.style.height = `${entry.contentRect.width}px`
        // console.log(entry.target.style.height)
    })
})



tabCards.forEach(c => {
    c.style.padding = '0'
    resizeObserver.observe(c)

    // c.querySelectorAll('img').forEach(img => {
    //     img.onmouseover = () => {
    //         console.log('mouse over')
    //     }
    //     img.onclick = () => {
    //         console.log('mouse click')
    //     }
    //     img.onmouseout = () => {
    //         console.log('mouse out')
    //     }
    // })

    // const imgs = c.querySelectorAll('img')
    // imgs.forEach(img => {
    //     img.style.height = img.style.width
    //     resizeObserver.observe(img)
    // })
})

const tabObjArr = []

vertTabs.forEach((item, i) => {
    let nextPls
    tabObjArr.push({
        container: item,
        indicator: item.querySelector('.tab-vertical-active-indicator'),
        tabs: item.querySelectorAll('.tab'),
        activeIndex: 0,
        frame: tabCards[i].querySelector('.frame'),
        imgs: tabCards[i].querySelectorAll('img'),
        srcs: [...tabCards[i].querySelectorAll('img')].map(img => {
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
            this.hoverHandler(this.frame)
            // this.frame.onmouseover = () => {
            //     this.stopPlaying()
            // }
            // this.frame.onmouseout = () => {
            //     this.autoPlay()
            // }
        },

        activate(index) {
            this.tabs.forEach((tab, i) => {
                const img = tab.querySelector('img')
                this.hoverHandler(img)
                if (i===index) {
                    tab.classList.add('active')
                    resizeObserver.observe(img)
                } else {
                    tab.classList.remove('active')
                    resizeObserver.unobserve(img)
                    img.style.height = 0
                }
            })
            this.activeIndex = index
            this.moveIndicator()

            this.frame.classList.remove('active')
            void this.frame.offsetWidth
            this.frame.classList.add('active')
            this.imgs.forEach((img, i) => {
                if (i === index) {
                    img.classList.add('active')

                } else {
                    img.classList.remove('active')
                    
                }
            })
        },

        hoverHandler(elm) {
            elm.frame.onmouseover = () => {
                this.stopPlaying()
            }
            elm.frame.onmouseout = () => {
                this.autoPlay()
            }
        },

        tabClickHandler(clickedIndex) {
            clearTimeout(nextPls)
            this.activate(clickedIndex)
        },
        autoPlay() {
            nextPls = setTimeout(() => {
                this.activeIndex = (this.activeIndex >= this.tabs.length - 1)? 0 : this.activeIndex + 1
                this.tabs[this.activeIndex].click()
                this.autoPlay()
            }, 4000);
        },
        stopPlaying() {
            clearTimeout(nextPls)
        }
    })
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
    let childRect = child.getBoundingClientRect()
    let childY = child.getBoundingClientRect().bottom
    let parentY = parent.getBoundingClientRect().bottom
    return (parentY - childY)
}