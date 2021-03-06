import React from 'react';
import './TimesAvailable.css';


const TimesAvailable = props => {
  const availability = props.availability
  let isVacant = false
  var times = ["0800", "0830", "0900", "0930", "1000", "1030", "1100", "1130", "1200", "1230", "1300", "1330", "1400", "1430", "1500", "1530", "1600", "1630", "1700", "1730", "1800", "1830", "1900", "1930", "2000", "2030", "2100", "2130", "2200", "2230", "2300"]
  const timings = times.map((time, index) => {
                      if(!isVacant && availability[time] === "vacant"){
                        isVacant = true;
										    return <span key={time}>{time}</span>;
                      } else if (isVacant && availability[time] === "vacant") {
                        isVacant = true;
                      } else if (isVacant && availability[time] !== "vacant") {
                        isVacant = false;
                        return <span key={time}> - {time}, </span>;
                      } else if (!isVacant && availability[time] !== "vacant") {
                        isVacant = false;
                      }
								})

  return <span className="content">{timings} - 2330.</span>
}

export default TimesAvailable;
