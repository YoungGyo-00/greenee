import React from 'react';
import "../styles/css/Nav.css";

const Navs = () => {
  return (
    <div className="form-group">
      <input type="date" className="form-control" placeholder="20년 10월" />
      <label>~</label>
      <input type="date" className="form-control" placeholder="21년 11월" />
      <button type="submit" className="btn-default">검색</button>
    </div>
  );
};

export default Navs;