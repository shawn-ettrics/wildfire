const tabDuration = 10000
const mobileBreakpoint = 767

const timedTabComponents = document.querySelectorAll('.timed-horizontal-tabs')

document.querySelector(':root').style.setProperty('--time', `${tabDuration}s`)

timedTabComponents.forEach( tabComponent => {

    const tabLinks = tabComponent.querySelectorAll('.tab-link')

    let timer
    let currentTime
    let nextIndex

    tabLinks.forEach( (tab, i) => {

        const progressbar = document.createElement('div')
        progressbar.classList.add('progressbar')
        tab.append(progressbar)
        tab.dataset.tabIndex = i

        if (tab.classList.contains('w--current')) {
            activate(tab)
        }

        tab.onclick = () => {

            if (!tab.classList.contains('w--current')) {
                clearTimeout(timer)
                activate(tab)
            }

        }

        function activate(currentTab) {
            currentTab.parentElement.scrollTo({left: currentTab.offsetLeft, behavior: 'smooth'})

            currentIndex = parseInt(currentTab.dataset.tabIndex)
            nextIndex = currentIndex >= tabLinks.length - 1? 0 : currentIndex + 1

            const activeBar = currentTab.querySelector('.progressbar')
    
            const timerAnime = activeBar.animate([
                {width: '0%'},
                {width: '100%'}
            ],{
                duration: tabDuration,
                easing: 'linear',
            })
    

            const pausingElm = tabComponent.querySelector('.tabs-content.w-tab-content') 

            pausingElm.onmouseenter = (ev) => {
                if (innerWidth > 768) {
                    pauseAutoplay()
                } else {
                    ev.preventDefault()
                }
            }
            pausingElm.onmouseleave = (ev) => {
                if (innerWidth > 768) {
                    continueAutoplay()
                } else {
                    ev.preventDefault()
                }
            }
            pausingElm.addEventListener('touchstart', ev => {
                if (innerWidth <= 768 && ev.targetTouches.length < 2) {
                    pauseAutoplay()
                    console.log('start')
                }
            })
            pausingElm.addEventListener('touchend', ev => {
                if (innerWidth <= 768) {
                    continueAutoplay()
                    console.log('end')
                }
            })
            pausingElm.addEventListener('touchcancel', ev => {
                if (innerWidth <= 768) {
                    continueAutoplay()
                    console.log('cancel')
                }
            })

            function pauseAutoplay() {
                timerAnime.pause()
                currentTime = timerAnime.currentTime
                clearTimeout(timer)
            }
            function continueAutoplay() {
                timerAnime.play(timer)
                clearTimeout(timer)
                timer = setTimeout( () => {
                    tabLinks[nextIndex].click()
                }, tabDuration - currentTime)
            }
    
            timer = setTimeout( () => {
                tabLinks[nextIndex].click()
            }, tabDuration)
            
        }
    })

    
    



})



