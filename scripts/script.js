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

function changeFontLetterByLetter(element, fonts, delay = 500) {
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
    }, 6000);
}

window.onload = startAnimation;

window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQAJHFm6DfpuEvmXjb3Bw_bG-RoRs3-BKlfvDW78Zt6TAaA4Waq0MVQ6h57KUabtv48_0-DF0ytsKIgKy8lDerBfOjqfmWoGnf6oyr2ChBwENCyixD8';
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
