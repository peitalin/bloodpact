
import React from 'react'
let Component = React.Component

// import Inferno from 'inferno';
// import Component from 'inferno-component';

import firebase from 'firebase'


class Form extends Component {
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
        this.fireApp = firebase.initializeApp(config);

    }

    componentDidMount() {
        this.fireBaseListener = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    user: user,
                    signInStatus: "You have registered",
                })
            }
        })
    }

    componentWillUnmount() {
        // unmount firebase.auth().onAuthStateChanged
        this.fireBaseListener();
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
                        { this.state.signInStatus }<br/>
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
                    <input className='signupForm' type="email"
                        placeholder="info@bloodpact.io"
                        value={this.state.email}
                        onChange={this.handleChange.bind(this)} />
                    <button className='signupButton' onClick={this.handleSubmit.bind(this)} >
                        Submit
                    </button>
                    <div className="signInStatus" style={{marginTop: '10px'}}>
                        { this.state.signInStatus }
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                { this.registrationStatusBox() }
            </div>
        )
    }
}


export default Form;
