

import React from 'react'
import './app.sass'
import './sun.scss'
import FixedContainer from './components/FixedContainer.js'
import Parallax from './components/Parallax.js'
import Form from './components/Form.js'
// import { Field, reduxForm } from 'redux-form'

import * as gsap from 'gsap'
import { TweenLite, TweenMax } from 'gsap'

import Mountain1 from './components/mountain1.js'
import Premiums from './components/premiums.js'
import Vessel from './components/bloodvessel.js'




class App extends React.Component {

    constructor(props) {
        super();
        this.state = {
            scrollTop: 0,
            threshold1: 0,
            threshold2: 0,
            threshold3: 0,
            threshold4: 0,
            threshold5: 0,
            bannerHeight: 0,
            windowHeight: 0,
            elems: {},
        }
    }

    handleResize() {
        if (this.state.windowHeight == window.innerHeight) {
            return;
        } else {
            console.log('windowHeight changed!');
            this.setState({
                windowHeight: window.innerHeight,
                bannerHeight: document.getElementById('fixedContainer1').clientHeight
            })
            // THRESHOLDS FOR Fixed containers/placeholders
            // window-height * n plus (n-1)*100px for the placeholder
            const getWindowThreshold = (n) => {
                return (window.innerHeight*1.4 + 300 + (n-1)*(window.innerHeight + this.state.bannerHeight))
            }
            this.setState({
                threshold1: window.innerHeight,
                threshold2: getWindowThreshold(2),
                threshold3: getWindowThreshold(3),
            })
        }
    }

    componentDidMount() {
        window.addEventListener( 'scroll', this.handleScroll.bind(this));
        window.addEventListener('onresize', this.handleResize.bind(this))

        this.setState({
            elems: {
                logo1: document.getElementById('logo1'),
                logo2: document.getElementById('logo2'),
                logo3: document.getElementById('logo3'),
                logo4: document.getElementById('logo4'),

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
                parallaxBox2: document.getElementById('parallaxBox2'),
                parallaxBox3: document.getElementById('parallaxBox3'),
                parallaxBox4: document.getElementById('parallaxBox4'),
                popUp: document.getElementById('popUp')
            }
        })


    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('onresize', this.handleResize);
    }



