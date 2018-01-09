
import React from 'react'

const Calendar = (props) => {
    if (props.scroll < props.threshold) {
        return (
            <div id="months" className={props.className}>
                <div className="month ">July</div>
                <div className="month ">Aug</div>
                <div className="month ">Sep</div>
                <div className="month ">Oct</div>
                <div className="month ">Nov</div>
                <div className="month ">Dec</div>
                <div className="month ">Jan</div>
                <div className="month ">Feb</div>
                <div className="month ">Mar</div>
                <div className="month ">Apr</div>
                <div className="month ">May</div>
                <div className="month ">Jun</div>
            </div>
        )
    } else {
        return (
            <div id="years" className={props.className}>
                <div className="year 2011">2011</div>
                <div className="year 2012">2012</div>
                <div className="year 2013">2013</div>
                <div className="year 2014">2014</div>
                <div className="year 2015">2015</div>
                <div className="year 2016">2016</div>
            </div>
        )
    }
}

export default Calendar;
