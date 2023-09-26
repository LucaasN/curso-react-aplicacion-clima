import React, {useState} from 'react'

export const WeatherApp = () => {

  const [ciudad, setCiudad] = useState('');
  const [dataClima, setDataClima] = useState(null)
  const difKelvin = 273.15;

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  }

  const fetchClima = async () =>{
    try{
      //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
      const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
      const API_KEY = '3f08d27d1141bd36dea478d6a63d85ec';
      const cityName = ciudad;
      const response = await fetch(`${urlBase}?q=${cityName}&appid=${API_KEY}`)
      const data = await response.json();
      setDataClima(data);
    } catch(error){
        console.error(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(ciudad) fetchClima();
  }

  return (
    <div className='container'>
      <h1>Aplicacion de Clima</h1>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={ciudad}
          onChange={handleCambioCiudad}
          />
        <button type='submit'>Buscar</button>
      </form>

      {
        dataClima && (
          <div>
            <h3>{dataClima.name}</h3>
            <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C </p>
            <p>Condicion meteorologica: {dataClima?.weather[0]?.description}</p>
            <img src={` https://openweathermap.org/img/wn/${dataClima?.weather[0]?.icon}.png`} alt="icon-clima" />
          </div>
        )
      }
    </div>
  )
}
