var container = document.getElementById("container")
    document.getElementById('add-video-button').addEventListener('click', function () {
        var videoContainer = document.createElement('div');
        videoContainer.classList.add('video-container');

        var video = document.createElement('video');
        video.controls = true;
        video.controlsList.add('nodownload');
        video.controlsList.add('nofullscreen');
        video.disablePictureInPicture = true;
        video.id = generateRandomWord(20)
        video.textContent = 'Your browser does not support the video tag.';

        var fileLabel = document.createElement('label');
        fileLabel.htmlFor = 'file-input';
        fileLabel.textContent = 'Select Video';
        fileLabel.classList.add('file-label');
        fileLabel.id = generateRandomWord(20)

        var fileInput = document.createElement('input');
        fileInput.id = 'file-input';
        fileInput.type = 'file';
        fileInput.accept = 'video/*';
        fileInput.classList.add('file-input');
        fileInput.id = generateRandomWord(20)

        var publishButton = document.createElement('button');
        publishButton.textContent = 'Publish Video';
        publishButton.classList.add('publish-button');
        publishButton.id = generateRandomWord(20)

        videoContainer.appendChild(video);
        videoContainer.appendChild(fileLabel);
        videoContainer.appendChild(fileInput);
        videoContainer.appendChild(publishButton);
        videoContainer.id = generateRandomWord(20)
        container.appendChild(videoContainer);

        fileInput.addEventListener('change', function (event) {
            var file = event.target.files[0];

            if (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    video.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        publishButton.addEventListener('click', function () {
            var videoBlob = null;

            if (video.src !== '') {
                try {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob(function (blob) {
                        videoBlob = blob;
                        // Here you can handle the videoBlob, e.g., send it to a server or display it elsewhere.
                        console.log('Video Blob:', videoBlob);
                        alert('Video published successfully!');
                    }, 'video/mp4');
                } catch (e) {
                    console.error('Error creating video blob:', e);
                    alert('Error publishing video.');
                }
            } else {
                alert('Please select a video first.');
            }
        });
    });