// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
var express = require('express')

// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server and test it
const port = 3000;
const server = app.listen(port,listening);


app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

/*app.get('/',function (req,res) {
  res.send('hello world');
});*/

function listening() {
  console.log("serveur running");
  console.log(`running on localhost:${port}`);
};

// Setup GET routes
const data = [];
app.get('/all',getData)
function getData(req, res) {
  res.send(projectData)
  console.log(projectData)
}

// Setup POST routes
app.post('/add', addInfo); // avant addInfo

function addInfo(req, res) {
  console.log(req.body);

  let newEntry = {
    temp : req.body.temp,
    date : req.body.date,
    content : req.body.content
  }

  projectData.push(newEntry)
  res.send(projectData)
  console.log(projectData)  // ou newEntry
}
