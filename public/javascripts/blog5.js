function addFileInput() {
    var container = document.querySelector('.container');

    // Create file container
    var fileContainer = document.createElement('div');
    fileContainer.className = 'file-container';
    fileContainer.id = generateRandomWord(20)
    container.appendChild(fileContainer);

    // Create file input
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.id = 'imageInput';
    fileContainer.appendChild(fileInput);

    // Add line break
    fileContainer.appendChild(document.createElement('br'));

    // Create download button
    var downloadButton = document.createElement('button');
    downloadButton.id = 'downloadButton';
    downloadButton.className = 'button';
    downloadButton.setAttribute('contenteditable', 'true');
    downloadButton.textContent = 'Download Image';
    fileContainer.appendChild(downloadButton);

    // Add event listener to new download button
    downloadButton.addEventListener('click', function () {
        var imageInput = document.getElementById('imageInput');
        if (imageInput.files.length > 0) {
            var file = imageInput.files[0];
            var blobUrl = URL.createObjectURL(file);
            var link = document.createElement('a');
            link.href = blobUrl;
            link.download = file.name;
            link.click();
            URL.revokeObjectURL(blobUrl);
        } else {
            alert('Please select an image first.');
        }
    });
}

document.getElementById('addFileButton').addEventListener('click', addFileInput);