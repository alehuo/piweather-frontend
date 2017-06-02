import React, { Component } from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import MenuButton from './MenuButton.js'

/**
 * Component for showing weather history
 */
class HistoryDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource : 'temperature',
            activeIndex: 0
        };
    }

    render () {

        let data2 = null;

        if (this.state.dataSource === 'temperature') {
            data2 = this.props.temperatureData;
        } else if (this.state.dataSource === 'pressure') {
            data2 = this.props.pressureData;
        } else if (this.state.dataSource === 'humidity') {
            data2 = this.props.humidityData;
        }

        return (
        <div className="history">
          <div className="menubar">
          <MenuButton isCurrent={this.state.activeIndex === 0} onClick={() => this.setState({dataSource: 'temperature', activeIndex: 0})} title="Temperature"/>
          <MenuButton isCurrent={this.state.activeIndex === 1} onClick={() => this.setState({dataSource: 'humidity', activeIndex: 1})} title="Humidity"/>
          <MenuButton isCurrent={this.state.activeIndex === 2} onClick={() => this.setState({dataSource: 'pressure', activeIndex: 2})} title="Pressure"/>
          </div>
          <div className="historyContent">
            <LineChart width={500} height={300} data={data2} margin={{top: 10, bottom: 10, left: 10, right: 10}}>
                <XAxis stroke="#FAFAFA" dataKey="name" padding={{left: 30, right: 30}}/>
                <YAxis stroke="#FAFAFA" padding={{top: 30, bottom: 30}}/>
                <CartesianGrid/>
                <Tooltip/>
                <Line type="monotone" dataKey="data" activeDot={{r: 3}} stroke="#FAFAFA" />
            </LineChart>
          </div>
        </div>
        )
    }
}

export default HistoryDashboard