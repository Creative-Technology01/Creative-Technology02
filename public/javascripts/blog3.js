
function addFileInput(container) {
    let imageContainer = container.querySelector('.image-container');

    if (!imageContainer) {
        imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        imageContainer.id = generateRandomWord(20)

        const fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('class', 'fileInput');
        fileInput.setAttribute('accept', 'image/*');
        fileInput.setAttribute('multiple', '');
        fileInput.style.display = 'none';
        fileInput.id = generateRandomWord(20)

        const uploadButton = document.createElement('button');
        uploadButton.setAttribute('class', 'uploadButton');
        uploadButton.textContent = 'Upload Images';
        uploadButton.id = generateRandomWord(20)
        uploadButton.addEventListener('click', function () {
            fileInput.click();
        });

        imageContainer.appendChild(fileInput);
        imageContainer.appendChild(uploadButton);
        container.appendChild(imageContainer);

        // Attach event listener after the elements are added to the DOM
        fileInput.addEventListener('change', function (event) {
            const files = event.target.files;
            const gallery = container.querySelector('.gallery');

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();

                reader.onload = function () {
                    const img = new Image();
                    img.src = reader.result;

                    gallery.appendChild(img);
                };

                reader.readAsDataURL(file);
            }
        });
    }

    // Show image container
    imageContainer.style.display = 'block';
}

// Function to add a new gallery
function addGallery() {
    // Create a new gallery container
    const galleryContainer = document.createElement('div');
    galleryContainer.id = generateRandomWord(20)
    galleryContainer.classList.add('gallery-container');

    // Create a gallery
    const gallery = document.createElement('div');
    gallery.id = generateRandomWord(20)
    gallery.classList.add('gallery');

    // Append the new gallery to the container
    galleryContainer.appendChild(gallery);

    // Append the new gallery container to the container
    const container = document.getElementById('container');
    container.appendChild(galleryContainer);

    // Add file input and upload button
    addFileInput(galleryContainer);
}

// Event listener for adding a new gallery
document.getElementById('addGalleryButton').addEventListener('click', function () {
    addGallery();
});