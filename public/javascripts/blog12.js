document.getElementById('save').addEventListener('click', function () {
  SaveHTMLCode()
});
function SaveHTMLCode() {
  let containerdata = document.getElementById("HtmlBody")
  let dataincontainer = containerdata.innerHTML
  console.log(dataincontainer)

  let url = window.location.pathname;
  let parts = url.split('/');
  let slug = parts[parts.length - 1];

  // Send data to server
  fetch(`/data?slug=${slug}`, { // Include the slug as a query parameter
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain' // Send as plain text
    },
    body: dataincontainer // Send the innerHTML of the container
  })
    .then(response => response.text())
    .then(message => {
      console.log('Server response:', message);
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
}