
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
            elems: {}
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));

        this.setState({
            elems: {
                logo1: document.getElementById('logo1'),
                logo2: document.getElementById('logo2'),
                logo3: document.getElementById('logo3'),

                dither1: document.getElementById('parallaxDither1'),
                dither2: document.getElementById('parallaxDither2'),
                dither3: document.getElementById('parallaxDither3'),

                forewoman: document.getElementById('fore-woman'),
                foreman1: document.getElementById('fore-man1'),
                foreman2: document.getElementById('fore-man2'),

                fixedContainer1: document.getElementById('fixedContainer1'),
                fixedContainer2: document.getElementById('fixedContainer2'),
                fixedContainer3: document.getElementById('fixedContainer3'),
            }
        })

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll(event) {

        this.setState({
            scrollTop: event.srcElement.body.scrollTop
        })
        let scrollTop = this.state.scrollTop
        let elems = this.state.elems
        // console.log(`Scrolling: ${this.state.scrollTop}`);

        // move document.getElementById('') to componentDidMount for performance
        // so that it won't lookup elemens every time there is a scroll event
        let logo1 = elems.logo1
        let logo2 = elems.logo2
        let logo3 = elems.logo3
        let dither1 = elems.dither1
        let dither2 = elems.dither2
        let dither3 = elems.dither3
        let forewoman = elems.forewoman
        let foreman1 = elems.foreman1
        let foreman2 = elems.foreman2
        let fixedContainer1 = elems.fixedContainer1
        let fixedContainer2 = elems.fixedContainer2
        let fixedContainer3 = elems.fixedContainer3



        // parallax
        logo1.style.transform = `translate(0px, ${scrollTop/2}%)`
        dither1.style.opacity = `${scrollTop/400}`

        if ( scrollTop >= window.innerHeight ) {
            let scale2 = scrollTop - window.innerHeight
            logo2.style.transform = `translate(0px, ${scale2/2}%)`
            dither2.style.opacity = `${scale2/400}`
        } else {
            dither2.style.opacity = `0`
        }

        if ( scrollTop >= (window.innerHeight + 100)*2 ) {
            let scale3 = scrollTop - (window.innerHeight + 100) * 2
            logo3.style.transform = `translate(0px, ${scale3/2}%)`
            dither3.style.opacity = `${scale3/400}`
        } else {
            dither3.style.opacity = `0`
        }


        // people sliders
        if (scrollTop < window.innerHeight) {
            forewoman.style.transform = `translate(${scrollTop/4}%, 0px)`
            foreman1.style.transform = `translate(${scrollTop/(3*(1 + (5-scrollTop)/1200))}%, 0px)`
            foreman2.style.transform = `translate(${scrollTop/(2*(1 + (5-scrollTop)/1000))}%, 0px)`
        }



        //// THRESHOLDS FOR Fixed containers/placeholders
        // Must be here, otherwise breaks on window resize
        // window-height * 2 plus 100px for the placeholder
        let threshold1 = window.innerHeight*2 + 100
        // window height * 3 plus 200px for the 2 placeholders
        let threshold2 = window.innerHeight*3 + 2*100
        // window height * 4 plus 300px for the 3 placeholders
        let threshold3 = window.innerHeight*4 + 3*100

        // 1st fixed container
        if (window.innerHeight <= scrollTop && scrollTop <= threshold1) {
            fixedContainer1.style.position = 'fixed'
        } else {
            fixedContainer1.style.position = 'relative'
        }
        // 2nd fixed container
        if (threshold1 <= scrollTop && scrollTop <= threshold2) {
            fixedContainer2.style.position = 'fixed'
        } else {
            fixedContainer2.style.position = 'relative'
        }
        // 3rd fixed container
        if (threshold2 <= scrollTop && scrollTop <= threshold3) {
            fixedContainer3.style.position = 'fixed'
        } else {
            fixedContainer3.style.position = 'relative'
        }


        // Heart animation
        let heart = document.getElementById('heart-beat')
        let baserate = 1/1000 // 600 scroll for 1 full rotation
        // start decay 150 scroll into the page
        let decayrate = Math.exp(-(scrollTop-150)/800)
        let lastRotationValue = scrollTop * baserate * decayrate

        if (scrollTop <= 650) {
            heart.style.transform = `
                translate(0px, ${scrollTop/4}%)
                rotate(${0.65 + lastRotationValue}turn)
            `
        }
        if (scrollTop > 650 && scrollTop < window.innerHeight*2) {
            heart.style.transform = `
            translate(0px, ${scrollTop/(4 / (1+(scrollTop - 650)/2000))}%)
                rotate(${0.65 + lastRotationValue}turn)
            `
        }


    }

    _placeholder(threshold, n) {
        let scrollTop = this.state.scrollTop
        let lowerThreshold = threshold*n + (n-1)*100

        if (lowerThreshold <= scrollTop && scrollTop <= threshold*(n+1) + n*100) {
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
                    <div className='dither' id="parallaxDither1"></div>
                    <img className='people' id="fore-man2" src={require('./img/doctor_he2.svg')} />
                    <img className='people' id="fore-man1" src={require('./img/doctor_he4.svg')} />
                    <img className='people' id="fore-woman" src={require('./img/doctor_she.svg')} />
                    <div className='logo' id="logo1">
                        <h1>Bloodpact: Blood-Backed Health Insurance</h1>
                    </div>
                </div>


                {this._placeholder(window.innerHeight, 1)}
                <div id='fixedContainer1' className='container'>
                    <SVGFloater svgSrc={require('./img/blooddrop2.svg')} />
                    <div className="textBox">
                        1) Increase aggregate levels of blood donation
                        (can't just pay for blood since that's immoral and can
                        actually decrease levels of donation)
                    </div>
                </div>

                <div className='parallax' id="parallaxBox2">
                    <div className='dither' id="parallaxDither2"></div>
                    <img id="heart-beat" src={require("./img/heart.svg")} />
                    <div className='logo' id="logo2">
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
                    <div className='dither' id="parallaxDither3"></div>
                    <div className='logo' id="logo3">
                        <h1>One pint saves three lives</h1>
                    </div>
                </div>


                {this._placeholder(window.innerHeight, 3)}
                <div id='fixedContainer3' className='container'>
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
                <div className="spacer">a</div>
                <div className="spacer">a</div>
            </div>
        );
    }
}


export default App;
