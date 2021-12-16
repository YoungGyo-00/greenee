import React, {useState} from "react";
import Map from "./Map";
import Chart from "./Chart.js";
import Table from "./Table";
import Nav from "./Nav.js";

const Contents = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const handleCreate = ((startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  })

  return (
    <section>
      <Map startDate={startDate} endDate={endDate}/>
      <div className="sidebar">
        <h2>플로깅 현황</h2>
        <Nav onCreate={handleCreate}/>
        <Chart startDate={startDate} endDate={endDate}/>
        <Table startDate={startDate} endDate={endDate}/>
      </div>
    </section>
  );
};

export default Contents;