    handleScroll(event) {

        let e = event || window.event
        let srcElement = e.target || e.srcElement

        this.setState({
            scrollTop: srcElement.documentElement.scrollTop || srcElement.body.scrollTop
        })
        let scrollTop = this.state.scrollTop
        this.handleResize()

        // move document.getElementById('') to componentDidMount for performance
        // so that it won't lookup elemens every time there is a scroll event
        let logo1 = this.state.elems.logo1
        let logo2 = this.state.elems.logo2
        let logo3 = this.state.elems.logo3
        let logo4 = this.state.elems.logo4

        let mount7 = this.state.elems.mount7
        let mount6 = this.state.elems.mount6
        let mount6demand = this.state.elems.mount6demand

        let mount5 = this.state.elems.mount5
        let mount4 = this.state.elems.mount4
        let mount4supply = this.state.elems.mount4supply

        let mount3 = this.state.elems.mount3
        let mount2 = this.state.elems.mount2
        let mount1 = this.state.elems.mount1
        let mount1axes = this.state.elems.mount1axes

        // let dither1 = this.state.elems.dither1
        // let dither2 = this.state.elems.dither2
        // let dither3 = this.state.elems.dither3
        // let dither4 = this.state.elems.dither4

        let parallaxBox1 = this.state.elems.parallaxBox1
        let parallaxBox2 = this.state.elems.parallaxBox2
        let parallaxBox3 = this.state.elems.parallaxBox3
        let parallaxBox4 = this.state.elems.parallaxBox4


        let threshold1 = this.state.threshold1
        let threshold2 = this.state.threshold2
        let threshold3 = this.state.threshold3
        let threshold4 = this.state.threshold4
        let threshold5 = this.state.threshold5

        // lets browser know ahead of time about CSS transforms
        mount1axes.style.willchange = 'opacity'
        mount2.style.willchange = 'opacity'
        mount3.style.willchange = 'opacity'
        mount4.style.willchange = 'opacity'
        mount4supply.style.willchange = 'opacity'
        mount5.style.willchange = 'opacity'
        mount6.style.willchange = 'opacity'
        mount6demand.style.willchange = 'opacity'
        mount7.style.willchange = 'opacity'


        // parallax window 1
        if ( scrollTop <= threshold1-window.innerHeight/2) {
            logo1.style.transform = `translate3d(0, ${scrollTop/2}%, 0)`

            mount7.style.transform = `translate3d(0, ${scrollTop/4}%, 0)`
            mount6.style.transform = `translate3d(0, ${scrollTop/5.2}%, 0)`
            mount6demand.style.transform = `translate3d(0, ${scrollTop/5.2}%, 0)`
            mount5.style.transform = `translate3d(0, ${scrollTop/4}%, 0)`
            mount4.style.transform = `translate3d(0, ${scrollTop/6}%, 0)`
            mount4supply.style.transform = `translate3d(0, ${scrollTop/6}%, 0)`
            // mount1axes.style.transform = `translate3d(0, 10%, 0)`
            mount3.style.transform = `translate3d(0, ${scrollTop/4.4}%, 0)`
            mount2.style.transform = `translate3d(0, ${scrollTop/4.6}%, 0)`

            TweenMax.to("#mount6demand", .5, {opacity: 0})
            TweenMax.to("#mount4supply", .5, {opacity: 0})
            TweenMax.to("#mount1axes", .5, {opacity: 0})

            TweenMax.to("#mount1", 1, {morphSVG: "#mount1"})
            TweenMax.to("#mount2", .5, {opacity: 1})
            TweenMax.to("#mount3", .5, {opacity: 1})
            TweenMax.to("#mount4", .5, {opacity: 1})
            TweenMax.to("#mount5", .5, {opacity: 1})
            TweenMax.to("#mount6", .5, {opacity: 1})
            TweenMax.to("#mount7", .5, {opacity: 1})

        } else {
            let scrollTopThreshold = threshold1-window.innerHeight/2
            mount7.style.transform = `translate3d(0, ${scrollTopThreshold/4}%, 0)`
            mount6.style.transform = `translate3d(0, ${scrollTopThreshold/5.2}%, 0)`
            mount6demand.style.transform = `translate3d(0, ${scrollTopThreshold/5.2}%, 0)`
            mount5.style.transform = `translate3d(0, ${scrollTopThreshold/4}%, 0)`
            mount4.style.transform = `translate3d(0, ${scrollTopThreshold/6}%, 0)`
            mount4supply.style.transform = `translate3d(0, ${scrollTopThreshold/6}%, 0)`
            mount1axes.style.transform = `translate3d(0, ${10}%, 0)`
            mount3.style.transform = `translate3d(0, ${scrollTopThreshold/4.4}%, 0)`
            mount2.style.transform = `translate3d(0, ${scrollTopThreshold/4.6}%, 0)`

        }


        if ( threshold1 <= scrollTop+window.innerHeight/2 && scrollTop <= threshold2) {
            TweenMax.to("#mount6demand", 1, {opacity: 1, delay: 0})
            TweenMax.to("#mount4supply", 1, {opacity: 1, delay: 0})
            TweenMax.to("#mount1axes", 1, {opacity: 1, delay: 0})

            TweenMax.to("#mount7", 0, {opacity: 0})
            TweenMax.to("#mount6", 1, {opacity: 0})
            TweenMax.to("#mount5", 0, {opacity: 0})
            TweenMax.to("#mount4", 1, {opacity: 0})
            TweenMax.to("#mount3", .5, {opacity: 0})
            TweenMax.to("#mount2", .5, {opacity: 0})
            TweenMax.to("#mount1", 1, {morphSVG: "#mount1rect"})
        }


        if ( threshold1 <= scrollTop && scrollTop <= threshold2) {

            TweenMax.to("#family_line", 1, {morphSVG: "#family_premiums"})
            TweenMax.to("#individual_line", 1, {morphSVG: "#individual_premiums"})

            TweenMax.to("#individual_text", 1.5, {opacity: 1})
            TweenMax.to("#family_text", 2, {opacity: 1})
        } else {
            TweenMax.to("#family_line", 1, {morphSVG: "#family_line"})
            TweenMax.to("#individual_line", 1, {morphSVG: "#individual_line"})

            TweenMax.to("#individual_text", 0.5, {opacity: 0})
            TweenMax.to("#family_text", 0.5, {opacity: 0})
        }



            // parallax window 2
        if ( threshold1 <= scrollTop && scrollTop <= threshold2 ) {
            let scale2 = scrollTop - threshold1
            logo2.style.transform = `translate3d(0px, ${scale2/1.5}%, 0px)`
        }

        if ( threshold2 <= scrollTop ) {
            TweenMax.to("#popUp", 0.4, {opacity: 1})
        } else {
            TweenMax.to("#popUp", 0.4, {opacity: 0})
        }



    }



