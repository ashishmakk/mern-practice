import React, { useState } from "react";
import BarChart from "./BarChart";

function ChartsContainer({ data }) {
  return (
    <div className='mt-12'>
      <div>
        <h2 className='text-center'>Monthly Applications</h2>
        <BarChart data={data} />
      </div>
    </div>
  );
}

export default ChartsContainer;
