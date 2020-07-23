// Setup empty JS object to act as endpoint for all routes
projectData = {data : []};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser')
const port = 8000;


// Start up an instance of app
const app = express();



/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const server = app.listen(port, listening);
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

// route to get the projectData
app.get('/all', sendData);
function sendData (request, response) {
  response.send(projectData);
};



// route to add entry to projectData
app.post('/add_new', add_entry);
function add_entry (req,res){
  projectData.data.push(req.body);
  console.log(projectData)
  res.send('ok')
}



