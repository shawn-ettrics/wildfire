const logoTabs = document.querySelector('.logo-tabs')

const logoBtns = logoTabs.querySelectorAll('.tab-btn-child')

const slides = logoTabs.querySelectorAll('.tab-slide-child')

const slideData = []

slides.forEach((slide, i) => {
    slideData.push({
        quote: slide.querySelector('.quote').innerText,
        background: getComputedStyle(slide.querySelector('.padding-large')).backgroundImage,
        color: getComputedStyle(slide.querySelector('.padding-medium')).backgroundColor,
        author: slide.querySelector('.author-name').innerText,
        title: slide.querySelector('.author-title').innerText,
        description: slide.querySelector('.description').innerText
    })
    slide.querySelector('.padding-medium').style.transition = 'background-color 0.4s ease-in-out'
    if (i != 0) {
        slide.style.display = 'none'
    }
})


logoBtns.forEach((btn, i) => {
    btn.onclick = () => {
        console.log(btn)
        slides[0].querySelector('.quote').innerText = slideData[i].quote
        slides[0].querySelector('.padding-large').style.backgroundImage = slideData[i].background
        slides[0].querySelector('.padding-medium').style.backgroundColor = slideData[i].color
        slides[0].querySelector('.author-name').innerText = slideData[i].author
        slides[0].querySelector('.author-title').innerText = slideData[i].title
        slides[0].querySelector('.description').innerText = slideData[i].description
    }
})
