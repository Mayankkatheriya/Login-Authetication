import React from "react";
import { Link } from 'react-router-dom'

const Dashboarrd = () => {

  return (
    <section className="dashboard">
      <h1>Dashboard</h1>
      <Link to={'/profile'}>Profile</Link>
    </section>
  );
};

export default Dashboarrd;
