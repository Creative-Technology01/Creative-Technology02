document.getElementById('addLinkButton').addEventListener('click', function() {
    // Create a div container for the anchor tag and input fields
    const divContainer = document.createElement('div');
    divContainer.classList.add('blog-page-anchor');
    let divContainer2 = document.createElement('div');
    divContainer2.classList.add('div-container-two')

    // Create input fields for href and anchor text
    const hrefInput = document.createElement('input');
    hrefInput.setAttribute('type', 'text');
    hrefInput.setAttribute('placeholder', 'Enter href value');
    const anchorTextInput = document.createElement('input');
    anchorTextInput.setAttribute('type', 'text');
    anchorTextInput.setAttribute('placeholder', 'Enter anchor text');

    // Create a button to submit the href and anchor text values
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Set Link';

    // Append inputs and button to the div container
    divContainer2.appendChild(hrefInput);
    divContainer2.appendChild(anchorTextInput);
    divContainer2.appendChild(submitButton);
    divContainer2.appendChild(divContainer)

    // Append the div container to the main container
    const container = document.getElementById('container');
    container.appendChild(divContainer2);

    // Event listener for the submit button to create and append the anchor tag
    submitButton.addEventListener('click', function() {
        const hrefValue = hrefInput.value;
        const anchorTextValue = anchorTextInput.value;

        // Create the anchor tag
        const anchor = document.createElement('a');
        anchor.setAttribute('href', hrefValue);
        anchor.innerText = anchorTextValue;
        anchor.classList.add('blog-page-anchor-link');

        // Append the anchor tag to the div container
        divContainer.appendChild(anchor);

        // Remove the input fields and submit button
        hrefInput.remove();
        anchorTextInput.remove();
        submitButton.remove();
    });
});
