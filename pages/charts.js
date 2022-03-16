import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useRouter } from 'next/router';
import { faker } from '@faker-js/faker';


function App() {

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const fillData = labels.map(() => faker.datatype.number({max:100}));
  const label = faker.company.companyName();
  const cloneData = [...fillData];

  const [chartData, setChartData] = useState({
    datasets: [],
  })

  const [chartDataBottom, setChartDataBottom] = useState({
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

  useEffect(() => {
    setChartDataBottom({
      labels,
      datasets:[
        {
          label,
          data: cloneData,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.4)',
        },
      ],
    });
    setChartOptions({
      responsive: true,
    });
  }, []);


  const router = useRouter();
  //get search param from url
  //dynamic url fired twice the render, so check datasets not empty befor call changedata
  useEffect(() => {
    if (router.asPath !== router.route) {
      if (typeof chartData.datasets !== 'undefined' && chartData.datasets.length > 0){
      let qParam = location.search.slice(3);
      
      //if no param set to 0
      if (qParam === ''){
        qParam= 0;
      }
      
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
    console.log(cleanValue);
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

  function delmiter(value){
    var NrFormat = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0});
    value = NrFormat.format(value);
    return value
  }

  function inputFormat (e){
    e.target.value = e.target.value.replace(/,/g, '');
    if (!isNaN(e.target.value)){
    //input box delmiter
    //var NrFormat = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0});
    //var cleanValue = getInput.replace(/,/g, '');
    //value = NrFormat.format(cleanValue);
    delmiter(e.target.value);
    e.target.value = value;

    } else {
      alert('only numbers');
      const replacedValue = value.slice(0, -1);
      e.target.value = replacedValue;
    }
  }

  //pass to url 'q' search param
  function changeUrl (e) {
    //console.log(e)
    /* router.push({
      query: { q: parseInt(param)}
    }); */

  };


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
        onChange={e => { inputFormat(e); changeUrl()}}/>
      </div>
      <Line options={chartOptions} data={chartData} /><p></p>
      <Line options={chartOptions} data={chartDataBottom} />
    </div>
  );
}

export default App;
