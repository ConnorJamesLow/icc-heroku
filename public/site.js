console.log('Hello there.');


// function to get the logs from the api
function getData(callback) {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      callback(this.responseText);
    }
  });

  xhr.open("GET", "/api/log");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("Postman-Token", "811de2a1-5477-4ee5-b2ce-c54edfca4ffa");

  xhr.send();
}

// add the data to the web page as a list
getData((raw) => {
  const { data } = JSON.parse(raw);
  console.log(data);

  // get the ul#logs target element
  const target = document.getElementById('logs');

  // build an array of li elements
  const listItems = data.map((log) => `<li id=${log._id}>${moment(log.date).format('MM-DD-YYYY @ hh:mm A')}</li>`);

  // add the array to the element
  target.innerHTML = listItems.toString().replace(/,/g, '');
})