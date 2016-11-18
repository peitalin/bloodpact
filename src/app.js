

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
                threshold4: getWindowThreshold(4),
                threshold5: getWindowThreshold(5),
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

                dither1: document.getElementById('dither1'),
                dither2: document.getElementById('dither2'),
                dither3: document.getElementById('dither3'),
                dither4: document.getElementById('dither4'),
                parallaxBox1: document.getElementById('parallaxBox1'),
                parallaxBox2: document.getElementById('parallaxBox2'),
                parallaxBox3: document.getElementById('parallaxBox3'),
                parallaxBox4: document.getElementById('parallaxBox4'),
                // forevial: document.getElementById('fore-vial'),
                forecloud1: document.getElementById('cloud1'),
                forecloud2: document.getElementById('cloud2'),
                fixedContainer1: document.getElementById('fixedContainer1'),
                fixedContainer2: document.getElementById('fixedContainer2'),
                fixedContainer3: document.getElementById('fixedContainer3'),
            }
        })


    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('onresize', this.handleResize);
    }



    handleScroll(event) {

        let e = window.event || event
        let srcElement = e.target || e.srcElement
        let scrollTop = srcElement.documentElement.scrollTop || srcElement.body.scrollTop
        // let scrollTop = document.scrollingElement.scrollTop || document.documentElement.scrollTop
        // console.log(scrollingElement.scrollTop);

        this.setState({
            scrollTop: scrollTop
        })
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

        let dither1 = this.state.elems.dither1
        let dither2 = this.state.elems.dither2
        let dither3 = this.state.elems.dither3
        let dither4 = this.state.elems.dither4

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


        const boundOpacity = (op) => op >= 0.99 ? 0.999 : op.toFixed(2)
        // Wrap Parallax Windows in requestAnimationFrame for performance
        // parallax window 1
        if ( scrollTop <= threshold1-window.innerHeight/2) {
            logo1.style.transform = `translate3d(0, ${scrollTop/2}%, 0)`
            // dither1.style.opacity = `${1-boundOpacity(scrollTop/100)}`

            mount7.style.transform = `translate3d(0, ${scrollTop/4}%, 0)`

            mount6.style.transform = `translate3d(0, ${scrollTop/5.6}%, 0)`
            mount6demand.style.transform = `translate3d(0, ${scrollTop/5.6}%, 0)`

            mount5.style.transform = `translate3d(0, ${scrollTop/4}%, 0)`

            mount4.style.transform = `translate3d(0, ${scrollTop/6.6}%, 0)`
            mount4supply.style.transform = `translate3d(0, ${scrollTop/6.6}%, 0)`

            mount3.style.transform = `translate3d(0, ${scrollTop/4.2}%, 0)`
            mount2.style.transform = `translate3d(0, ${scrollTop/4}%, 0)`

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

        }

        if ( threshold1 <= scrollTop+window.innerHeight/2 && scrollTop <= threshold2) {
            TweenMax.to("#mount6demand", 1, {opacity: 1, delay: 0})
            TweenMax.to("#mount4supply", 1, {opacity: 1, delay: 0})
            TweenMax.to("#mount1axes", 1, {opacity: 1, delay: 0})

            TweenMax.to("#mount7", 1, {opacity: 0})
            TweenMax.to("#mount6", 1, {opacity: 0})
            TweenMax.to("#mount5", 1, {opacity: 0})
            TweenMax.to("#mount4", 1, {opacity: 0})
            TweenMax.to("#mount3", 1, {opacity: 0})
            TweenMax.to("#mount2", 1, {opacity: 0})
            TweenMax.to("#mount1", 1, {morphSVG: "#mount1rect"})
        }


            // parallax window 2
        if ( threshold1 <= scrollTop && scrollTop <= threshold2 ) {
            let scale2 = scrollTop - threshold1
            logo2.style.transform = `translate3d(0px, ${scale2/2}%, 0px)`
            // dither2.style.opacity = `${boundOpacity(scale2/400)}`
        } else {
            // dither2.style.opacity = `0`
        }

            // parallax window 3
        if ( threshold2 <= scrollTop && scrollTop <= threshold3 ) {
            let scale3 = scrollTop - threshold2
            logo3.style.transform = `translate3d(0px, ${scale3/2}%, 0px)`
            // dither3.style.opacity = `${boundOpacity(scale3/400)}`
        } else {
            // dither3.style.opacity = `0`
        }

            // parallax window 4
        if ( threshold3 <= scrollTop && scrollTop <= threshold5 ) {
            let scale4 = scrollTop - threshold3
            logo4.style.transform = `translate3d(0px, ${scale4/2}%, 0px)`
            dither4.style.opacity = `${boundOpacity(scale4/400)}`
        } else {
            dither4.style.opacity = `0`
        }

        // this.toggleFixedContainer()
        // this.animateHeart()
        // TweenLite.to(c1, 5, {opacity: 0})
        // TweenMax.to("#mount1", 4, {opacity: 0})
        // TweenMax.to("#mount2", 3, {opacity: 0})
        // TweenMax.to("#mount3", 2, {opacity: 0})
        MorphSVGPlugin.convertToPath('#mount1')
        MorphSVGPlugin.convertToPath('#mount1rect')
        // TweenMax.to("#mount1", 2, {morphSVG: "#mount1rect"})

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
                    <div className="mainTextBox">
                        Blood lasts 5 weeks and supply varies over time.<br/>
                        We need to repeat donors to smooth blood donations over time.
                    </div>
                    <div className="spacer" style={{height: 40}}></div>
                    <div className="mainTextBox">
						What if you could secure affordable health insurance for family and friends<br/>
						by donating blood on a regular basis?
                    </div>
                    <div className="spacer" style={{height: 40}}></div>
                    <div className="mainTextBox">
						As you know, health insurance is bloody expensive.<br/>
						Much of the cost is in screening and monitoring high risk individuals.<br/>
						It turns out that blood donors are reguarly screened to ensure their health.
                    </div>
                    <div className="spacer" style={{height: 40}}></div>
                    <div className="mainTextBox">
						Outsourcing screening and monitoring to bloodbanks cuts costs <br/>
						It also reduces premiums since donors are low-risk (low all-cause mortality)
                    </div>
                </div>
                <div className="spacer" style={{height: 80}}>s</div>




                <Parallax id="2" title="Give Blood and Secure Affordable Health Insurance">
                    <img id="heart-beat" src={require("./img/heart.svg")} />
                </Parallax>
                <div id={"fixedContainer2"} className="container">
                    <div className="textBox">
						Value proposition (for donors): lower premiums for family and friends. <br/>
						Help others by contributing blood, platelets (expires in 5 days) and plasma
                    </div>
                </div>


                <Parallax id="3" title="Blood as premium, Blood as Data, Blood as a product...">
                </Parallax>

                <div id={"fixedContainer2"} className="container">
                    <div className="textBox">
						Value proposition (for underwriters): Blood data on individuals every 3 months.<br/>
						Outsource screening to bloodbanks to reduce costs. <br/>
						Encourage healthy lifestyles and lower risk and claims.
                    </div>
                    <div className="textBox">
						Value proposition (for bloodbanks): predictable blood supply over time. <br/>
						Lower testing costs (testing repeat donors). <br/>
						Lower marketing costs. <br/>
                    </div>
                </div>


                <Parallax id="4" title="1 pint saves 3 lives, join Bloodpact and nominate 3 others for coverage">
                </Parallax>

                <div id={"fixedContainer4"} className="container">
                    <div className="textBox">
						Using funds raised from selling platelets (expires in 5 days),<br/>
						We can insure members outside of the Bloodpact network for viral growth: <br/>
						Nominate friends and strangers for short-term coverage <br/>

                    </div>
                </div>


                <h2>Blood has a shelf life of 5 weeks</h2>
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


                <div className="spacer"></div>
                <h2>Sign up for more information</h2>
                <div className="textGridSingle">
                    <div className="textBox"> <Form /> </div>
                </div>
                <div className="spacer"></div>
            </div>
        );
    }

    toggleFixedContainer() {
        let scrollTop = this.state.scrollTop
        let fixedContainer1 = this.state.elems.fixedContainer1
        let fixedContainer2 = this.state.elems.fixedContainer2
        let fixedContainer3 = this.state.elems.fixedContainer3
        let threshold1 = this.state.threshold1
        let threshold2 = this.state.threshold2
        let threshold3 = this.state.threshold3

        // 1st fixed container
        if (threshold1 <= scrollTop && scrollTop <= threshold2) {
            fixedContainer1.style.position = 'fixed'
        } else {
            fixedContainer1.style.position = 'relative'
        }
        // 2nd fixed container
        if (threshold2 <= scrollTop && scrollTop <= threshold3) {
            fixedContainer2.style.position = 'fixed'
        } else {
            fixedContainer2.style.position = 'relative'
        }



    }


    animateHeart() {
        // Heart animation
        let scrollTop = this.state.scrollTop
        let heart = document.getElementById('heart-beat')
        let lastRotationValue = scrollTop / 1000 * Math.exp(-scrollTop/800)
        let transRate = scrollTop/4
        let transRate2 = scrollTop/ (4 / (1+(scrollTop - 650)/2000))

        if (scrollTop <= 650) {
            heart.style.transform = `
                translate3d(0, ${transRate}%, 0)
                rotate(${0.7 + lastRotationValue}turn)
            `
        }
        if (650 < scrollTop && scrollTop < this.state.threshold2) {
            heart.style.transform = `
                translate3d(0, ${transRate2}%, 0)
                rotate(${0.7 + lastRotationValue}turn)
            `
        }
    }
}



export default App;
