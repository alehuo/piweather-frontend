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
      lastUpdate: 'N/A'
    };
  }

  componentDidMount () {
    //Update weather
    this.updateWeather();
    console.log('Updating weather and settings a 5-minute timer.');
    //Set weather update task
    //setInterval(() => this.updateWeather(),300000);
    setInterval(() => this.updateWeather(),5000);
  }

  updateWeather = () => {
    axios.get(config.backend.URL).then((res) => {
      this.setState({
        currentTemp: res.data.outerTemperature,
        humidity: res.data.outerHumidity,
        pressure: res.data.outerPressure,
        weatherCode: res.data.weatherCode
      });
      console.log(res);
    }).catch((err) => {
      console.error(err);
    }); 
  }
  

  render() {
    return (
      <div className="App">
        <div className="appTitle text">PiWeather</div>
        <div className="cards text">
        <div className="left">
          <DataDashboard 
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
