

import React from 'react'
import './app.sass'
import SVGFloater from './components/svgFloater.js'
import FixedContainer from './components/FixedContainer.js'
import Parallax from './components/Parallax.js'
// import { Field, reduxForm } from 'redux-form'




class Form extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            user: "",
            signInStatus: "",
        }
        var config = {
            apiKey: "AIzaSyAv8zdHSlHZ9DahyDh7o3baUVMsRHAl4qM",
            authDomain: "bloodpact-796e0.firebaseapp.com",
            databaseURL: "https://bloodpact-796e0.firebaseio.com",
            storageBucket: "bloodpact-796e0.appspot.com",
            messagingSenderId: "98645258248"
        };
        firebase.initializeApp(config);
        this.rootRef = firebase.database().ref('signups')
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    user: user,
                    signInStatus: "You have registered",
                })
            }
        })
    }

    handleChange(event) {
        this.setState({ email: event.target.value });
    }

    handleSubmit(event) {

        // Create a new user
        firebase.auth().createUserWithEmailAndPassword(this.state.email, 'password')
        .catch(error => {
            console.log(error)
            // User already exists in firebase, so attempt login
            firebase.auth().signInWithEmailAndPassword(this.state.email, 'password').catch(e => { console.log(e) })
            var user = firebase.auth().currentUser
            this.setState({
                user: this.state.email,
                signInStatus: "You have already registered",
            })
        })
        .then(x => {
            if (this.state.signInStatus === "You have already registered") {
                // return if user already exists
                return;
            }
            var user = firebase.auth().currentUser
            var updates = {}
            updates['/emails/' + user.uid] = {
                email: user.email,
                emailVerified: user.emailVerified,
            }
            firebase.database().ref().update(updates)
            this.setState({
                user: user.email,
                signInStatus: "You are now registered",
            })
            user.sendEmailVerification().then(() => {
                console.log(`Verification email sent to ${user.email}`);
            }, err => { console.log(`Verification email failed: ${err}`); })
        })
    }

    handleUserDelete(event) {
        var user = firebase.auth().currentUser
        var userID = user.uid
        var credential = 'password'
        user.delete().then(() => {
            firebase.database().ref('emails/' + user.uid).remove()
            console.log(`Deleted user account ${user.email}`);
            this.setState({
                user: null,
                email: "",
                signInStatus: "You have signed out"
            })
        }, err => {
            console.log(err);
            firebase.auth().signInWithEmailAndPassword(user.email, 'password').catch(e => console.log(e))
            user.reauthenticate(credential).then(() => {
                console.log(`user reauthenticated`);
            }, err => console.log(err))
        })
    }

    handleSignout() {
        firebase.auth().signOut().then(() => {
            var temp = this.state.email
            this.setState({
                user: "",
                email: "",
                signInStatus: "You have signed out"
            })
            console.log(`You have signed out`);
        }, error => { console.log(error) })
    }

    registrationStatusBox() {
        if (this.state.user) {
            return <div>
                    <div className='signInStatus'>
                        {this.state.signInStatus}<br/>
                    </div>
                    <div className='signInStatus'>
                        <button className='signoutButton' onClick={this.handleSignout.bind(this)}>
                            Signout
                        </button>
                    </div>
                </div>
        } else {
            return (
                <div>
                    <div className="signInStatus">
                        <input className='signupForm' type="email"
                            placeholder="info@bloodpact.io"
                            value={this.state.email}
                            onChange={this.handleChange.bind(this)} />
                        <button className='signupButton' onClick={this.handleSubmit.bind(this)} >
                            Submit
                        </button>
                    </div>
                    <div className="signInStatus">
                        {this.state.signInStatus}
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.registrationStatusBox()}
            </div>
        )
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
            elems: {},
        }
    }

    handleResize() {
        // THRESHOLDS FOR Fixed containers/placeholders
        // window-height * n plus (n-1)*100px for the placeholder
        this.setState({
            bannerHeight: document.getElementById('fixedContainer1').clientHeight
        })
        const getWindowThreshold = (n) => window.innerHeight*n + (n-1)*this.state.bannerHeight
        this.setState({
            threshold1: getWindowThreshold(1),
            threshold2: getWindowThreshold(2),
            threshold3: getWindowThreshold(3),
            threshold4: getWindowThreshold(4),
            threshold5: getWindowThreshold(5),
        })

    }

    componentDidMount() {
        window.addEventListener(
            'scroll',
            this.handleScroll.bind(this),
        );

        window.addEventListener('onresize', this.handleResize.bind(this))

        this.setState({
            elems: {
                logo1: document.getElementById('logo1'),
                logo2: document.getElementById('logo2'),
                logo3: document.getElementById('logo3'),
                logo4: document.getElementById('logo4'),
                dither1: document.getElementById('dither1'),
                dither2: document.getElementById('dither2'),
                dither3: document.getElementById('dither3'),
                dither4: document.getElementById('dither4'),
                parallaxBox1: document.getElementById('parallaxBox1'),
                parallaxBox2: document.getElementById('parallaxBox2'),
                parallaxBox3: document.getElementById('parallaxBox3'),
                parallaxBox4: document.getElementById('parallaxBox4'),
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
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('onresize', this.handleResize);
    }


    handleScroll(event) {

        this.setState({
            scrollTop: event.srcElement.body.scrollTop
        })
        // this.handleResize()
        let scrollTop = this.state.scrollTop
        // console.log(`Scrolling: ${this.state.scrollTop}`);

        // move document.getElementById('') to componentDidMount for performance
        // so that it won't lookup elemens every time there is a scroll event
        let logo1 = this.state.elems.logo1
        let logo2 = this.state.elems.logo2
        let logo3 = this.state.elems.logo3
        let logo4 = this.state.elems.logo4

        let dither1 = this.state.elems.dither1
        let dither2 = this.state.elems.dither2
        let dither3 = this.state.elems.dither3
        let dither4 = this.state.elems.dither4

        let parallaxBox1 = this.state.elems.parallaxBox1
        let parallaxBox2 = this.state.elems.parallaxBox2
        let parallaxBox3 = this.state.elems.parallaxBox3
        let parallaxBox4 = this.state.elems.parallaxBox4

        let forewoman = this.state.elems.forewoman
        let foreman1 = this.state.elems.foreman1
        let foreman2 = this.state.elems.foreman2

        let threshold1 = this.state.threshold1
        let threshold2 = this.state.threshold2
        let threshold3 = this.state.threshold3
        let threshold4 = this.state.threshold4
        let threshold5 = this.state.threshold5

        let fixedContainer1 = this.state.elems.fixedContainer1
        let fixedContainer2 = this.state.elems.fixedContainer2
        let fixedContainer3 = this.state.elems.fixedContainer3
        let bannerHeight = this.state.elems.bannerHeight


        // Wrap Parallax Windows in requestAnimationFrame for performance
        window.requestAnimationFrame(() => {
            // parallax window 1
            if ( scrollTop <= threshold1) {
                logo1.style.transform = `translate3d(0px, ${(scrollTop/2).toFixed(2)}%, 0)`
                dither1.style.opacity = `${(scrollTop/400).toFixed(2)}`
                // people sliders
                forewoman.style.transform = `translate3d(${(scrollTop/6).toFixed(2)}%, 0, 0)`
                foreman1.style.transform = `translate3d(${(scrollTop/(5*(1 - scrollTop/2000))).toFixed(2)}%, 0, 0)`
                foreman2.style.transform = `translate3d(${(scrollTop/(4*(1 - scrollTop/1500))).toFixed(2)}%, 0, 0)`
            }

            // parallax window 2
            if ( threshold1 <= scrollTop && scrollTop <= threshold2 ) {
                let scale2 = scrollTop - threshold1
                logo2.style.transform = `translate3d(0px, ${(scale2/2).toFixed(2)}%, 0px)`
                dither2.style.opacity = `${scale2/400}`
            } else {
                dither2.style.opacity = `0`
            }

            // parallax window 3
            if ( threshold2 <= scrollTop && scrollTop <= threshold3 ) {
                let scale3 = (scrollTop - threshold2).toFixed(2)
                logo3.style.transform = `translate3d(0px, ${(scale3/2).toFixed(2)}%, 0px)`
                dither3.style.opacity = `${scale3/400}`
            } else {
                dither3.style.opacity = `0`
            }

            // parallax window 4
            if ( threshold3 <= scrollTop && scrollTop <= threshold5 ) {
                let scale4 = (scrollTop - threshold3).toFixed(2)
                logo4.style.transform = `translate3d(0px, ${(scale4/2).toFixed(2)}%, 0px)`
                dither4.style.opacity = `${scale4/400}`
            } else {
                dither4.style.opacity = `0`
            }
        })


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
        // 3rd fixed container
        // if (threshold3 <= scrollTop && scrollTop <= (threshold4)) {
        //     fixedContainer3.style.position = 'fixed'
        // } else {
        //     fixedContainer3.style.position = 'relative'
        // }

        this.animateHeart()

    }


    animateHeart() {
        // Heart animation
        let scrollTop = this.state.scrollTop
        let heart = document.getElementById('heart-beat')
        let lastRotationValue = scrollTop / 1000 * Math.exp(-scrollTop/800)
        let transRate = scrollTop/4
        let transRate2 = scrollTop/ (4 / (1+(scrollTop - 650)/2000))

        if (scrollTop <= 650) {
            window.requestAnimationFrame(() => {
                heart.style.transform = `
                    translate3d(0, ${transRate}%, 0)
                    rotate(${0.7 + lastRotationValue}turn)
                `
            })
        }
        if (650 < scrollTop && scrollTop < this.state.threshold2) {
            window.requestAnimationFrame(() => {
                heart.style.transform = `
                    translate3d(0, ${transRate2}%, 0)
                    rotate(${0.7 + lastRotationValue}turn)
                `
            })
        }
    }

    render() {
        return (
            <div>

                <Parallax id="1" title="Bloodpact: Blood-Backed Health Insurance">
                    <img className='people' id="fore-woman" src={require('./img/doctor_she.svg')} />
                    <img className='people' id="fore-man1" src={require('./img/doctor_he4.svg')} />
                    <img className='people' id="fore-man2" src={require('./img/doctor_he2.svg')} />
                </Parallax>
                <FixedContainer id="1"
                    lowerThreshold={this.state.threshold1}
                    scrollTop={this.state.scrollTop}
                    upperThreshold={this.state.threshold2}>
                    <img src={require("./img/blooddrop2.svg")} />
                    <div className="textBox">
                        1) Increase aggregate levels of blood donation
                        (can't just pay for blood since that's immoral and can
                        actually decrease levels of donation)
                    </div>
                </FixedContainer>


                <Parallax id="2" title="Give Glood and Gift Insurance to Friends and Strangers">
                    <img id="heart-beat" src={require("./img/heart.svg")} />
                </Parallax>
                <FixedContainer id="2"
                    lowerThreshold={this.state.threshold2}
                    scrollTop={this.state.scrollTop}
                    upperThreshold={this.state.threshold3}>
                    <img src={require("./img/perfusion.svg")} />
                    <div className="textBox">
                        2) Solves incentive issues in health insurance:
                        people conceal information about their health status and their habits
                        (smoking, diet) to obtain cheaper premiums.
                    </div>
                </FixedContainer>


                <Parallax id="3" title="One pint can save three lives">
                </Parallax>

                <div id={"fixedContainer3"} className="container">
                    <img src={require("./img/bloodtest.svg")} />
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
                <h2>Sign up here to help me pitch this idea to the RedCross</h2>
                <div className="textGridSingle">
                    <div className="textBox"> <Form /> </div>
                </div>
                <div className="spacer"></div>
            </div>
        );
    }
}




export default App;
