
let Publish = document.getElementById("Publish").addEventListener('click', () => {
  host()
})

const host = () => {
  let editableElements = document.querySelectorAll("[contenteditable]");
  editableElements.forEach(function (element) {
    element.removeAttribute("contenteditable");
  });
  let header = document.getElementById("header")
  header.parentNode.removeChild(header)


  let containerdata = document.getElementById("HtmlBody");
  let dataincontainer = containerdata.innerHTML;


  const datainhead = document.getElementById("head")
  const datacontainer = datainhead.innerHTML
  // Remove script tags from the innerHTML
  dataincontainer = removeScriptTags(dataincontainer);

  console.log(dataincontainer);

  let url = window.location.pathname;
  let parts = url.split('/');
  let slug = parts[parts.length - 1];

  // Create an AbortController to handle timeouts
  const controller = new AbortController();
  const signal = controller.signal;

  // Set a timeout to abort the fetch request
  const fetchTimeout = setTimeout(() => {
    controller.abort();
  }, 5000); // 5 seconds timeout

  // Send data to server
  fetch(`/host?slug=${slug}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content: dataincontainer, head: datacontainer }),
    signal: signal // Attach the abort signal to the fetch request
  })
    .then(response => {
      clearTimeout(fetchTimeout); // Clear the timeout if the request completes successfully
      return response.text();
    })
    .then(message => {
      console.log('Server response:', message);
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        console.error('Fetch request timed out:', error);
      } else {
        console.error('Error sending data:', error);
      }
    });
}



// Function to remove all script tags from the HTML content
function removeScriptTags(htmlContent) {
  let tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  let scripts = tempDiv.getElementsByTagName('script');
  while (scripts.length > 0) {
    scripts[0].parentNode.removeChild(scripts[0]);
  }
  return tempDiv.innerHTML;
}