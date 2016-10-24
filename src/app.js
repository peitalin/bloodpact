
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
        // console.log(this.props.svgSrc + `: Waypoint State: ${this.state.message}`);
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
                    transitionAppearTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionEnterTimeout={300}>
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
            scrollTop: 0,
            lastRotationValue: 0
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll(event) {
        let bodyHeight = document.body.scrollHeight
        this.setState({
            scrollTop: event.srcElement.body.scrollTop
        })
        let scrollTop = this.state.scrollTop

        let dither = document.getElementById('parallaxDither')
        dither.style.opacity = `${scrollTop/400}`

        console.log(`Scrolling: ${this.state.scrollTop}`);

        let logo = document.getElementById('logo')
        logo.style.transform = `translate(0px, ${scrollTop/2}%)`

        let logo2 = document.getElementById('logo2')
        if (scrollTop >= window.innerHeight) {
            logo2.style.transform = `translate(0px, ${(scrollTop-window.innerHeight)/2}%)`
        }

        let logo3 = document.getElementById('logo3')
        if (scrollTop >= (window.innerHeight + 100)*2) {
            logo3.style.transform = `translate(0px, ${(scrollTop-(window.innerHeight + 100)*2)/2}%)`
        }

        let foreman = document.getElementById('fore-man')
        let foreman2 = document.getElementById('fore-man2')
        let forewoman = document.getElementById('fore-woman')

        if (scrollTop > 5) {
            foreman.style.transform = `translate(${scrollTop/(2*(1 + (5-scrollTop)/1000))}%, 0px)`
        } else {
            foreman.style.transform = `translate(${scrollTop/2}%, 0px)`
        }
        if (scrollTop > 5) {
            foreman2.style.transform = `translate(${scrollTop/(3*(1 + (5-scrollTop)/1200))}%, 0px)`
        } else {
            foreman2.style.transform = `translate(${scrollTop/3}%, 0px)`
        }
        forewoman.style.transform = `translate(${scrollTop/4}%, 0px)`



        // 1st fixed container
        let fixedContainer = document.getElementById('fixedContainer')
        if ((window.innerHeight <= scrollTop) && (scrollTop <= window.innerHeight*2+100)) {
            fixedContainer.style.position = 'fixed'
        } else {
            fixedContainer.style.position = 'relative'
        }

        // 2nd fixed container
        let fixedContainer2 = document.getElementById('fixedContainer2')
        let lowerThreshold = window.innerHeight*2 + 100
        if ((lowerThreshold <= scrollTop) && (scrollTop <= window.innerHeight*3+2*100)) {
            fixedContainer2.style.position = 'fixed'
        } else {
            fixedContainer2.style.position = 'relative'
        }





        // Heart animation
        let heart = document.getElementById('heart-beat')
        let baserate = 1/1000 // 600 scroll for 1 full rotation
        // start decay 150 scroll into the page
        let decayrate = Math.exp(-(scrollTop-150)/800)

        this.setState({ lastRotationValue: scrollTop * baserate * decayrate })

        if (scrollTop <= 650) {
            heart.style.transform = `
                translate(0px, ${scrollTop/4}%)
                rotate(${0.65 + this.state.lastRotationValue}turn)
            `
        } else {
            heart.style.transform = `
            translate(0px, ${scrollTop/(4 / (1+(scrollTop - 650)/2000))}%)
                rotate(${0.65 + this.state.lastRotationValue}turn)
            `
        }


    }

    _placeholder(threshold, n) {
        let scrollTop = this.state.scrollTop
        let lowerThreshold = threshold*n + (n-1)*100

        if ((lowerThreshold <= scrollTop) && (scrollTop <= threshold*(n+1)+n*100)) {
            return <div id='tempPlaceholder' className='container'>
                    <div className="textBox">placeholder</div>
                </div>
        } else {
            return null
        }
    }


    render() {
        return (
            <div>

                <div className='parallax' id="parallaxBox1">
                    <div id="parallaxDither"></div>
                    <img className='people' id="fore-man" src={require('./img/doctor_he2.svg')} />
                    <img className='people' id="fore-man2" src={require('./img/doctor_he4.svg')} />
                    <img className='people' id="fore-woman" src={require('./img/doctor_she.svg')} />
                    <div id="logo">
                        <h1>Bloodpact: Blood-Backed Health Insurance</h1>
                    </div>
                </div>


                {this._placeholder(window.innerHeight, 1)}
                <div id='fixedContainer' className='container'>
                    <SVGFloater svgSrc={require('./img/blooddrop2.svg')} />
                    <div className="textBox">
                        1) Increase aggregate levels of blood donation
                        (can't just pay for blood since that's immoral and can
                        actually decrease levels of donation)
                    </div>
                </div>

                <div className='parallax' id="parallaxBox2">
                    <div id="parallaxDither2"></div>
                    <img id="heart-beat" src={require("./img/heart.svg")} />
                    <div id="logo2">
                        <h1>Give Blood and Gift Insurance to Family and Friends.</h1>
                    </div>
                </div>


                {this._placeholder(window.innerHeight, 2)}
                <div id='fixedContainer2' className='container'>
                    <SVGFloater svgSrc={require("./img/perfusion.svg")} />
                    <div className="textBox">
                        2) Solves the "adverse selection problem" in health insurance:
                        people conceal information about their health status and their habits
                        (smoking, diet) to obtain cheaper premiums.
                    </div>
                </div>


                <div className='parallax' id="parallaxBox3">
                    <div id="logo3">
                        <h1>One pint saves three lives</h1>
                    </div>
                </div>

                <div className='container'>
                    <SVGFloater svgSrc={require("./img/finger.svg")} />
                    <div className="textBox">
                        3) By donating blood we can do blood tests and screen doners for
                        viable “blood-pact” candidates. This reveals better information about
                        their diet, habits and actual state of health.
                    </div>
                </div>

                <div className="spacer">a</div>

                <div className='container'>
                    <SVGFloater svgSrc={require("./img/bloodpack.svg")} />
                    <div className="textBox">
                        Also, blood stocks are not just low, they are unpredictably low.
                        People give blood at random times throughout their lives.
                        Bloodpact bascially provides a reliable and predictable stream of blood donations,
                        so that hospitals will be better at planning and allocating blood over seasons.
                    </div>
                </div>

                <div className="spacer">a</div>

                <div className='container'>
                    <SVGFloater svgSrc={require("./img/transfusion2.svg")} />
                    <div className="textBox">
                        Blood Pact devotees will be assigned different days/months throughout
                        the year to obtain even spread in aggregate blood donations.
                        No waste, no over or undersupply across time. Predictable blood donations.
                    </div>
                </div>

                <div className="spacer">a</div>
                <div className="spacer">a</div>
            </div>
        );
    }
}


export default App;
