/* Global Variables */
let baseURL = 'api.openweathermap.org/data/2.5/weather?q=';
let apiKey = 'c54018a8d4ca926d38b29c05e6e7e797';
const zipCode = document.getElementById('zip').value;


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener with generate button ID to execute when clicked
document.getElementById('generate').addEventListener('click',performAction);

function performAction(e) {
  e.preventDefault();
  const content = document.getElementById('content').value;

  getWeather(baseURL, zip, apiKey)
    .then(function(data) {
      postData('/add', {
        date : newDate,
        temp : data.temp,
        content : data.content})
      // update UI to call brower update
      updateUI()
    });
};

// GET the infos from the openweathermap API
const getWeather = async (baseURL, zipCode, apiKey) => {
  const res = await fetch(baseURL+zipCode+apiKey); // avant : ,
  try {
    const data = await res.json();
    console.log(data)
    return data;
  } catch(error) {
    console.log("error in Get API infos", error);
  }
}
// ASYNC POST function to get the datas from our server
const postData = async (url='', data = {}) => {
  console.log(data);
  const response = await fetch(url, { //'http://localhost:3000/add'
    method : 'POST',
    credentials : 'same-origin',
    headers : {
      'Content-Type':'application/json',
    },
    body : JSON.stringify({
      date : data.date,
      temp : data.temp,
      content : data.content
    })
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
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    console.log(allData)
    // update infos
    document.getElementById('date').innerHTML = 'Today is '+ allData.date; // dans ce cas remplacer 0 par index
    document.getElementById('temp').innerHTML = 'The temperatrure is ' + allData.temp;
    document.getElementById('content').innerHTML = 'And I feel ' + allData.content;
  } catch(error) {
    console.log("error in update UI", error);
  }
};
