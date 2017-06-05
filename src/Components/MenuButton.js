import React, { Component } from 'react'

class HistoryButton extends Component {
    render () {
        var btnClass = "menuEntry";
        if(this.props.isCurrent) {
            btnClass = "menuEntry current";
        }
        return (
            <button className={btnClass} onClick={this.props.onClick}>{this.props.title}</button>
        )
    }
}

export default HistoryButton