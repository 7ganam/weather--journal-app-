/* Global Variables */
const personal_API_Key='d5d3ba527d8d46915ce9a3940e9f44cd';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//set button event handlesrs 
    const button = document.querySelector("#generate");
    button.addEventListener("click", function(){
        let zip = document.getElementById("zip").value;
        let feelings = document.getElementById("feelings").value;
        // get data from the api ...post data to the server and get it back using fetch and updating the dom 
         update_server_and_dom( zip , personal_API_Key , feelings)
      });

async function update_server_and_dom( zip , personal_API_Key, feelings)
{
    //get temperature 
    let temp = await fetch_weather( zip , personal_API_Key);
    let   new_entry = {date: newDate, temp: temp ,content:feelings} 
    //get post data to the server
    let test = await postData('http://127.0.0.1:8000/add_new', new_entry)
    //read data from the server
    let my_data = await retrieveData('http://127.0.0.1:8000/all')

    //update the dom
    let last_entry = my_data.data[my_data.data.length-1];
    document.getElementById("date").innerHTML = last_entry.date;
    document.getElementById("temp").innerHTML = last_entry.temp;
    document.getElementById("content").innerHTML = last_entry.content;




}
//Function to get weather data from apis  // this function returns a promise with temperature value
function fetch_weather( zip , personal_API_Key) {
    return fetch('https://api.openweathermap.org/data/2.5/weather?zip='+ zip+',us&appid='+ personal_API_Key)  

    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        return (data.main.temp);
    })
    .catch(function() {
      // catch any errors
    });
  }


  const retrieveData = async (url='') =>{ 
    const request = await fetch(url);
    try {
    // Transform into JSON
    const allData = await request.json()
    return allData
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }
  
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    // console.log(data)
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
      try {
        const newData = await response;
        // console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }


