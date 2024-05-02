function centerSelectedElements() {
    const selectedElements = document.querySelectorAll('.selected');
    if (selectedElements.length > 0) {
        selectedElements.forEach(element => {
            element.classList.toggle("center")
        });
    } else {
        console.log('No element with class "selected" found.');
    }
}
document.getElementById('Center').addEventListener('click', centerSelectedElements);