
import React from 'react';

import '../animation.css';

import Waypoint from 'react-waypoint';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class SVGFloater extends React.Component {

    constructor() {
        super();
        this.state = {
            message: ""
        }
    }

    _renderSVG() {
        switch (this.state.message) {
            case "IN":
                return <img src={this.props.svgSrc} />
            default:
                return null
        }
    }

    _setMessage(msg) {
        this.setState({ message: msg });
        // console.log(this.props.svgSrc + `: Waypoint State: ${this.state.message}`);
    }

    render() {
        return (
            <div className="svgFloater">
                <Waypoint
                    onLeave={this._setMessage.bind(this, 'OUT')}
                    topOffset={-1000} />
                <Waypoint
                    onEnter={this._setMessage.bind(this, 'IN')}
                    bottomOffset={150} />
                <ReactCSSTransitionGroup
                    transitionName='svgFloater'
                    transitionAppear={true}
                    transitionAppearTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionEnterTimeout={300}>
                    {this._renderSVG()}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

