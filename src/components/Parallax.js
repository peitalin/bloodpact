
import React from 'react'

const Parallax = (props) => {
    return (
        <div className="parallax" id={"parallaxBox" + props.id}>
            {props.children}
            <div className='dither' id={"dither" + props.id}></div>
            <div className="logo" id={"logo" + props.id}>
                <h1>{props.title}</h1>
            </div>
        </div>

    )
}

export default Parallax;
