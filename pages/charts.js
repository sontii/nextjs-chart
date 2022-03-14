import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Router from 'next/router';
import { useRouter } from 'next/router';


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


  const router = useRouter()

  useEffect(() => {
    router.events.on('beforeHistoryChange', (url, { shallow }) => {
      let qParam = location.search.slice(3);
      console.log(qParam);
    })
  });

  // reload page check randomized data
  function reloadPage(){
    router.reload(window.location.pathname)
  }
  
  function teszt (cleanValue){
    console.log(chartData.datasets)
  }

  function changeData(cleanValue) {
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

  // delmiter to input
  function delimiter (value){
    if (!isNaN(value)){
      //input box delmiter
      var caller = event.target;
      var NrFormat = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0});
      let cleanValue = caller.value.replace(/,/g, '');
      value = NrFormat.format(cleanValue);
      caller.value = value;

      //pass to url 'q' search param
      router.replace({
        query: { q: parseInt(cleanValue)}
      });
    } else {
      alert('only numbers');
      var caller = event.target;
      const replacedValue = value.slice(0, -1);
      caller.value = replacedValue;
    }
  }

  return (
    <div className="App">
      <span>Chart.js replace first value</span>
      <div>
        <button onClick={reloadPage}>Reload Page</button>
      </div>

      <div>
        <label htmlFor="fname">search param: </label>
        <input type="text"
        id="sParam" 
        //value={number || ''} 
        onChange={e => { delimiter(e.target.value.replace(/,/g, ''))}}/>
      </div>
      <Line options={chartOptions} data={chartData} />
    </div>
  );
}

export default App;
