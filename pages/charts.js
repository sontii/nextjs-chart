import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useRouter } from 'next/router';
import { faker } from '@faker-js/faker';
import _ from "lodash";


function App() {

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const fillData = labels.map(() => faker.datatype.number({max:100}));
  const label = faker.company.companyName();

  const [chartData, setChartData] = useState({
    datasets: [],
  })

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels,
      datasets:[
        {
          label,
          data: fillData,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.4)',
        },
      ],
    });
    setChartOptions({
      responsive: true,
    });
  }, []);

  var cloneData = _.cloneDeep(chartData);
  console.log(cloneData === chartData);
  //const cloneData = {...chartData};

  const router = useRouter();
  //get search param from url
  //dynamic url fired twice the render, so check datasets not empty befor call changedata
  useEffect(() => {
    if (router.asPath !== router.route) {
      if (typeof chartData.datasets !== 'undefined' && chartData.datasets.length > 0){
      let qParam = location.search.slice(3);
      changeData(qParam);
      }
    }
  }, [router])


  // reload page check randomized data
  function reloadPage(){
    router.reload(window.location.pathname)
  }

  //change firts value
  function changeData(cleanValue) {
    //spred array to new array
    //slice first then push newData
    var newData = [...chartData.datasets[0].data].slice(1);
    newData = [parseInt(cleanValue), ...newData];

    //new state for chart
    setChartData({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets:[
        {
          label,
          data: newData,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.4)',
        },
      ],
    });

  }

  function delimiter (value){
    if (!isNaN(value)){
      //input box delmiter
      var caller = event.target;
      var NrFormat = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0});
      let cleanValue = caller.value.replace(/,/g, '');
      value = NrFormat.format(cleanValue);
      caller.value = value;

      //pass to url 'q' search param
      router.push({
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
        onChange={e => { delimiter(e.target.value.replace(/,/g, ''))}}/>
      </div>
      <Line options={chartOptions} data={chartData} /><p></p>
      <Line data={cloneData} />
    </div>
  );
}

export default App;
