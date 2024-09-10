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
    const links = document.querySelectorAll('.link, .glitch');
    links.forEach((link, index) => {
        setTimeout(() => {
            link.innerHTML = ''; // Effacer le texte avant de réécrire
            typeEffect(link, link.getAttribute('data-text'), 100);
            setTimeout(() => {
                const fonts = ['LovecraftsDiary', 'Beograd', 'LAKOSHEN', 'SAIBA'];
                changeFontLetterByLetter(link, fonts, 500);
            }, 1000);
        }, index * 5000);
    });
}

setInterval(animateLinks, 22000);

window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQCOsbRxEDIPLQ6u1sEX5iX7csIOEdG-Atiy-8n6TfukKvGVtUc6gOiZrWwLh1zr61dAvritw5w_lPK-0BEw1rL9fg-BMvcHxVgNxsDll-2S1l1gPVY';
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        play(device_id);
    });

    // Not Ready
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
};
