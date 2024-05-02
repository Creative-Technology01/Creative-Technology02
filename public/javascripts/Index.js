let floatright = document.querySelector('.float-right')
let show = document.querySelector('.show')
let headerfixed = document.querySelector('.header-fixed')
click = true
floatright.addEventListener('click', () => {
    if (click) {
        show.classList.add('block')
        show.classList.add('fade-out')
        headerfixed.classList.add('headerAnimation')
        headerfixed.classList.remove('returnanimation')
        click = false
        return
    }
    else {
        show.classList.remove('fade-out')
        headerfixed.classList.add('returnanimation')
        headerfixed.classList.remove('headerAnimation')
        show.classList.remove('block')
        click = true
    }
})
window.addEventListener('resize', function () {
    var windowWidth = window.innerWidth;
    if (windowWidth >= 516) {
        headerfixed.classList.remove('returnanimation')
        headerfixed.classList.remove('headerAnimation')
        if (show.classList.contains('block')) {
            show.classList.remove('block');
            show.classList.remove('fade-out');
        }
    }
});
