let Paragraphbutton = document.getElementById("Paragraph");
    var container = document.getElementById("container");


    // Create a function to convert HTML string to DOM elements
    function htmlToElement(html) {
        let template = document.createElement('template');
        html = html.trim(); // Never return a space text node as a result
        template.innerHTML = html;
        return template.content.firstChild;
    }

    let createParagraph = `<div class="Paragraph margin-top-bottom ">
                <p contenteditable="true" aria-label="Paragraph" role="textbox" aria-multiline="true" id="Paragraph" class="fonts outline">
                    Write Paragraph
                </p>
            </div>`;

    Paragraphbutton.addEventListener('click', () => {
        // Convert HTML string to DOM element
        let ParagraphElement = htmlToElement(createParagraph);
        container.append(ParagraphElement);
    });
    const mainParagraph = document.getElementById("Paragraph");

    // Function to handle input changes
    function handleInput() {
        if (!mainParagraph.textContent.trim()) {
            mainParagraph.textContent = "Write Paragraph";
            mainParagraph.style.color = "gray";
        } else {
            mainParagraph.style.color = "inherit";
        }
    }

    // Event listener for input changes
    mainParagraph.addEventListener("input", handleInput);
    // Initial call to handle potential initial placeholder state
    handleInput();

    // Event listener for click to remove placeholder when clicked
    mainParagraph.addEventListener("click", function () {
        if (this.textContent === "Write Paragraph") {
            this.textContent = "";
        }
    });