    render() {
        return (
            <div>

                <Parallax id="1" title="Bloodpact: Blood-Backed Health Insurance">

                    <img id="mount7" className='mountain' src={require("./img/layer7.svg")} />

                    <img id="mount6" className='mountain' src={require("./img/layer6.svg")} />
                    <img id="mount6demand" className='mountain' src={require("./img/demand.svg")} />

                    <img id="mount5" className='mountain' src={require("./img/layer5.svg")} />

                    <img id="mount4" className='mountain' src={require("./img/layer4.svg")} />
                    <img id="mount4supply" className='mountain' src={require("./img/supply.svg")} />

                    <img id="mount3" className='mountain' src={require("./img/layer3.svg")} />
                    <img id="mount2" className='mountain' src={require("./img/layer2.svg")} />

                    <img id="mount1axes" className='mountain' src={require("./img/axes.svg")} />
                    <Mountain1 id="mount1" />
                </Parallax>


                <div id={"fixedContainer1"} className="container">
                    <div className="spacer"></div>
                    <SwitchDiv scroll={this.state.scrollTop} threshold={this.state.threshold1} />

                    <Premiums id="id's are named in premiums.js" />

                    <div className="spacer2"></div>
                    <div className="mainTextBox2">
                        What if you could obtain affordable health insurance<br/>
                        by donating blood on a regular basis?
                    </div>
                    <div className="spacer2"></div>
                    <div className="spacer2"></div>

					<div className="spacer"></div>
                    <h1>How it Works</h1>
					<div className="spacer"></div>

                    <div className="mainTextBox2">
                        <h2>1) Join Bloodpact</h2>
                        Customers sign up and link their health insurance.<br/>
                        We schedule a time and place for you to give blood.
                    </div>
                    <div className="spacer2"></div>
                    <div className="mainTextBox2">
                        <h2>2) Donate and Analyze</h2>
                        We analyze the data and BloodPact insight is sold to Medical researchers
                        and Insurance firms<br/>
                        Using these proceeds we then give back by:
                    </div>
                    <div className="spacer2"></div>
                    <div className="mainTextBox2">
                        <h2>3) Lowering insurance premiums</h2>
                        Since members are low risk and we can subsidize their premiums.
                    </div>
                    <div className="spacer2"></div>
                    <div className="mainTextBox2">
                        <h2>4) Reward Others</h2>
                        Giving members to power to vote and choose either:<br/>
                        a) Medical research or b) Someone at <a href="http://www.watsi.org">Watsi.org</a> to fund.
                    </div>
                    <div className="spacer2"></div>
                    <div className="mainTextBox2">
                        <h2>Information is kept secure</h2>
                        All medical data is encrypted, aggregated and anonymous.
                    </div>
                    <div className="spacer2"></div>

                </div>


                <Parallax id="2" title="Give Blood and Get Affordable Health Insurance">
                </Parallax>


                <div id={"fixedContainer2"} className="container">

                    <div className="mainTextBox2">
                        <h2>How this helps Bloodbanks, Insurance Companies <br/>
                        and the Public Health System</h2>
                    </div>

                    <div className="mainTextBox2">
                        Outsourcing screening and monitoring to bloodbanks cuts costs <br/>
                        It also reduces premiums since donors are low-risk (low all-cause mortality)
                    </div>

                    <div className="spacer2"></div>
                    <div className="mainTextBox2">
                        <b>Value proposition (for donors)</b>: lower premiums for family and friends. <br/>
                        Help others by contributing blood, platelets (expires in 5 days) and plasma
                    </div>

                    <div className="spacer2"></div>
                    <div className="mainTextBox2">
                        <b>Value proposition (for underwriters)</b>: Blood data on individuals every 3 months.<br/>
                        Outsource screening to bloodbanks to reduce costs. <br/>
                        Encourage healthy lifestyles and lower risk and claims.
                    </div>
                    <div className="spacer2"></div>
                    <div className="mainTextBox2">
                        <b>Value proposition (for bloodbanks)</b>: predictable blood supply over time. <br/>
                        Lower testing costs (testing repeat donors). <br/>
                        Lower marketing costs. <br/>
                    </div>
                    <div className="spacer2"></div>
                </div>






                <div className='textGrid'>
                    <div className="svgFloater">
                        <img src={require("./img/healthpack.svg")} />
                    </div>
                    <div className="textBox">
                        This means that blood supply is unpredictably low at times.
                        People give blood at random times throughout their lives.
                    </div>
                    <div className="svgFloater">
                        <img src={require("./img/transfusion2.svg")} />
                    </div>
                    <div className="textBox">
                        Bloodpact provides a reliable and predictable stream of blood donations,
                        so that hospitals will be better at planning and allocating blood over seasons.
                    </div>
                </div>

                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className='textGrid'>
                    <div className="svgFloater">
                        <img src={require("./img/transfusion3.svg")} />
                    </div>
                    <div className="textBox">
                        Bloodpact donors  will be assigned different dates to
                        spread blood supply evenly throughout the year.
                    </div>
                    <div className="svgFloater">
                        <img src={require("./img/finger.svg")} />
                    </div>
                    <div className="textBox">
                        No waste, no over or undersupply across time.
                        Predictable blood donations.
                    </div>
                </div>


                <div id="popUp">
                    <h2>Sign up for more information</h2>
                    <div className="textGridSingle">
                        <div className="textBox"> <Form /> </div>
                    </div>
                </div>

                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
            </div>
        );
    }


}


const SwitchDiv = (props) => {
    if (props.scroll < props.threshold) {
        return (
            <div id="mainTextBox1" className="mainTextBox">
                Problem 1: Blood supply varies unpredictably over time.<br/>
                We need to regular donations from healthy people.
            </div>
        )

    } else {
        return (
            <div id="mainTextBox2" className="mainTextBox">
                Problem 2: Health insurance premiums are sky-rocketing.<br/>
                Much of the cost is in screening individuals for health risks.
            </div>
        )
    }
}


export default App;
