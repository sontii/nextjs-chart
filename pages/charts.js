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
  Router.reload(window.location.pathname)
}

 // delmiter to input
 function delimiter (value){
  var caller = event.target;
  var NrFormat = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0});
  let delValue = caller.value.replace(/,/g, '');
  value = NrFormat.format(delValue);
  caller.value = value;
  console.log(value)
  
  // replace first point data in the bottom chart if not NaN
  if (!isNaN(NrFormat)){
      data.datasets[0].data.shift();
      data.datasets[0].data.unshift(parseInt(NrFormat));
      useState(myLineChart)
  }
}

  return (
    <div className="App">
      <span>Chart.js Demo</span>
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
