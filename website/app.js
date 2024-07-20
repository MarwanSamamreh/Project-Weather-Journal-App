/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = "906bc6066f3a610b39e53f8e7b8e9892&units=imperial";

// Base URL OpenWeatherMap API
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// DOM the generate button
document.getElementById("generate").addEventListener("click", performAction);

function performAction() {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  const date = new Date().toLocaleDateString(); // creating date in mm/dd/year format

  getWeatherData(baseURL, zip, apiKey)
    .then((data) => {
      if (data) {
        postData("/postData", {
          temp: data.main.temp,
          date: date,
          feelings: feelings,
        });
      }
    })
    .then(() => retrieveData());
}

//Fetching webAPI data
const getWeatherData = async (baseURL, zip, apiKey) => {
  try {
    //trying the data with US country code you can test with zip code 10001 for New York
    const res = await fetch(`${baseURL}${zip},us&appid=${apiKey}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error in getWeatherData:", error);
  }
};

// Async POST to post data on the server
const postData = async (url = "", data = {}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("Error in postData:", error);
  }
};

// retrieveData to update the UI HTML elements
const retrieveData = async () => {
  try {
    const request = await fetch("/all");
    if (!request.ok) {
      throw new Error("Network response was not ok");
    }
    const allData = await request.json();
    console.log(allData);

    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + " degrees";
    document.getElementById("content").innerHTML = allData.feelings;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.log("Error in updateUI:", error);
    // Adding a visible error message for users
    document.getElementById("content").innerHTML =
      "Error updating data. Please try again.";
  }
};
