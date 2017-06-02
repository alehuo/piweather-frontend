//import liraries
import React, { Component } from 'react';

// create a component
class TemperatureDashboard extends Component {
    render() {
        return (
            <div className="dashboard dataElement">
                <div className="temperatureDashboard">
                    <div className="dashboardWrapper">
                        <div className="currentTemperature">
                            <span className="currentTemperatureReading">{this.props.currentTemperature | '0.0'}</span>
                            <span className="currentTemperatureUnit">&deg;C</span>
                        </div>
                        <div className="weatherForecast">
                            <i className="wi wi-day-cloudy weatherIcon"></i><span>Partially cloudy</span>
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
            </div>
        );
    }
}

//make this component available to the app
export default TemperatureDashboard;
