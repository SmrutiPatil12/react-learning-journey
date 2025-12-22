import { useState } from 'react';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (city.trim() === '') return;
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundClass = () => {
    if (!weather?.weather?.[0]?.main) return 'default-bg';
    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes('clear')) return 'clear-bg';
    if (condition.includes('cloud')) return 'cloudy-bg';
    if (condition.includes('rain') || condition.includes('drizzle')) return 'rain-bg';
    if (condition.includes('snow')) return 'snow-bg';
    if (condition.includes('thunder') || condition.includes('storm')) return 'storm-bg';
    return 'default-bg';
  };

  return (
    <div className={`app-container ${getBackgroundClass()}`}>
      <div className="glass-card">
        <h1 className="title">Weather App</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
          />
          <button onClick={fetchWeather} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2 className="city-name">
              {weather.name}, {weather.sys.country}
            </h2>

            <div className="temp-icon">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt={weather.weather[0].description}
                className="weather-icon"
              />
              <div className="temp-group">
                <p className="temperature">{Math.round(weather.main.temp)}°</p>
                <p className="feels-like">Feels like {Math.round(weather.main.feels_like)}°</p>
              </div>
            </div>

            <p className="description">
              {weather.weather[0].description.charAt(0).toUpperCase() +
                weather.weather[0].description.slice(1)}
            </p>

            <div className="details-grid">
              <div className="detail-item">
                <span>Humidity</span>
                <strong>{weather.main.humidity}%</strong>
              </div>
              <div className="detail-item">
                <span>Wind Speed</span>
                <strong>{weather.wind.speed} m/s</strong>
              </div>
              <div className="detail-item">
                <span>Pressure</span>
                <strong>{weather.main.pressure} hPa</strong>
              </div>
              <div className="detail-item">
                <span>Visibility</span>
                <strong>{(weather.visibility / 1000).toFixed(1)} km</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


// import { useState } from 'react'
// const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// import './App.css'

// function App() {
//   const[city,setCity]= useState("")
//   const[weather,setWeather]= useState(null)
//   const[loading,setLoading]= useState(false)
//   const[error,setError]= useState(null)

//   const fetchWeather = async () =>{
//     if(city.trim()==="") return;
//     setLoading(true)
//     setError(null)

//     try{

//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//     );
//     console.log(API_KEY);
//       if(!response.ok){
//         throw new Error("City not found");
//       }

//       const data = await response.json();
//       setWeather(data);
//       console.log(data);

//     }catch(err){
//       setError(err.message);
//       setWeather(null);
//     }finally{
//       setLoading(false);
//     }

//   }
//   return (
//     <div className="container">
//       <h1>Weather App</h1>

//       <input type = "text" placeholder='Enter city name' value={city} onChange={(e) => setCity(e.target.value)}/>
//       <button onClick={fetchWeather}>Get weather</button>

//       <img
//         src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//         alt="weather icon"
//       />

//       {weather && (
//         <div className = "weather-box">
//           <h2>{weather.name}</h2>
//           <p>Temp: {weather.main.temp} degree celcius</p>
//           <p>Humidity:{weather.main.humidity}%</p>
//           <p>Wind: {weather.wind.speed}m/s</p>
//           <p>Country:{weather.sys.country}</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default App
