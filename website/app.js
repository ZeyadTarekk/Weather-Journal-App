/* Global Variables */
const apiKey = "257253a0af887282544908575c498b86";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

const zipElement = document.querySelector("#zip");
const generatButton = document.querySelector("#generate");
const feelingsElement = document.querySelector("#feelings");
const dateElement = document.querySelector("#date");
const tempElement = document.querySelector("#temp");
const contentElement = document.querySelector("#content");

const dealWithTheServer = async function () {
  try {
    const zipCode = zipElement.value;
    const feelings = feelingsElement.value;
    if (zipCode !== "") {
      const apiFullURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=metric`;

      const firstPromise = await fetch(apiFullURL);
      if (!firstPromise.ok)
        throw new Error("Can't Find this Country.. Try Again!");
      const data = await firstPromise.json();
      const tempreture = data.main.temp;

      await fetch("/dataFromApp", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: newDate,
          temp: tempreture,
          feeling: feelings,
        }),
      });
      const secondPromise = await fetch("/dataToApp");
      const data2 = await secondPromise.json();
      dateElement.innerHTML = data2.date;
      tempElement.innerHTML = data2.temp + "&#176;C";
      contentElement.innerHTML = data2.feeling;
    }
  } catch (err) {
    console.log(err.message);
    contentElement.innerHTML = err.message;
  }
};

generatButton.addEventListener("click", dealWithTheServer);

// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
