// import React from 'react';
import Inferno from 'inferno';

const SwitchDiv = (props) => {
    if (props.scrollTop < props.threshold) {
        return (
            <div id="switchDiv1" className={props.className}>
                <div>Problem 1: Blood donations are low.  </div>
                <div>Problem 2: Health insurance premiums are too high. </div>
                <div>Solution: Incentivize healthy donors (low risk) with health coverage. </div>
            </div>
        )

    } else {
        return (
            <div id="switchDiv2" className={props.className}>
                Health insurance premiums are sky-rocketing.
            </div>
        )
    }
}

const SwitchSpacer = (props) => {
    if (!props.animations) {
        return <div></div>
    } else {
        return  (
            <div>
                <div className="spacerDark"></div>
                <div className="spacerDark"></div>
                <div className="spacerDark"></div>
                <div className="spacerDark"></div>
                <div className="solution_text">
                    <h1>Affordable Health Cover</h1>
                </div>
                <div className="solution_text">
                    <div>
                        Donate blood and lower your insurance premiums
                    </div>
                </div>
                <div className="spacerDark"></div>
                <div className="spacerDark"></div>
                <div className="spacerDark"></div>
                <div className="spacerDark"></div>
            </div>
        )
    }

}



const SwitchGraphLabels = (props) => {
    if (props.scrollTop < props.threshold ) {
        return (
            <div className="blood_graph_text">
                <div id="demand_text"> Demand </div>
                <div id="supply_text"> Supply </div>
                <div id="label_blood"> Units of Blood </div>
            </div>
        )
    } else {
        return (
            <div className="premiums_graph_text">
                <div id="family_text">
                    Family Cover <div id="xhr_family_premium">~6% increase p.a.</div>
                </div>
                <div id="individual_text">
                    Individual Cover <br/> <div id="xhr_individual_premium">~5.6% increase p.a.</div>
                </div>
                <div id="label_premiums"> Insurance Costs </div>
            </div>
        )
    }

}

module.exports = {
    SwitchDiv,
    SwitchSpacer,
    SwitchGraphLabels
}
