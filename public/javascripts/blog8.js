var container = document.getElementById("container")
document.getElementById('Row').addEventListener('click', function () {
    var selectedItems = document.querySelectorAll('.selected');
    if (selectedItems.length > 0) {
        var rowitem = document.createElement('div');
        rowitem.classList.add('row-items');
        rowitem.style.display = 'flex';
        rowitem.style.justifyContent = 'space-between';
        rowitem.id = generateRandomWord(15)
        selectedItems.forEach(function (item) {
            rowitem.appendChild(item);
        });
        container.appendChild(rowitem);
    }
});

document.getElementById('Delete').addEventListener('click' , ()=>{
    var selectedItems = document.querySelectorAll('.selected');
    if (selectedItems.length > 0) {
        selectedItems.forEach(function (item){
            item.parentNode.removeChild(item);
        })
    }
})