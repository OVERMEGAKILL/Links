document.addEventListener('mousemove', (e) => {
    const container = document.querySelector('.container');
    const x = (window.innerWidth / 2 - e.pageX) / 20;
    const y = (window.innerHeight / 2 - e.pageY) / 20;
    container.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
});

function typeEffect(element, text, delay = 100) {
    let i = 0;
    element.innerHTML = '';
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, delay);
}

function changeFontLetterByLetter(element, fonts, delay = 500) {
    const text = element.getAttribute('data-text');
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            const span = document.createElement('span');
            span.textContent = text.charAt(i);
            span.style.fontFamily = fonts[0];
            element.appendChild(span);
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                translateFonts(element, fonts.slice(1), delay);
            }, 1000);
        }
    }, delay);
}

function translateFonts(element, fonts, delay) {
    const spans = element.querySelectorAll('span');
    let i = 0;
    const interval = setInterval(() => {
        if (i < spans.length) {
            spans[i].style.fontFamily = fonts[0];
            i++;
        } else {
            clearInterval(interval);
            if (fonts.length > 1) {
                setTimeout(() => {
                    translateFonts(element, fonts.slice(1), delay);
                }, 1000);
            }
        }
    }, delay);
}

function animateLinks() {
    const links = document.querySelectorAll('.link');
    links.forEach((link, index) => {
        setTimeout(() => {
            link.innerHTML = '';
            typeEffect(link, link.getAttribute('data-text'), 100);
            setTimeout(() => {
                const fonts = ['LovecraftsDiary', 'Beograd', 'LAKOSHEN', 'SAIBA'];
                changeFontLetterByLetter(link, fonts, 500);
            }, 1000);
        }, index * 5000);
    });
}

setInterval(animateLinks, 22000);
