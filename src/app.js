
import React from 'react';

import './app.sass';
import './animation.css';

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
        console.log(this.props.svgSrc + `: Waypoint State: ${this.state.message}`);
    }


    render() {
        return (
            <div className="svgFloater">
                <Waypoint
                    onLeave={this._setMessage.bind(this, 'OUT')}
                    topOffset={-1000}
                />
                <Waypoint
                    onEnter={this._setMessage.bind(this, 'IN')}
                    bottomOffset={150}
                />
                <ReactCSSTransitionGroup
                    transitionName='svgFloater'
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionLeaveTimeout={500}
                    transitionEnterTimeout={500}>
                    {this._renderSVG()}
                </ReactCSSTransitionGroup>
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
        // console.log(`Scrolling: ${this.state.scroll}`);
    }

    render() {
        return (
            <div>

                <div className="parallaxBox">
                    <div className="logo">
                        <h1>BloodPact: Blood-Backed Health Insurance</h1>
                    </div>
                    <div className="fore-heart"></div>
                </div>

                <h1>Donate Blood and gift insurance to Family and Friends.</h1>
                <div className='container'>
                    <SVGFloater svgSrc={require('./img/blooddrop2.svg')} />
                    <div className="textBox">
                        1) increase aggregate levels of blood donation
                        (can't just pay for blood since that's immoral and can
                        actually decrease levels of donation)
                    </div>
                </div>

                <div className="spacer">a</div>

                <div className='container'>
                    <SVGFloater svgSrc={require("./img/perfusion.svg")} />
                    <div className="textBox">
                        2) Solves the "adverse selection problem" in health insurance:
                        people conceal information about their health status and their habits
                        (smoking, diet) in order to obtain cheaper premiums.
                    </div>
                </div>
                <div className="spacer">a</div>
                <div className='container'>
                    <SVGFloater svgSrc={require("./img/finger.svg")} />
                    <div className="textBox">
                        3) By donating blood we can do blood tests and screen doners for
                        viable “blood-pact” candidates. This reveals information about
                        their diet, habits and actual state of health.
                    </div>
                </div>
                <div className="spacer">a</div>
                <SVGFloater svgSrc={require("./img/bloodvial_many.svg")} />
                <div className="spacer">a</div>
                <SVGFloater svgSrc={require("./img/bloodpack.svg")} />
                <div className="spacer">a</div>
                <SVGFloater svgSrc={require("./img/doctor_she.svg")} />
                <div className="spacer">a</div>
            </div>
        );
    }
}


export default App;
