import React, {
    Component
} from 'react'
import axios from 'axios'
import xml2js from 'xml2js'

/**
 * Component for fetching RSS feeds from the Internet
 */
class RssFeed extends Component {

    constructor(props) {
        super(props)
        this.state = {
            xmlData : []
        };
    }

    componentDidMount() {
        axios.get(this.props.url).then((res) => {
            var parseString = xml2js.parseString;
            parseString(res.data, (error, result) => {
                var news = result.rss.channel[this.props.channel].item;
                this.setState({
                    xmlData: news
                });
            });
        }).catch((err) => console.log(err));
    }

    render() {
        return ( 
            <div className="rssFeed">
                <div className="rssFeedTitle"><i className="fa fa-rss-square"></i><span> {this.props.title}</span></div>
                <div className="newsPosts">
                    {this.state.xmlData.map((obj) => {
                        var newsTitle = obj.title.toString().substring(0,35) + "..."
                    return (
                        <div key={obj.title} className="newsPost">
                            <a className="newsPostTitle text" href={obj.link} target="_blank" rel="noopener noreferrer">{newsTitle}</a>
                        </div>
                    )
                    })}
                </div>
            </div>
        )
    }
}

export default RssFeed