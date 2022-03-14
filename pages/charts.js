import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Router from 'next/router';


function App() {

  const [chartData, setChartData] = useState({
    datasets: [],
  })

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets:[
        {
          label: "dataset for month",
          data: [12, 55, 65, 42, 55, 33, 18],
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.4)',
        },
      ],
    });
    setChartOptions({
      responsive: true,
    });
  }, []);

// reload page check randomized data
function reloadPage(){
  //Router.reload(window.location.pathname)
  let url = new URL(document.location.href);
  let params = new URLSearchParams(url.search);
  params.set('q', '343');
  params.toString();
  console.log(params);
}

// delmiter to input
function delimiter (value){
var caller = event.target;
var NrFormat = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0});
let cleanValue = caller.value.replace(/,/g, '');
value = NrFormat.format(cleanValue);
caller.value = value;

//spred array to new array
//slice first then push cleanData
var newData = [...chartData.datasets[0].data].slice(1);
newData = [cleanValue, ...newData];

//new state for chart
setChartData({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets:[
    {
      label: "dataset for month",
      data: newData,
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.4)',
    },
  ],
});
}

  return (
    <div className="App">
      <span>Chart.js replace first value</span>
      <div>
        <button onClick={reloadPage}>Reload Page</button>
      </div>

      <div>
        <label htmlFor="fname">search param: </label>
        <input
        id="sParam" 
        //value={number || ''} 
        onChange={e => { delimiter(e.target.value.replace(/,/g, ''))}}/>
      </div>
      <Line options={chartOptions} data={chartData} />
    </div>
  );
}

export default App;
