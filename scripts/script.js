document.addEventListener('mousemove', (e) => {
    const container = document.querySelector('.container');
    const x = (window.innerWidth / 2 - e.pageX) / 20;
    const y = (window.innerHeight / 2 - e.pageY) / 20;
    container.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
});

function changeFont(element, fonts, delay = 500) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < fonts.length) {
            element.style.fontFamily = fonts[i];
            i++;
        } else {
            clearInterval(interval);
        }
    }, delay);
}

function animateLinks() {
    const links = document.querySelectorAll('.link');
    links.forEach((link, index) => {
        setTimeout(() => {
            const fonts = ['LovecraftsDiary', 'Beograd', 'LAKOSHEN', 'SAIBA'];
            changeFont(link, fonts, 500);
        }, index * 5000);
    });
}

setInterval(animateLinks, 15000);
