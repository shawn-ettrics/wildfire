const tabDuration = 6000
const mobileBreakpoint = 767

const timedTabComponents = document.querySelectorAll('.timed-horizontal-tabs')

document.querySelector(':root').style.setProperty('--time', `${tabDuration}s`)

timedTabComponents.forEach( tabComponent => {

    const tabLinks = tabComponent.querySelectorAll('.tab-link')

    let timer

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

            let currentIndex = parseInt(currentTab.dataset.tabIndex)
            let nextIndex = currentIndex >= tabLinks.length - 1? 0 : currentIndex + 1

            const activeBar = currentTab.querySelector('.progressbar')
    
            const timerAnime = activeBar.animate([
                {width: '0%'},
                {width: '100%'}
            ],{
                duration: tabDuration,
                easing: 'linear',
            })
    
            let currentTime

            const pausingElm = tabComponent.querySelector('.tabs-content.w-tab-content') 

            pausingElm.onmouseenter = () => {
                if (clientWidth > 768) {
                    pauseAutoplay()
                }
            }
            pausingElm.onmouseleave = () => {
                if (clientWidth > 768) {
                    continueAutoplay()
                }
            }
            pausingElm.addEventListener('touchstart', () => {
                if (clientWidth <= 768) {
                    pauseAutoplay()
                }
            })
            pausingElm.addEventListener('touchend', () => {
                if (clientWidth <= 768) {
                    continueAutoplay()
                }
            })

            function pauseAutoplay() {
                timerAnime.pause()
                currentTime = timerAnime.currentTime
                clearTimeout(timer)
            }
            function continueAutoplay() {
                timerAnime.play()
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



