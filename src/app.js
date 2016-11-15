

import React from 'react'
import './app.sass'
import './sun.scss'
import SVGFloater from './components/svgFloater.js'
import FixedContainer from './components/FixedContainer.js'
import Parallax from './components/Parallax.js'
import Form from './components/Form.js'
// import { Field, reduxForm } from 'redux-form'

import * as gsap from 'gsap'
import { TweenLite } from 'gsap'
import moment from 'moment'
import lodash from 'lodash'





class Cloud extends React.Component {

    componentDidMount() {
        let elem = document.getElementById(this.props.id)
        elem.style.fill = `${this.props.fill}`
        elem.style.transform = `
        scaleX(${this.props.scaleX})
        scaleY(${this.props.scaleY})
        translateX(${this.props.x}%)
        translateY(${this.props.y}%)
        `
    }

    render() {
        return (
            <path className='cloud' id={this.props.id}
            d="M27.244,8.64c0.04-0.319,0.068-0.643,0.068-0.973C27.312,3.432,23.88,0,19.646,0
            c-3.069,0-6.047,2.208-7.047,5.208c-1.625-0.922-3.341-1.195-4.595-0.104c-0.012,
            0.01-0.019,0.022-0.031,0.033 c-0.02,0.014-0.042,0.02-0.062,0.034c-1.236,
            0.875-1.686,2.49-1.336,4.123C6.543,9.3,6.6,9.3,6.6,9.3 c-3.596,
            0-6.6,2.914-6.6,6.6c0,3.596,2.914,6.6,6.6,6.6h19.896c3.791,
            0,6.864-3.073,6.864-6.864 C33.271,11.941,30.639,9.054,27.244,8.64z" />
        );
    }
}


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
            const getWindowThreshold = (n) => window.innerHeight*n + (n-1)*this.state.bannerHeight
            this.setState({
                threshold1: getWindowThreshold(1),
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
                mount2: document.getElementById('mount2'),
                mount3: document.getElementById('mount3'),
                mount4: document.getElementById('mount4'),
                mount5: document.getElementById('mount5'),
                mount6: document.getElementById('mount6'),
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

        let mount1 = this.state.elems.mount1
        let mount2 = this.state.elems.mount2
        let mount3 = this.state.elems.mount3
        let mount4 = this.state.elems.mount4
        let mount5 = this.state.elems.mount5
        let mount6 = this.state.elems.mount6
        let mount7 = this.state.elems.mount7

        let dither1 = this.state.elems.dither1
        let dither2 = this.state.elems.dither2
        let dither3 = this.state.elems.dither3
        let dither4 = this.state.elems.dither4

        let parallaxBox1 = this.state.elems.parallaxBox1
        let parallaxBox2 = this.state.elems.parallaxBox2
        let parallaxBox3 = this.state.elems.parallaxBox3
        let parallaxBox4 = this.state.elems.parallaxBox4

        // let forevial = this.state.elems.forevial
        let forecloud1 = this.state.elems.forecloud1

        let threshold1 = this.state.threshold1
        let threshold2 = this.state.threshold2
        let threshold3 = this.state.threshold3
        let threshold4 = this.state.threshold4
        let threshold5 = this.state.threshold5

        // lets browser know ahead of time about CSS transforms
        // this.state.elems.forecloud1.style.willchange = 'transform, scale'
        this.state.elems.dither1.style.willchange = 'opacity'
        this.state.elems.logo1.style.willchange = 'transform'
        this.state.elems.fixedContainer1.style.willchange = 'position'
        this.state.elems.fixedContainer2.style.willchange = 'position'
        this.state.elems.fixedContainer3.style.willchange = 'position'


        const boundOpacity = (op) => op >= 0.99 ? 0.999 : op.toFixed(2)
        // Wrap Parallax Windows in requestAnimationFrame for performance
        // parallax window 1
        if ( scrollTop <= threshold1) {
            logo1.style.transform = `translate3d(0, ${scrollTop/2}%, 0)`
            // dither1.style.opacity = `${1-boundOpacity(scrollTop/100)}`

            mount7.style.transform = `translateY(${scrollTop/4}%)`
            mount6.style.transform = `translateY(${scrollTop/6}%)`
            mount5.style.transform = `translateY(${scrollTop/4}%)`
            mount4.style.transform = `translateY(${scrollTop/7}%)`
            mount3.style.transform = `translateY(${scrollTop/4}%)`
            mount2.style.transform = `translateY(${scrollTop/5}%)`
            mount1.style.transform = `translateY(${scrollTop/6}%)`

            // forecloud1.style.transform = `
            // translate(-${scrollTop/20}px, ${scrollTop/8}px)
            // scale(${1 + scrollTop/1600})
            // `

        }

            // parallax window 2
        if ( threshold1 <= scrollTop && scrollTop <= threshold2 ) {
            let scale2 = scrollTop - threshold1
            logo2.style.transform = `translate3d(0px, ${scale2/2}%, 0px)`
            dither2.style.opacity = `${boundOpacity(scale2/400)}`
        } else {
            dither2.style.opacity = `0`
        }

            // parallax window 3
        if ( threshold2 <= scrollTop && scrollTop <= threshold3 ) {
            let scale3 = scrollTop - threshold2
            logo3.style.transform = `translate3d(0px, ${scale3/2}%, 0px)`
            dither3.style.opacity = `${boundOpacity(scale3/400)}`
        } else {
            dither3.style.opacity = `0`
        }

            // parallax window 4
        if ( threshold3 <= scrollTop && scrollTop <= threshold5 ) {
            let scale4 = scrollTop - threshold3
            logo4.style.transform = `translate3d(0px, ${scale4/2}%, 0px)`
            dither4.style.opacity = `${boundOpacity(scale4/400)}`
        } else {
            dither4.style.opacity = `0`
        }

        this.toggleFixedContainer()
        this.animateHeart()

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

        // TweenLite.to(c1, 5, {opacity: 0})


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

    render() {
        return (
            <div>

                <Parallax id="1" title="Bloodpact: Blood-Backed Health Insurance">
                    {/*  */}
                    {/* <div className="blobs"> */}
                    {/*     <div className="blob"></div> */}
                    {/*     <div className="blob"></div> */}
                    {/* </div> */}
                    {/*  */}
                    {/* <svg width="100vw" height="100vh" viewBox="0 0 100 100"> */}
                    {/*     <defs> */}
                    {/*         <filter id="goo"> */}
                    {/*             <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" /> */}
                    {/*             <feColorMatrix in="blur" */}
                    {/*                 mode="matrix" */}
                    {/*                 values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" */}
                    {/*                 result="goo" /> */}
                    {/*             <feBlend in="SourceGraphic" in2="goo" /> */}
                    {/*         </filter> */}
                    {/*     </defs> */}
                    {/*     <Cloud id="cloud1" fill="#eee" x={10} y={5} scaleX={1} scaleY={0.9} /> */}
                    {/*     <Cloud id="cloud2" fill="#ddd" x={200} y={90} scaleX={1} scaleY={0.9} /> */}
                    {/*  */}
                    {/* </svg> */}
                    <img id="mount7" className='mountain' src={require("./img/layer7.svg")} />
                    <img id="mount6" className='mountain' src={require("./img/layer6.svg")} />
                    <img id="mount5" className='mountain' src={require("./img/layer5.svg")} />
                    <img id="mount4" className='mountain' src={require("./img/layer4.svg")} />
                    <img id="mount3" className='mountain' src={require("./img/layer3.svg")} />
                    <img id="mount2" className='mountain' src={require("./img/layer2.svg")} />
                    <img id="mount1" className='mountain' src={require("./img/layer1.svg")} />
                </Parallax>


                {/* <FixedContainer id="1" */}
                {/*     lowerThreshold={this.state.threshold1} */}
                {/*     scrollTop={this.state.scrollTop} */}
                {/*     upperThreshold={this.state.threshold2}> */}
                <div className="textBox">
                    1) Increase aggregate levels of blood donation
                    (can't just pay for blood since that's immoral and can
                    actually decrease levels of donation)
                </div>
                {/* </FixedContainer> */}


                <Parallax id="2" title="Give Blood and Gift Insurance to Friends and Strangers">
                    <img id="heart-beat" src={require("./img/heart.svg")} />
                </Parallax>
                <FixedContainer id="2"
                    lowerThreshold={this.state.threshold2}
                    scrollTop={this.state.scrollTop}
                    upperThreshold={this.state.threshold3}>
                    <img className="svgFloater" src={require("./img/perfusion.svg")} />
                    <div className="textBox">
                        2) Solves incentive issues in health insurance:
                        people conceal information about their health status and their habits
                        (smoking, diet) to obtain cheaper premiums.
                    </div>
                </FixedContainer>


                <Parallax id="3" title="One pint can save three lives">
                </Parallax>

                <div id={"fixedContainer3"} className="container">
                    <img className="svgFloater" src={require("./img/bloodtest.svg")} />
                    <div className="textBox">
                        3) By donating blood we can do blood tests and screen doners for
                        viable “blood-pact” candidates. This reveals better information about
                        their diet, habits and actual state of health.
                    </div>
                </div>


                <Parallax id="4" title="Enter the blood-pact challenge and fight blood-bourne disease">
                </Parallax>


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
                <h2>Sign up and help us pitch the idea to the RedCross</h2>
                <div className="textGridSingle">
                    <div className="textBox"> <Form /> </div>
                </div>
                <div className="spacer"></div>
            </div>
        );
    }
}



export default App;
