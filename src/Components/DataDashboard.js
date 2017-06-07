//import liraries
import React, { Component } from 'react';
import moment from 'moment'
import weatherCodes from '../Config/weatherCodes'

// create a component
class TemperatureDashboard extends Component {
    
    render() {
        var currentWeather = weatherCodes[this.props.weatherCode];
        var weatherIcon = 'wi';
        weatherIcon += ' ' + currentWeather.icon;
        weatherIcon += ' weatherIcon';
        console.log(weatherIcon)
        return (
            <div className="dashboard dataElement">
                <div className="dashboardTitle"><i className="fa fa-map-marker"></i><span> {this.props.location}</span></div>
                <div className="temperatureDashboard">
                    <div className="dashboardWrapper">
                        <div className="currentTemperature">
                            <span className="currentTemperatureReading">{this.props.currentTemperature | '0.0'}</span>
                            <span className="currentTemperatureUnit">&deg;C</span>
                        </div>
                        <div className="weatherForecast">
                            <i className={weatherIcon}></i><span className="weatherForecastDesc">{currentWeather.title}</span>
                        </div>
                    </div>
                    <div className="mlhTemperature">
                        <span className="mlhTemperatureChild"><span>min&nbsp;&nbsp;</span><span className="reading">{this.props.minimumTemperature | '0.0'}</span> &deg;C</span>
                        <span className="mlhTemperatureChild"><span>avg&nbsp;&nbsp;</span><span className="reading">{this.props.averageTemperature | '0.0'}</span> &deg;C</span>
                        <span className="mlhTemperatureChild"><span>max&nbsp;&nbsp;</span><span className="reading">{this.props.maximumTemperature | '0.0'}</span> &deg;C</span>
                    </div>
                </div>
                <div className="pressureHumidityDashboard">
                    <span className="pressureHumidityChild">
                        <span>humidity&nbsp;&nbsp;</span> 
                        <span className="reading">{this.props.currentHumidity | '0.0'}</span>
                        <span className="unit"> %</span>
                    </span>
                    <span className="pressureHumidityChild">
                        <span>pressure&nbsp;&nbsp;</span> 
                        <span className="reading">{this.props.currentPressure | '1020'}</span>
                        <span className="unit"> hPa</span>
                    </span>
                </div>
                <div className="dataDashboardFooter">Data from Yahoo! Weather API. Last update {moment(Date(this.props.lastUpdate)).format('MMMM Do, H:mm:ss')}</div>
            </div>
        );
    }
}

//make this component available to the app
export default TemperatureDashboard;
