let shiftKeyPressed = false; // Track if Shift key is pressed
    let select = document.getElementById("select")
    // Function to handle item click
    select.addEventListener('click', () => {
        function handleItemClick(event) {
            const target = event.target;
            if (!target.matches('.container')) {
                if (!shiftKeyPressed) {
                    // If Shift key is not pressed, deselect all other items
                    const items = document.querySelectorAll('.item');
                    items.forEach(item => {
                        item.classList.remove('selected');
                    });
                }
                // Toggle the selected state of the clicked item
                target.classList.toggle('selected');
            }
        }

        // Function to handle keydown event for Shift key
        function handleKeyDown(event) {
            if (event.key === 'Shift') {
                shiftKeyPressed = true;
            }
        }

        // Function to handle keyup event for Shift key
        function handleKeyUp(event) {
            if (event.key === 'Shift') {
                shiftKeyPressed = false;
            }
        }
        document.getElementById('container').addEventListener('click', handleItemClick);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    })

    // Add event listeners for click, keydown, and keyup events


let edit = document.getElementById("edit")
edit.addEventListener('click' , ()=>{
    let selected = document.querySelectorAll(".selected")
    selected.forEach(item => {
        item.classList.remove('selected');
    });
})