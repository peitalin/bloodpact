
import React from "react";
import ReactDOM from 'react-dom';

import { TweenMax } from 'gsap'
import { throttle } from 'lodash'

import Form from './components/Form.js'
import Mountain1 from './components/Mountain1.js'
import Calendar from './components/Calendar.js'
import { SwitchDiv, SwitchSpacer, SwitchGraphLabels } from './components/SwitchElems.js'


import './app.sass'
import './components/mountains.sass'
import './components/premiums.sass'
import './components/Parallax.scss'




class MainSite extends React.Component {

    constructor(props) {
        super();
        this.state = {
            scrollTop: 0,
            threshold1: 0,
            threshold2: 0,
            threshold3: 0,
            windowHeight: 0,
            windowWidth: 0,
            animations: true,
            signUp: false,
            eggshell: '#f7f4e9',
            raisinblack: '#270b20',
            raisinpurple: '#703a53',
            elems: {},
        }
        // ALWAYS BIND IN CONSTRUCTOR
        this.handleScroll = throttle(this.handleScroll.bind(this), 150)
        this.handleResize = throttle(this.handleResize.bind(this), 150)
    }

    handleResize() {
        if (this.state.windowHeight == window.innerHeight && this.state.windowWidth == window.innerWidth) {
            return;
        } else {
            // console.log(`windowHeight: ${window.innerHeight}, windowWidth: ${window.innerWidth}`);
            this.setState({
                windowWidth: window.innerWidth
            })
            // let fixedContainerHeight = document.getElementById('fixedContainer1').clientHeight
            this.setState({
                // threshold1: window.innerHeight * 1/6,
                threshold1: window.innerHeight * 1/5,
                // threshold2: window.innerHeight * 2/6,
                threshold2: window.innerHeight * 100,
                threshold3: window.innerHeight,
            })
        }
        this.scaleParallaxHeight()
    }

    componentDidMount() {
        window.addEventListener( 'scroll', this.handleScroll );
        window.addEventListener( 'resize', this.handleResize )
        this.handleResize()
        this.setState({
            elems: {
                logo1: document.getElementById('logo1'),
                logoButtons: document.getElementById('logoButtons'),
                mount1: document.getElementById('mount1'),
                mount1axes: document.getElementById('mount1axes'),
                mount2: document.getElementById('mount2'),
                mount3: document.getElementById('mount3'),
                mount4: document.getElementById('mount4'),
                mount4supply: document.getElementById('mount4supply'),
                mount5: document.getElementById('mount5'),
                mount6: document.getElementById('mount6'),
                mount6demand: document.getElementById('mount6demand'),
                mount7: document.getElementById('mount7'),
                parallaxBox1: document.getElementById('parallaxBox1'),
            }
        })

    }

    componentWillUnmount() {
        window.removeEventListener( 'scroll', this.handleScroll );
        window.removeEventListener( 'resize', this.handleResize )
    }

    toggleParallax() {
        if (this.state.animations === false) {
            this.setState({animations: true})
            // window.scroll(0, this.state.threshold1 + 80)
        } else {
            this.setState({animations: false})
        }
    }

    scaleParallaxHeight() {
        var viewportRatio = window.innerWidth / window.innerHeight
        var viewportScale = (viewportRatio > 1.4) ? 0.3 : 0.25
        document.getElementById("parallaxBox1").style.transitionDuration = "height 200ms ease"
        document.getElementById("parallaxBox1").style.height = `
            ${Math.round( (viewportRatio - viewportScale * viewportRatio) * 100 )}vh
        `

        setTimeout(function() {
            document.getElementById("parallaxBox1").style.transitionDuration = "height 20000s ease"
        }, 200)
        // document.getElementById("parallaxBox1").style.transitionDuration = "height 20s ease"
        // temporary fix, make screen transition so slow that there is not jank on android mobile
        // problem is the auto-hiding url-bar on mobile browsers

        // var calendarScale = (1/viewportRatio * 10 < 8) ? 8 : 1/viewportRatio * 10
        // document.getElementsByClassName("calendar")[0].style.bottom = `${ calendarScale }%`
    }


