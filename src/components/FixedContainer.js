
import React from 'react'

const FixedContainer = (props) => {
    let scrollTop = props.scrollTop
    if (props.lowerThreshold <= scrollTop && scrollTop <= props.upperThreshold) {
        // return fixedbanner + placeholder
        return (
            <div>
                <div id='tempPlaceholder' className='container'>
                    <div className="textBox"></div>
                </div>
                <div id={"fixedContainer" + props.id} className="container">
                    {props.children}
                </div>
            </div>
        )
    } else {
        // return just the banner in aboslute position
        return (
            <div id={"fixedContainer" + props.id} className="container">
                {props.children}
            </div>
        )
    }
}

export default FixedContainer;
