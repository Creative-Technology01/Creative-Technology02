
let Publish = document.getElementById("Publish").addEventListener('click', () => {
  host()
})

const host = ()=>{
  let editableElements = document.querySelectorAll("[contenteditable]");
  // Loop through each element and remove contenteditable attribute
  editableElements.forEach(function(element) {
    element.removeAttribute("contenteditable");
  });
  let header = document.getElementById("header")
  header.parentNode.removeChild(header)
  document.head.innerHTML = '<%- include(\'../Template-Engine/blog\') %>';
  SaveHTMLCode()
  let url = window.location.pathname;
  let parts = url.split('/');
  let slug = parts[parts.length - 1];

  // Send data to server
  fetch(`/host?slug=${slug}`, { // Include the slug as a query parameter
      method: 'POST',
  }).then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
  })
      .catch(error => {
          console.error('Error saving HTML content:', error);
      });
}