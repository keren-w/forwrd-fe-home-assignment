import { useRef, useEffect } from 'react';
import styles from './statistics.module.css';
import { Loader } from '../../components/Loader';
import {useUsersContext} from '../../context/usersContext';
import countryOptions from '../../data/countries.json';
import Chart from 'chart.js/auto';

function StatisticsPage() {
  const { loading, userList, usersData } = useUsersContext();
  const pageRoot = useRef(null);

  const usersCountByCountry = userList
    .map(userId => usersData[userId]?.country.value)
    .reduce((acc, countryName) => {
      if (!acc[countryName]) {
        acc[countryName] = 1;
      } else {
        acc[countryName]++
      }
      return acc;
    }, {})

  const chartData = {
    labels: [...countryOptions],
    datasets: [{
      data: countryOptions.map(countryName => usersCountByCountry[countryName]),
      backgroundColor:[
      '#4dc9f6',
      '#f67019',
      '#f53794',
      '#537bc4',
      '#acc236',
      '#166a8f',
      '#00a950',
      '#58595b',
      '#8549ba'],
      hoverOffset: 4
    }]
  };

  useEffect(() => {
    const ctx = pageRoot.current;

    const destroyStatisticChart = () => {
      let chartStatus = Chart.getChart('chartContainer');
      if (chartStatus != undefined) {
        chartStatus.destroy();
      }
    };

    const createNewChart = async () => {
      destroyStatisticChart();
     return new Chart(ctx, {
      type: 'pie',
      data: chartData
    })  
  }

  createNewChart();
  return destroyStatisticChart;
  }, [usersData]);

  if (loading) {
   return <Loader/>
  }
  return <canvas ref={pageRoot} id='chartContainer' className={styles.pageRoot}>StatisticsPage</canvas>;
}

export default StatisticsPage;
