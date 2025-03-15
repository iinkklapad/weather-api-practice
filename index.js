import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();

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