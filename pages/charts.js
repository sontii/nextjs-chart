import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useRouter } from 'next/router';
import { faker } from '@faker-js/faker';


function App() {

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = labels.map(() => faker.datatype.number({max:100}));
  const label = 'MacGyver, Franey and Kshlerin';

  const populateChart = {
    labels,
    datasets:[
      {
        label,
        data,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
    ],
  };
  
  const cloneData = {...populateChart};

  const [chartData, setChartData] = useState({
    datasets: [],
  })

  const [chartDataBottom, setChartDataBottom] = useState({
    datasets: [],
  })

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData(populateChart);
    setChartOptions({
      responsive: true,
    });
  }, []);

  useEffect(() => {
    setChartDataBottom(cloneData);
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
      //query param back to input box
      let delimitParam = delmiter(qParam);
      window.document.getElementById('sParam').value = delimitParam;
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
      labels,
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

  //delmiter values
  function delmiter(cleanValue){
    var NrFormat = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0});
    var cleanValue = NrFormat.format(cleanValue);
    return cleanValue; 
  }

  //check number then change input value
  function inputFormat (e){
    var cleanValue = e.target.value.replace(/,/g, '');
    if (!isNaN(cleanValue)){
    //input box delmiter
    e.target.value = delmiter(cleanValue);

    } else {
      alert('only numbers');
      const replacedValue = e.target.value.slice(0, -1);
      e.target.value = replacedValue;
    }
  }

  //pass to url 'q' search param
  function changeUrl (e) {
    router.push({
      query: { q: parseInt(e.target.value.replace(/,/g, ''))}
    });
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
        onPaste={e => {inputFormat(e); changeUrl(e)}}
        onChange={e => {inputFormat(e); changeUrl(e)}}/>
      </div>
      <Line options={chartOptions} data={chartData} /><p></p>
      <Line options={chartOptions} data={chartDataBottom} />
    </div>
  );
}

export default App;
