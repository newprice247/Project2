

document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('myForm');
  const displayArea = document.getElementById('displayArea');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const commentBox = document.getElementById('commentBox').value;
    const urlLink = document.getElementById('urlLink').value;
    const tagID = document.getElementById('tagID').value;

    // Create an object to hold the data
    const resourceData = {
      comment: commentBox,
      url: urlLink,
      tag: tagID,
    };

    // Display the data// eventually saving the data input
    displayResource(resourceData);
  

    // Clear the form fields
    clearFormFields();
  });

  function displayResource(data) {
    const resourceDiv = document.createElement('div');
    resourceDiv.className = 'resource-item';
    resourceDiv.innerHTML = `
      <h3>New Resource Added:</h3>
      <p><strong>Comment:</strong> ${data.comment}</p>
      <p><strong>URL:</strong> <a href="${data.url}" target="_blank" id="urlLinkDisplay">${data.url}</a></p>
      <p><strong>Tag:</strong> ${data.tag}</p>
    `;

    displayArea.appendChild(resourceDiv);
  }
  const getResources = () => {
    fetch('/api/resources')
      .then((response) => response.json())
      .then((data) => {
        console.log('getResources', data);
        for (let i = 0; i < data.length; i++) {
          $('#displayArea').append(`
            <div class="resource-item">
              <h3>Resource:</h3>
              <p><strong>ID:</strong> ${data[i].user.username}</p>
              <p><strong>Comment:</strong> ${data[i].comment}</p>
              <p><strong>URL:</strong> <a href="${data[i].url}" target="_blank" id="urlLinkDisplay">${data[i].url}</a></p>
              <p><strong>Tag:</strong> ${data[i].tag}</p>
            </div>`);
        }
      });
  };
  getResources();

  // clears the form after submitting input
  function clearFormFields() {
    document.getElementById('commentBox').value = '';
    document.getElementById('urlLink').value = '';
    document.getElementById('tagID').value = 'none';
  }
});




