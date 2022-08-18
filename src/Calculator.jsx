import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
function Calculator() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [days, setDays] = useState();
  const [daysData, setDaysData] = useState({ DAYS: 0, MONTHS: 0, YEARS: 0 });
  const [intData, setIntData] = useState({
    intyears: 0,
    intmonths: 0,
    intdays: 0,
    inttotal: 0,
  });
  const [disp, setDisp] = useState(false);
  function calc() {
    var principle = document.getElementById("principle").value;
    var interest = document.getElementById("interest").value;
    var endsec = moment(endDate).valueOf();
    var startsec = moment(startDate).valueOf();
    var diffDays = Math.ceil((endsec - startsec) / (24 * 60 * 60 * 1000));
    setDays(diffDays);
    var years = parseInt(diffDays / 365);
    var yeardays = years * 365;
    var months = parseInt((diffDays - yeardays) / 30);
    var mondays = months * 30;
    var days = diffDays - yeardays - mondays;
    setDaysData({
      ...daysData,
      DAYS: { days },
      MONTHS: { months },
      YEARS: { years },
    });
    var intPerYear = (principle * interest * 12) / 100;
    var intPerMonth = intPerYear / 12;
    var intPerDay = intPerMonth / 30;
    var intPerYears = intPerYear * years;
    var intPerMonths = intPerMonth * months;
    var intPerDays = intPerDay * days;
    var totInterest = intPerYears + intPerMonths + intPerDays;
    setIntData({
      ...intData,
      intyears: { intPerYears },
      intmonths: { intPerMonths },
      intdays: { intPerDays },
    });
    console.log(intData);

    setDisp(true);
  }
  return (
    <div className="container vh-100 bg-primary">
      <div className="row d-flex justify-content-center">
        <div className="col text-danger text-center h1">
          Simple interest Calculator
        </div>
      </div>
      <form>
        <div className="form-group">
          <label className="h3">Principle Amount</label>
          <input
            className="form-control input-md col-xs-2 w-25 m-auto text-center"
            id="principle"
            type="number"
            step="1000"
          />
        </div>
        <div className="form-group m-2">
          <label className="h3">Interest</label>
          <input
            className="form-control input-md col-xs-2 w-25 m-auto text-center"
            id="interest"
            type="number"
            step="0.50"
          />
        </div>
        <div className="form-group m-2">
          <label className="h3">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="form-group m-2">
          <label className="h3">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </form>

      <button type="button" className="btn btn-secondary" onClick={calc}>
        Calculate
      </button>
      {disp ? (
        <div>
          <div className="row d-flex justify-content-center">
            <div className="col text-danger text-center h1">
              Time : {daysData.YEARS.years} Years {daysData.MONTHS.months}{" "}
              Months and {daysData.DAYS.days} Days (total {days} days)
            </div>
          </div>

          <div className="row d-flex justify-content-center">
            <div className="col text-danger text-center h1"></div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default Calculator;
