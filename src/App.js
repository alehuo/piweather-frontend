import React, { Component } from 'react';
import './App.css';
import DataDashboard from './Components/DataDashboard.js'
import HistoryDashboard from './Components/HistoryDashboard.js';
import RssFeed from './Components/RssFeed.js'
import Config from './Config/appConfig.js'
import axios from 'axios'

let config = null;

/**
 * ENV
 */
if(process.env.NODE_ENV === 'production') {
  config = Config.production;
} else if(process.env.NODE_ENV === 'development'){
  config = Config.development;
}

/**
 * Humidity data
 */
const humidData = [
      {name: '07:00', data: 85},
      {name: '08:00', data: 83},
      {name: '09:00', data: 81},
      {name: '10:00', data: 98},
      {name: '11:00', data: 97},
      {name: '12:00', data: 88},
      {name: '13:00', data: 81},
];
/**
 * Temperature data
 */
const tempData = [
      {name: '07:00', data: 21},
      {name: '08:00', data: 23},
      {name: '09:00', data: 23},
      {name: '10:00', data: 22},
      {name: '11:00', data: 16},
      {name: '12:00', data: 16},
      {name: '13:00', data: 17},
];
/**
 * Pressure data
 */
const pressData = [
      {name: '07:00', data: 1020},
      {name: '08:00', data: 1018},
      {name: '09:00', data: 996},
      {name: '10:00', data: 1001},
      {name: '11:00', data: 1010},
      {name: '12:00', data: 1012},
      {name: '13:00', data: 1020},
];


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTemp: 0,
      minTemp: 0,
      avgTemp: 0,
      maxTemp: 0,
      humidity: 100,
      pressure: 1000,
      weatherCode: 3200,
      lastUpdate: 'N/A',
      city: 'N/A',
      region: 'N/A'
    };
  }

  componentDidMount () {
    //Update weather
    this.updateWeather();
    console.log('Updating weather and settings a 5-minute timer.');
    //Set weather update task
    setInterval(() => this.updateWeather(),300000);
  }

  updateWeather = () => {
    /*
    In the future the dashboard will fetch its data from a Node.js back end.
    */
    var sprintf = require("sprintf-js").sprintf;
    var query = config.weather.WEATHER_QUERY;
    query = sprintf(query,config.weather.WOEID);
    axios.get('https://query.yahooapis.com/v1/public/yql', {
      params: {
       q: query,
       format: 'json' 
      }
    }).then((res) => {
      var atmosphere = res.data.query.results.channel.atmosphere;
      var temperature = res.data.query.results.channel.item.condition.temp;
      var weatherCode = res.data.query.results.channel.item.condition.code;
      var lastUpdate = res.data.query.results.channel.lastBuildDate;
      var city = res.data.query.results.channel.location.city;
      var region = res.data.query.results.channel.location.region;
      this.setState({
        currentTemp: temperature,
        humidity: atmosphere.humidity,
        lastUpdate: lastUpdate,
        weatherCode: weatherCode,
        city: city,
        region: region
      });
      console.log('Weather data updated');
      console.log(atmosphere, temperature, weatherCode, lastUpdate);
    }).catch((err) => {
      console.log(err);
    });
  }
  

  render() {
    return (
      <div className="App">
        <div className="appTitle text">PiWeather</div>
        <div className="cards text">
        <div className="left">
          <DataDashboard 
            location={this.state.city + ', ' + this.state.region}
            currentTemperature={this.state.currentTemp} 
            minimumTemperature={this.state.minTemp} 
            averageTemperature={this.state.avgTemp} 
            maximumTemperature={this.state.maxTemp} 
            currentHumidity={this.state.humidity} 
            currentPressure={this.state.pressure} 
            weatherStatus={this.state.weatherStatus} 
            weatherCode={this.state.weatherCode}
            lastUpdate={this.state.lastUpdate}/>
          <HistoryDashboard 
            temperatureData={tempData} 
            pressureData={pressData} 
            humidityData={humidData}/></div>
        <div className="right"></div>
          <RssFeed 
            title={config.rss.TITLE} 
            url={config.rss.FEED_URL} 
            channel={config.rss.CHANNEL_ID}/>
        </div>
      </div>
    );
  }
}

export default App;
