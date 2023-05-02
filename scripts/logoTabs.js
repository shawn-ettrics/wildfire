const logoTabs = document.querySelector('.logo-tabs')

const logoBtns = logoTabs.querySelectorAll('.tab-btn-child')

const slides = logoTabs.querySelectorAll('.tab-slide-child')

const slideData = []

slides.forEach((slide, i) => {
    slideData.push({
        background: getComputedStyle(slide.querySelector('.padding-large')).backgroundImage,
        color: getComputedStyle(slide.querySelector('.padding-medium')).backgroundColor,
        content: slide.querySelector('.overflown-wrapper .is--testimonial')
    })
    // slide.querySelector('.padding-medium').style.transition = 'background-color 0.4s ease-in-out'
    if (i != 0) {
        slide.style.display = 'none'
    }
})

slides[0].querySelector('.overflown-wrapper').append(slideData[1].content, slideData[2].content)
// slides[0].querySelector('.padding-large').style.paddingLeft = 0


logoBtns.forEach((btn, i) => {
    btn.onclick = () => {
        logoBtns.querySelector('.slider-logo-color.active').classList.remove('active')
        btn.querySelector('.slider-logo-color').classList.add('active')

        slides[0].querySelector('.padding-large').style.backgroundImage = slideData[i].background
        slides[0].querySelector('.padding-medium').style.backgroundColor = slideData[i].color

        let scrollAmount = slides[0].querySelectorAll('.overflown-wrapper .is--testimonial')[i].offsetLeft
        slides[0].querySelector('.padding-large').scrollTo({left: scrollAmount, behavior: 'smooth'})

    }
})
