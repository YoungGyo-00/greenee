import React from "react";
import Map from "./Map";
import Chart from "./Chart.js";
import Table from "./Table";
import Nav from "./Nav.js";

const Contents = () => {
  return (
    <section>
      <Map />
      <div className="sidebar">
        <h2>플로깅 현황</h2>
        <Nav />
        <Chart />
        <Table />
      </div>
    </section>
  );
};

export default Contents;
