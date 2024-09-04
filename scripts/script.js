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

function translateEffect(element, texts, delay = 100) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < texts.length) {
            element.innerHTML = texts[i];
            i++;
        } else {
            clearInterval(interval);
        }
    }, delay);
}

function animateLinks() {
    const links = document.querySelectorAll('.link');
    const terminal = document.querySelector('.terminal');
    terminal.style.display = 'block';
    links.forEach((link, index) => {
        setTimeout(() => {
            const alienText = '⟟⟊⟟⟊⟟⟊';
            const cyrillicText = 'Пример';
            const japaneseText = '例';
            const latinText = link.getAttribute('data-text');
            typeEffect(terminal, alienText, 100);
            setTimeout(() => {
                translateEffect(terminal, [alienText, cyrillicText, japaneseText, latinText], 500);
            }, 1000);
        }, index * 5000);
    });
}

setInterval(animateLinks, 15000);
