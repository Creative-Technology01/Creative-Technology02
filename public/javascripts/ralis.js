
const addListButton = document.getElementById("List");
const listsContainer = document.getElementById("container");
let ul;

addListButton.addEventListener("click", function () {
    createEditableList();
});

function createEditableList() {
    const ul = document.createElement("ul");
    ul.className = "list-ul margin-top-bottom";
    ul.id = generateRandomWord(20)
    listsContainer.appendChild(ul);

    const newLi = document.createElement("li");
    newLi.className = "bg-black outline list-margin-t-p";
    newLi.id = generateRandomWord(20)
    newLi.contentEditable = true;
    newLi.textContent = "List";

    // Event listener to handle "Enter" key press
    newLi.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (newLi.textContent.trim() === "") {
                // Remove the list item if it's empty and Enter is pressed
                ul.removeChild(newLi);
                if (ul.children.length === 0) {
                    // Remove the entire list if it becomes empty
                    listsContainer.removeChild(ul);
                }
            } else {
                // If the list item is not empty, create a new list item
                const nextLi = newLi.cloneNode(true);
                ul.appendChild(nextLi);
                nextLi.focus();
            }
        }
    });

    // Append the new list item to the existing list
    ul.appendChild(newLi);

    // Automatically focus on the new input
    newLi.focus();
}