document.addEventListener('mousemove', (e) => {
    const container = document.querySelector('.container');
    const x = (window.innerWidth / 2 - e.pageX) / 20;
    const y = (window.innerHeight / 2 - e.pageY) / 20;
    container.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
});

function typeEffect(element, text) {
    element.innerHTML = text.split('').map(char => `<span>${char}</span>`).join('');
    changeFontLetterByLetter(element, ['LovecraftsDiary', 'Beograd', 'LAKOSHEN', 'SAIBA'], 100);
}

function changeFontLetterByLetter(element, fonts, delay = 300) {
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
                    changeFontLetterByLetter(element, fonts.slice(1), delay);
                }, 500);
            }
        }
    }, delay);
}

function animateLinks() {
    const links = document.querySelectorAll('.link, .glitch');
    links.forEach((link, index) => {
        link.innerHTML = link.getAttribute('data-text'); // Afficher le texte initialement
        setTimeout(() => {
            link.innerHTML = ''; // Effacer le texte avant de réécrire
            typeEffect(link, link.getAttribute('data-text'));
        }, index * 5000);
    });
}

function startAnimation() {
    animateLinks();
    setInterval(() => {
        const links = document.querySelectorAll('.link, .glitch');
        links.forEach(link => {
            link.style.transition = 'opacity 0.5s';
            link.style.opacity = 0;
            setTimeout(() => {
                link.style.opacity = 1;
                link.innerHTML = ''; // Effacer le texte avant de réécrire
                typeEffect(link, link.getAttribute('data-text'));
            }, 500);
        });
    }, 9000); // 6 seconds for SAIBA + 3 seconds for animation
}

window.onload = startAnimation;

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (token) {
    initializePlayer(token);
}

async function initializePlayer(token) {
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
    });

    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        play(device_id);
    });

    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    player.connect();

    function play(device_id) {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: ['spotify:track:6NIlK8Ql5HUMBoft4AMnTl'] }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
    }
}
