var Headingbutton = document.getElementById("Heading");
var container = document.getElementById("container");


// Create a function to convert HTML string to DOM elements
function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim(); // Never return a space text node as a result
    template.innerHTML = html;
    return template.content.firstChild;
}

let createHeading = `<div class="Heading margin-top-bottom">
<h1 contenteditable="true" aria-label="Add Title" role="textbox" aria-multiline="true" id="mainHeading" class="fonts outline font-size" class="heading-tag"
>
    Add Title
</h1>
</div>`;

Headingbutton.addEventListener('click', () => {
    // Convert HTML string to DOM element
    let HeadingElement = htmlToElement(createHeading);
    container.append(HeadingElement);
});
const mainHeading = document.getElementById("mainHeading");

// Function to handle input changes
function handleInput() {
    if (!mainHeading.textContent.trim()) {
        mainHeading.textContent = "Add Title";
        mainHeading.style.color = "gray";
    } else {
        mainHeading.style.color = "inherit";
    }
}

// Event listener for input changes
mainHeading.addEventListener("input", handleInput);
// Initial call to handle potential initial placeholder state
handleInput();

// Event listener for click to remove placeholder when clicked
mainHeading.addEventListener("click", function() {
    if(this.textContent === "Add Title") {
        this.textContent = "";
    }
});