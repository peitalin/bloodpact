
import React from 'react';

import './app.scss';
import './animation.css';

import Waypoint from 'react-waypoint';
import * as snapsvg from 'snapsvg-cjs';
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
                return <ReactCSSTransitionGroup
                            transitionName='svgFloater'
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
            <div>
				<div className="waypoint-line"><hr/>Waypoint: Line
                    <Waypoint
                        onLeave={this._setMessage.bind(this, 'OUT')}
                        topOffset={-1200} />
                <div className="spacer" style={{lineHeight: "50px"}}><hr/></div>
                    <Waypoint
                        onEnter={this._setMessage.bind(this, 'IN')}
                        topOffset={-1000}
                        bottomOffset={200} />
                    {this._renderSVG()}
                </div>
            </div>
        )
    }
}




class App extends React.Component {

    constructor(props) {
        super();
        this.state = {
            scroll: 0
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll(event) {
        let scrollTop = event.srcElement.body.scrollTop
        this.setState({
            scroll: event.srcElement.body.scrollTop
        })
        console.log(`Scrolling: ${this.state.scroll}`);
    }

    render() {
        return (
            <div>
                <img src="./img/perfusion2.png"/>

                <h1>BloodPact: Blood-Backed Health Insurance</h1>

				<div>
                    <h1>Donate Blood and gift insurance to Family and Friends.</h1>
                </div>

                <div className='container'>
                    <div className="svgContainer">
                        <SVGFloater svgSrc="./img/blooddrop2.svg"/>
                    </div>
                    <div className="textBox">
                        <p>1) increase aggregate levels of blood donation
                            (can't just pay for blood since that's immoral and can
                            actually decrease levels of donation)</p>
                    </div>
                </div>

                <div className="spacer">a</div>

                <div className='container'>
                    <div className="svgContainer">
                        <SVGFloater svgSrc="./img/perfusion.svg"/>
                    </div>
                    <div className="textBox">
                        <p>2) Solves the "adverse selection problem" in health insurance:
                            people conceal information about their health status and their habits
                            (smoking, diet) in order to obtain cheaper premiums.</p>
                    </div>
                </div>
                <div className="spacer">a</div>
                <div className='container'>
                    <div className="svgContainer">
                        <SVGFloater svgSrc="./img/finger.svg"/>
                    </div>
                    <div className="textBox">
                        <p>3) By donating blood we can do blood tests and screen doners for
                            viable “blood-pact” candidates. This reveals information about
                            their diet, habits and actual state of health.</p>
                    </div>
                </div>
                <div className="spacer">a</div>
                <div className="svgContainer">
                    <SVGFloater svgSrc="./img/bloodvial_many.svg"/>
                </div>
                <div className="spacer">a</div>
                <div className="svgContainer">
                    <SVGFloater svgSrc="./img/bloodpack.svg"/>
                </div>
                <div className="spacer">a</div>
                <div className="svgContainer">
                    <SVGFloater svgSrc="./img/doctor_she.svg"/>
                </div>
                <div className="spacer">a</div>
            </div>
        );
    }
}


export default App;
