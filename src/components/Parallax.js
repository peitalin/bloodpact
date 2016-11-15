
import React from 'react'

const Parallax = (props) => {
    return (
        <div className="parallax" id={"parallaxBox" + props.id}>
            <div className='dither' id={"dither" + props.id}> </div>
            {props.children}
            <div className="logo" id={"logo" + props.id}>
                <h1>{props.title}</h1>
            </div>
        </div>

    )
}

export default Parallax;
