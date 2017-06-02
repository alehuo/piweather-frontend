import React, { Component } from 'react';
import './App.css';
import DataDashboard from './DataDashboard.js'
import HistoryDashboard from './HistoryDashboard.js';
import RssFeed from './RssFeed.js'


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
  render() {
    return (
      <div className="App">
        <div className="appTitle text">PiWeather</div>
        <div className="cards text">
        <div className="left">
          <DataDashboard currentTemperature={'25.8'} minimumTemperature={'-8.5'} averageTemperature={'17.6'} maximumTemperature={'27.1'} currentHumidity={'88'} currentPressure={'1013'}/>
          <HistoryDashboard temperatureData={tempData} pressureData={pressData} humidityData={humidData}/></div>
        <div className="right"></div>
          <RssFeed title="MTV.fi" url="http://www.mtv.fi/api/feed/rss/uutiset_saa"/>
        </div>
      </div>
    );
  }
}

export default App;
