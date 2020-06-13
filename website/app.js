/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/?'
let apiKey = '9a04e7a51c4c5dead4da8a1213fe268b';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener with generate button ID to execute when clicked
document.getElementById('generate').addEventListener('click',performAction);

function performAction(e) {
  const zip = document.getElementById('zip').value;
  const content = document.getElementById('content').value;

  getWeather(baseURL, zip, apiKey)
    .then(function(data) {
      postData('/add', {date : newDate, temp : data.temp, content : data.content})
      // update UI to call brower update
      updateUI()
    });
};

// GET the infos from the openweathermap API
const getWeather = async (baseURL, zip, apiKey) => {
  const weatherRes = await fetch(baseURL, zip, apiKey);
  try {
    const data = await weatherRes.json();
    console.log(data)
    return data;
  } catch(error) {
    console.log("error in Get API infos", error);
  }
}
// ASYNC POST function to get the datas from our server ==> à voir si ne pas mettre à la fin
const postData = async (url='', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method : 'POST',
    credentials : 'same-origin',
    headers : {
      'Content-Type':'application/json',
    },
    body : JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch(error) {
    console.log("error in post function", error);
  }
}


// UPDATE UI
const updateUI = async() => {
  const request = await fetch('/all')
  try {
    const allData = await request.json()
    console.log(allData);
    document.getElementById('date').innerHTML = allData[0].date;
    document.getElementById('temp').innerHTML = allData[0].temp;
    document.getElementById('content').innerHTML = allData[0].content;
  } catch(error) {
    console.log("error in update UI", error);
  }
}

// jusque là ok //