    handleScroll(event) {

        function getScrollTop(event) {
            let e = event || window.event
            let srcElement = e.target || e.srcElement
            return srcElement.documentElement.scrollTop || srcElement.body.scrollTop
        }

        if (window.innerHeight > window.innerWidth) {
            this.setState({
                scrollTop: event ? getScrollTop(event) : 0,
                animations: false
            })
        } else {
            this.setState({
                scrollTop: event ? getScrollTop(event) : 0,
            })
        }
        let scrollTop = this.state.scrollTop
        // console.log(scrollTop);

        let { mount7, mount6, mount6demand, mount5,
                mount4, mount4supply, mount3, mount2, mount1, mount1axes,
                logo1, logoButtons, parallaxBox1 } = this.state.elems
        let { threshold1, threshold2, threshold3 } = this.state


        if (this.state.animations === true) {
            if ( scrollTop <= threshold1 * 5 ) {
                // lets browser know ahead of time about CSS transforms
                mount2.style.willchange = 'opacity transform'
                mount3.style.willchange = 'opacity transform'
                mount4.style.willchange = 'opacity transform'
                mount4supply.style.willchange = 'opacity transform'
                mount5.style.willchange = 'opacity transform'
                mount6.style.willchange = 'opacity transform'
                mount6demand.style.willchange = 'opacity transform'
                mount7.style.willchange = 'opacity transform'
            } else {
                mount2.style.willchange = 'initial'
                mount3.style.willchange = 'initial'
                mount4.style.willchange = 'initial'
                mount4supply.style.willchange = 'initial'
                mount5.style.willchange = 'initial'
                mount6.style.willchange = 'initial'
                mount6demand.style.willchange = 'initial'
                mount7.style.willchange = 'initial'
            }


            // parallax window 1
            if ( scrollTop <= threshold1 ) {

                mount7.style.transform = `translate3d(0, ${scrollTop/1.0}px, 0)`
                mount6.style.transform = `translate3d(0, ${scrollTop/1.1}px, 0)`
                mount6demand.style.transform = `translate3d(0, ${scrollTop/1.1}px, 0)`
                mount5.style.transform = `translate3d(0, ${scrollTop/1.4}px, 0)`
                mount4.style.transform = `translate3d(0, ${scrollTop/1.6}px, 0)`
                mount4supply.style.transform = `translate3d(0, ${scrollTop/1.6}px, 0)`
                mount3.style.transform = `translate3d(0, ${scrollTop/2.0}px, 0)`
                mount2.style.transform = `translate3d(0, ${scrollTop/2.6}px, 0)`
                mount1axes.style.transform = `translate3d(0, 10px, 0)`

                TweenMax.to("#mount7", .2, {opacity: 1})
                TweenMax.to("#mount6", .2, {opacity: 1})
                TweenMax.to("#mount5", .2, {opacity: 1})
                TweenMax.to("#mount4", .2, {opacity: 1})
                TweenMax.to("#mount3", .2, {opacity: 1})
                TweenMax.to("#mount2", .2, {opacity: 1})
                TweenMax.to("#mount1polygon", .4, {morphSVG: "#mount1polygon"})
                TweenMax.to(".logo", .2, {opacity: 1})

                // TweenMax.to("#alexa", .2, {opacity: 1})
                // TweenMax.to("#alexa", 0, {scale: 1 + scrollTop/2000, y: scrollTop/1.2, x: -scrollTop/10})
                logo1.style.transform = `translate3d(0, ${scrollTop/1.6}px, 0)`
                logoButtons.style.transform = `translate3d(0, ${scrollTop/1.6}px, 0)`

                TweenMax.to("#mount6demand", .2, {opacity: 0})
                TweenMax.to("#mount4supply", .2, {opacity: 0})

                TweenMax.to("#mount1axes", .2, {opacity: 0})
                // TweenMax.to(".calendar", .2, {opacity: 0})
                TweenMax.to(".blood_graph_text", .2, {opacity: 0})
                TweenMax.to("#parallaxTextbox", .2, {opacity: 0})

            } else {
                let scrollTopThreshold = threshold1
                logo1.style.transform = `translate3d(0, ${scrollTop/1.6}px, 0)`
                logoButtons.style.transform = `translate3d(0, ${scrollTop/1.6}px, 0)`
                mount7.style.transform = `translate3d(0, ${scrollTopThreshold/1.0}px, 0)`
                mount6.style.transform = `translate3d(0, ${scrollTopThreshold/1.1}px, 0)`
                mount6demand.style.transform = `translate3d(0, ${scrollTopThreshold/1.1}px, 0)`
                mount5.style.transform = `translate3d(0, ${scrollTopThreshold/1.3}px, 0)`
                mount4.style.transform = `translate3d(0, ${scrollTopThreshold/1.5}px, 0)`
                mount4supply.style.transform = `translate3d(0, ${scrollTopThreshold/1.5}px, 0)`
                mount3.style.transform = `translate3d(0, ${scrollTopThreshold/2.0}px, 0)`
                mount2.style.transform = `translate3d(0, ${scrollTopThreshold/2.6}px, 0)`

                TweenMax.to("#mount7", .2, {opacity: 0})
                TweenMax.to("#mount6", .2, {opacity: 0})
                TweenMax.to("#mount5", .2, {opacity: 0})
                TweenMax.to("#mount4", .2, {opacity: 0})
                TweenMax.to("#mount3", .2, {opacity: 0})
                TweenMax.to("#mount2", .2, {opacity: 0})
                TweenMax.to("#mount1polygon", .4, {morphSVG: "#mount1rect"})
                TweenMax.to(".logo", .2, {opacity: 0})


                TweenMax.to("#mount1axes", .2, {opacity: 1})
                mount1axes.style.transform = `translate3d(0, 10px, 0)`
                // TweenMax.to(".calendar", .2, {opacity: 1})
                TweenMax.to("#parallaxTextbox", .4, {opacity: 1})

            }

            if ( threshold1 <= scrollTop ) {
                TweenMax.to("#mount6demand", .2, {opacity: 1})
                TweenMax.to("#mount4supply", .2, {opacity: 1})
                TweenMax.to(".blood_graph_text", .1, {opacity: 1})
            } else {
                TweenMax.to("#mount6demand", .2, {opacity: 0})
                TweenMax.to("#mount4supply", .2, {opacity: 0})
                TweenMax.to(".blood_graph_text", .1, {opacity: 0})
            }


            // if ( threshold1 <= scrollTop && scrollTop <= threshold2 ) {
            //     TweenMax.to("#mount6demand", .2, {opacity: 1})
            //     TweenMax.to("#mount4supply", .2, {opacity: 1})
            //     TweenMax.to(".blood_graph_text", .1, {opacity: 1})
            // } else {
            //     TweenMax.to("#mount6demand", .2, {opacity: 0})
            //     TweenMax.to("#mount4supply", .2, {opacity: 0})
            //     TweenMax.to(".blood_graph_text", .1, {opacity: 0})
            // }
            //

            // if ( threshold2 <= scrollTop) {
            //     TweenMax.to(".premiums", .1, {opacity: 1})
            //     TweenMax.to(".premiums_graph_text", .1, {opacity: 1})
            //     TweenMax.to(".solution_text", .1, {opacity: 1})
            //     TweenMax.to(".year", 1, {opacity: 1})
            // } else {
            //     TweenMax.to(".premiums", .1, {opacity: 0})
            //     TweenMax.to(".premiums_graph_text", .1, {opacity: 0})
            //     TweenMax.to(".solution_text", .1, {opacity: 0})
            //     TweenMax.to(".year", .1, {opacity: 0})
            // }

        }

        if ( threshold1 < scrollTop ) {
            TweenMax.to("#navBar", 0.2, {opacity: 0})
        } else {
            TweenMax.to("#navBar", 0.2, {opacity: 1})
        }

        if ( threshold1 < scrollTop ) {
            this.setState({signUp: false})
            TweenMax.to("#popUp", 0.2, {opacity: 0})
        }
        if ( scrollTop > threshold3 * 2 ) {
            this.setState({signUp: true})
            TweenMax.to("#popUp", 0.2, {opacity: 1})
        }

    }

