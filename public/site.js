console.log('Hello there.');

// Source: https://www.w3schools.com/js/js_cookies.asp
// This will allow us to grab a cookie by name.
function getCookie(name) {
  const key = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(key) === 0) {
      return c.substring(key.length, c.length);
    }
  }
  return false;
}

// Source: https://www.w3schools.com/js/js_cookies.asp
// This will allow us to set a new cookie.
function setCookie(name, value, daysTillExpiration = 2) {
  const d = new Date();
  d.setTime(d.getTime() + (daysTillExpiration * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

/**
 * Function to get the logs from the api
 * 
 * @param {function} callback A function to run once the request has completed. Takes the response as a paramenter.
 */
function getData(callback) {
  const token = getCookie('token');

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  // This event runs when the state changes, e.g. a request receives a response.
  xhr.addEventListener('readystatechange', function () {

    // ready state 4 means the request has received a response
    if (this.readyState === 4) {
      callback(this.responseText);
    }
  });

  // Set the type and destination of the request
  xhr.open('GET', `/api/log?token=${token}`);
  xhr.setRequestHeader('cache-control', 'no-cache');

  // Execute the xhr
  xhr.send();
}

/**
 * Ask the server for a token.
 */
function retrieveToken() {

  // check if a token is stored in our cookies. If not, we should ask the user for some credentials.
  if (!getCookie('token')) {

    // ask the user to give some credentials.
    const credentials = prompt('Who are you?');

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    // This event runs when the state changes, e.g. a request receives a response.
    xhr.addEventListener('readystatechange', function () {

      // ready state 4 means the request has received a response
      if (this.readyState === 4) {
        const { data } = JSON.parse(this.responseText);
        if (data) {
          console.log('Got a token:', data);
          setCookie('token', data);
        } else {
          alert('I don\' know you');
        }
      }
    });

    // Set the type and destination of the request
    xhr.open('GET', `/api/login?credentials=${credentials}`);
    xhr.setRequestHeader('cache-control', 'no-cache');

    // Execute the xhr
    xhr.send();

  }
}

/**
 * add the data to the web page as a list
 */
function populateLogs() {
  getData((raw) => {
    const { data } = JSON.parse(raw);
    console.log(data);

    // get the ul#logs target element
    const target = document.getElementById('logs');

    // build an array of li elements
    const listItems = data.map((log) => `<li id=${log._id}>${moment(log.date).format('MM-DD-YYYY @ hh:mm A')}: ${log.message}</li>`);

    // add the array to the element
    target.innerHTML = listItems.toString().replace(/,/g, '');
  });
}


