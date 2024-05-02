var container = document.getElementById("container")
// Function to create audio player elements
function createAudioPlayer() {
    const audioContainer = document.createElement('div');
    audioContainer.classList.add('audio-container');
    audioContainer.id = generateRandomWord(20)

    const audioFileInput = document.createElement('input');
    audioFileInput.setAttribute('type', 'file');
    audioFileInput.setAttribute('id', 'audioFileInput');
    audioFileInput.id = generateRandomWord(20)

    const playButton = document.createElement('button');
    playButton.setAttribute('id', 'playButton');
    playButton.textContent = 'Play';
    playButton.id = generateRandomWord(20)

    const audioPlayer = document.createElement('audio');
    audioPlayer.setAttribute('id', 'audioPlayer');
    audioPlayer.setAttribute('controls', 'true');
    audioPlayer.textContent = 'Your browser does not support the audio element.';
    audioPlayer.id = generateRandomWord(20)

    audioContainer.appendChild(audioFileInput);
    audioContainer.appendChild(playButton);
    audioContainer.appendChild(audioPlayer);

    container.appendChild(audioContainer);

    playButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.textContent = 'Pause';
        } else {
            audioPlayer.pause();
            playButton.textContent = 'Play';
        }
    });

    audioFileInput.addEventListener('change', function () {
        const file = this.files[0];
        const objectURL = URL.createObjectURL(file);
        audioPlayer.src = objectURL;
    });
}

// Add event listener to the "Add Audio" button
const addAudioButton = document.getElementById('addAudioButton');
addAudioButton.addEventListener('click', createAudioPlayer);