    toggleSignup() {
        if (this.state.signUp == false) {
            this.setState({signUp: true})
            TweenMax.to("#popUp", 0.2, {opacity: 1})
        } else {
            this.setState({signUp: false})
            TweenMax.to("#popUp", 0.2, {opacity: 0})
        }
    }

    render() {
        return (
            <div>
                <div className="parallax" id="parallaxBox1">
                    <img id="mount7" className='mountain' src={require("./img/mount7.svg")} />
                    <img id="mount6" className='mountain' src={require("./img/mount6.svg")} />
                    <img id="mount6demand" className='mountain' src={require("./img/mount6demand.svg")} />
                    <img id="mount5" className='mountain' src={require("./img/mount5.svg")} />
                    <img id="mount4" className='mountain' src={require("./img/mount4.svg")} />
                    <img id="mount4supply" className='mountain' src={require("./img/mount4supply.svg")} />
                    <img id="mount3" className='mountain' src={require("./img/mount3.svg")} />
                    <img id="mount2" className='mountain' src={require("./img/mount2.svg")} />
                    <img id="mount1axes" className='mountain' src={require("./img/axes.svg")} />

                    <img id="premiums_family" className="premiums" src={require("./img/premiums_family.svg")} />
                    <img id="premiums_individual" className="premiums" src={require("./img/premiums_individual.svg")} />

                    <SwitchGraphLabels scrollTop={this.state.scrollTop} threshold={this.state.threshold2} />

                    <div id="parallaxTextbox">
                        <SwitchDiv className="mainTextBox"
                            scrollTop={this.state.scrollTop}
                            threshold={this.state.threshold2} />
                    </div>

                    <Mountain1 id="mount1" fill={this.state.rainsinblack} />

                    <img id="logo1" className="logo" src={require("./img/dark_logo_transparent_background.svg")} />
                    <div className="logo" id="logoButtons">
                        <button className="signupButtonMain" onClick={this.toggleSignup.bind(this)}> Sign Up </button>
                        <span> </span>
                        <button className="signupButtonMain" onClick={this.toggleParallax.bind(this)}>
                            { this.state.animations ? "Parallax Off" : "Parallax On" }
                        </button>
                    </div>
                </div>



                <div className="spacerDark"></div>
                <div className="spacerDark"></div>
                <div className="spacerDark"></div>
                <div className="solution_text">
                    <h1>Cheap, Comprehensive Health Cover for Blood Donors.</h1>
                </div>
                <div className="spacerDark"></div>
                <div className="spacerDark"></div>
                <div className="spacerDark"></div>
                <div className="spacerDark"></div>


                <div id={"fixedContainer2"} className="containerDark">
                    <div id="fixMobileBorders" style={{backgroundColor: this.state.raisinblack}}>
                        <h1>Save a Life and Save on Insurance Premiums.</h1>

                        <h2>1) Join Bloodpact</h2>
                            <img className="svgIcon" src={require("./img/fake-blood.svg")} />
                            <div className="textBox">
                                Sign up and link health insurance details.
                                We schedule a time for you to give blood twice a year.
                            </div>
                        <div className="spacerDark"></div>

                        <div className="mainTextBox">
                            <img className="svgIcon" src={require("./img/piggy_bank.svg")} />
                            <h2>2) Lower Insurance Premiums</h2>
                            You are eligible for health cover savings.
                        </div>
                        <div className="spacerDark"></div>

