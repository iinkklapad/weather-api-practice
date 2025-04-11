import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org";

//Own bearer token.
const yourBearerToken = "63f5b9ae84c15ba0960d1e37283d9fe9";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-city-weather", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


















/*
app.set('view engine', 'ejs');





const cities = [
  { name: 'New York', lat: 40.7128, lon: -74.0060 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Tokyo', lat: 35.6895, lon: 139.7670 },
  // add more cities here
];

app.get('/', (req, res) => {
  res.render('index', { cities });
});

app.get('/weather/:cityName', (req, res) => {
  const cityName = req.params.cityName;
  const city = cities.find((city) => city.name === cityName);

  if (!city) {
    res.status(404).send('City not found');
    return;
  }

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=YOUR_OPENWEATHERMAP_API_KEY`;
  axios.get(apiURL)
    .then((response) => {
      const weatherData = response.data;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

      res.render('weather', { city, weatherDescription, weatherIcon });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error fetching weather data');
    });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
*/