import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
function Calculator() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [days, setDays] = useState();
  const [daysData, setDaysData] = useState({ DAYS: 0, MONTHS: 0, YEARS: 0 });
  const [principle, setPrinciple] = useState(0);
  const [totInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [disp, setDisp] = useState(false);

  function calc() {
    var principle = document.getElementById("principle").value;
    if(principle==""){
      document.getElementById('pamount-error').style.display="block";
      return ;
    }
    else{
      document.getElementById('pamount-error').style.display="none";
    }
    
    
    setPrinciple(principle);
    var interest = document.getElementById("interest").value;
    if(interest==""){
      document.getElementById('interest-error').style.display="block";
      return;
    }
    else{
      document.getElementById('interest-error').style.display="none";

    }
    var endsec = moment(endDate).valueOf();
    var startsec = moment(startDate).valueOf();
    var diffDays = Math.ceil((endsec - startsec) / (24 * 60 * 60 * 1000));
    console.log(diffDays);
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
    var totInterest = Math.ceil(intPerYears + intPerMonths + intPerDays);
    setTotalInterest(totInterest);
    var x = parseInt(principle) + totInterest;
    setTotalAmount(x);
    setDisp(true);
  }
  return (
    <div className="container vh-100 main">
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
            required
          />
          <label id="pamount-error" style={{display:"none"}}>Amount should not be empty</label>
        </div>
        <div className="form-group m-2">
          <label className="h3">Interest</label>
          <input
            className="form-control input-md col-xs-2 w-25 m-auto text-center"
            id="interest"
            type="number"
            step="0.50"
            required
          />
          <label id="interest-error" style={{display:"none"}}>Interest should not be empty</label>

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
            <div className="col text-danger text-center h3">
              {daysData.YEARS.years} Years {daysData.MONTHS.months} Months and{" "}
              {daysData.DAYS.days} Days (total {days} days)
            </div>
          </div>

          <div className="row d-flex justify-content-center">
            <div className="col text-danger text-center h3">
              Interest: {totInterest}
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col text-danger text-center h1">
              Total Amount to be Paid: {totalAmount}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default Calculator;