                        <div className="mainTextBox">
                            <img className="svgIcon" src={require("./img/contract.svg")} />
                            <h2>3) Blood Data Analysis</h2>
                            Opt to share blood data with medical researchers and actuaries.<br/>
                            We sell the data to further reduce health premiums.
                        </div>
                        <div className="spacerDark"></div>

                        <div className="mainTextBox">
                            <img className="svgIcon" src={require("./img/gift.svg")} />
                            <h2>4) Reward Others</h2>
                            Vote to fund:<br/>
                            a) Medical research, or <br/>
                            b) A patient at <a href="http://www.watsi.org">Watsi.org</a>.
                        </div>
                        <div className="spacerDark"></div>


                        <img className="bannerPic" src={require("./img/bg5.png")} style={{width: "100vw"}}/>

                        <div className="spacerDark"></div>
                        <div className="mainTextBox">
                            <img className="svgIcon" src={require("./img/security.svg")} />
                            <h2>Information is kept secure</h2>
                            All medical data is encrypted, aggregated and anonymous.
                        </div>
                        <div className="spacerDark"></div>
                    </div>
                </div>

                <div className="spacerDark"></div>
                <div className="spacerDark"></div>
                <div className="spacerDark"></div>
                <div className="spacerDark"></div>

            </div>
        );
    }
}




const SignUp = () => (
    <div id="popUp">
        <h2>Sign up for more Information</h2>
        <div className="textBox">
            <Form />
        </div>
    </div>
)


const App = () => {
    return (
        <div>
            <MainSite />
            <SignUp />
        </div>
    )
}



export default App;
