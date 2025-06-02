// ShoreSquad App JS
// --- Live Weather Fetching (OpenWeatherMap API placeholder) ---
const weatherInfo = document.getElementById('weather-info');
async function fetchWeather() {
  // Replace with your OpenWeatherMap API key and location
  const apiKey = 'YOUR_API_KEY';
  const city = 'Singapore';
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json();
    weatherInfo.textContent = `Weather: ${data.weather[0].main}, ${data.main.temp}°C`;
  } catch (e) {
    weatherInfo.textContent = 'Unable to fetch weather.';
  }
}
fetchWeather();

// --- Map with Pin Drops (Leaflet.js) ---
const map = L.map('mapid').setView([1.3521, 103.8198], 11); // Singapore
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);
map.on('click', function(e) {
  L.marker(e.latlng).addTo(map);
});

// --- Animated Crew Badge Counter ---
let badgeCount = 0;
const badgeCountEl = document.getElementById('badge-count');
function incrementBadge() {
  badgeCount++;
  badgeCountEl.textContent = badgeCount;
  badgeCountEl.animate([
    { transform: 'scale(1.2)' },
    { transform: 'scale(1)' }
  ], { duration: 300 });
}
badgeCountEl.parentElement.addEventListener('click', incrementBadge);

// --- Social Sharing Button ---
const shareBtn = document.getElementById('share-btn');
shareBtn.addEventListener('click', async () => {
  const shareData = {
    title: 'ShoreSquad',
    text: 'Join me for a beach cleanup with ShoreSquad!',
    url: window.location.href
  };
  if (navigator.share) {
    await navigator.share(shareData);
  } else {
    alert('Sharing not supported on this browser.');
  }
});
