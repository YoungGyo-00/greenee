import React, {useState, useEffect} from 'react';
import "../styles/css/Nav.css";

const Navs = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  useEffect(() => {
    const curr = new Date();
    const date = curr.toISOString().substr(0,10);
    setStartDate(date);
    setEndDate(date);
  }, [])
  
  useEffect(() => {
    console.log(startDate);
    console.log(endDate);
  }, [startDate, endDate])
  
  const onClick = () => {
    props.onCreate(startDate, endDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onCreate(startDate, endDate);
  }

  return (
    <div onSubmit={handleSubmit} className="form-group">
      <input className="form-control" 
        type="date"
        value={startDate}
        onChange={date => setStartDate(date.target.value)}/>
      <label>~</label>
      <input className="form-control" 
        type="date" 
        value={endDate}
        onChange={date => setEndDate(date.target.value)} />
      <button className="btn-default"
        type="submit"
        onClick={onClick}
      >검색</button>
    </div>
  );
};

export default Navs;