function onAjaxResponse () {
  // the response is a JSON string so let's parse it back into an object
  var data = JSON.parse(this.response);
  updateCountElement(data.count);
}

function onIncrementClick (e) {
  // tell the browser not to follow the link which would refresh the page!
  e.preventDefault();

  // make an http request using only JavaScript! You could also use a library to
  // make this cross-browser compatible. For example, in jQuery you would use
  // $.get or $.ajax.
  var request = new XMLHttpRequest();

  // when we have some data call the onAjaxResponse method
  request.addEventListener('load', onAjaxResponse);

  // make the http request a GET request to the /ajax url
  request.open('GET', '/ajax');

  // off you go now!
  request.send();
}

function updateCountElement (count) {
  // then find the count element
  var countElement = document.querySelector('#count');

  // and update it's html with the new data
  countElement.innerHTML = count;
}

function connect () {
  // create the connection
  var socket = io();

  // when we get the 'count' message call the callback function and update the
  // count element on the page
  socket.on('count', function (count) {
    updateCountElement(count);
  });
}

// DOM is ready callback
function onStartup () {
  // find the increment counter link
  var link = document.querySelector('#incrementCounterLink');

  // add an event listener for the click event
  link.addEventListener('click', onIncrementClick);

  // connect to the WebSocket server
  connect();
}

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', onStartup);
