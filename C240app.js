fetch('https://api.data.gov.sg/v1/environment/24-hour-weather-forecast')
  .then(res => res.json())
  .then(data => {
    const forecast = data.items[0].general.forecast;
    document.getElementById('weather').innerText = forecast;
  })
  .catch(() => {
    document.getElementById('weather').innerText = 'Unable to load forecast 😢';
  });
