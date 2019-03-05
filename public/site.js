console.log('Hello there.');


/**
 * Function to get the logs from the api
 * @param {function} callback A function to run once the request has completed. Takes the response as a paramenter.
 */
function getData(callback) {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  // This event runs when the state changes, e.g. a request receives a response.
  xhr.addEventListener("readystatechange", function () {

    // ready state 4 means the request has received a response
    if (this.readyState === 4) {
      callback(this.responseText);
    }
  });

  // Set the type and destination of the request
  xhr.open("GET", "/api/log");
  xhr.setRequestHeader("cache-control", "no-cache");

  // Execute the xhr
  xhr.send();
}

// add the data to the web page as a list
getData((raw) => {
  const { data } = JSON.parse(raw);
  console.log(data);

  // get the ul#logs target element
  const target = document.getElementById('logs');

  // build an array of li elements
  const listItems = data.map((log) => `<li id=${log._id}>${moment(log.date).format('MM-DD-YYYY @ hh:mm A')}: ${log.message}</li>`);

  // add the array to the element
  target.innerHTML = listItems.toString().replace(/,/g, '');
})