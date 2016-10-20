
import React from 'react';

import './app.css';
import './animation.css';

import Waypoint from 'react-waypoint';
import * as snapsvg from 'snapsvg-cjs';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class SVGFloater extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
    }

    _renderSVG() {
        switch (this.state.message) {
            case "IN":
                return <ReactCSSTransitionGroup transitionName='svgFloater'
                            transitionAppear={true}
                            transitionAppearTimeout={500}
                            transitionLeaveTimeout={500}
                            transitionEnterTimeout={500}>
                            <img src={this.props.svgSrc}/>
                        </ReactCSSTransitionGroup>
            default:
                return <div className="svgFloater-placeholder" />
        }
    }

    _setMessage(msg) {
        this.setState({ message: msg });
        console.log(this.props.svgSrc + `: Waypoint State: ${this.state.message}`);
    }


    render() {
        return (
            <div style={{height: '600px'}}>
                <div className="waypoint-line">Waypoint Boundary
                    <Waypoint
                        onLeave={this._setMessage.bind(this, 'OUT')}
                        topOffset={'-2000px'} />
                </div>
                <div className="spacer">a</div>
                <div className="waypoint-line">Waypoint Boundary
                    <Waypoint
                        onEnter={this._setMessage.bind(this, 'IN')}
                        topOffset={'-1000px'}
                        bottomOffset={'200px'} />
                    {this._renderSVG()}
                </div>
            </div>
        )
    }
}




class App extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <div className="container">
                <h1>BloodPact</h1>
                <div className="spacer">a</div>
                <div className="spacer">a</div>
                <div className="spacer">a</div>
                <div className="spacer">a</div>
                <SVGFloater svgSrc="./img/bloodvial_many.svg"/>
                <div className="spacer">a</div>
                <div className="spacer">a</div>
                <SVGFloater svgSrc="./img/bloodpack.svg"/>
                <div className="spacer">a</div>
                <div className="spacer">a</div>
                <SVGFloater svgSrc="./img/doctor_she.svg"/>
                <div className="spacer">a</div>
                <div className="spacer">a</div>
            </div>
        );
    }
}


export default App;
