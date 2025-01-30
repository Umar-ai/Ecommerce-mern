import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Product_chart = ({label,datas}) => {
  
  const months=['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December']
 
const realLabels=label.map((item)=>{
  return months[item]
  })
  const data = {
    labels: realLabels,
    datasets: [
      {
        label: 'Users Growth',
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 5, // thicker line
        data: datas,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        grid: {
          borderWidth: 12, // thicker grid lines
          color: 'rgba(0, 0, 0, 0.1)' // color of grid lines
        }
      },
      y: {
        grid: {
          lineWidth: 2, // thicker grid lines
          color: 'rgba(0, 0, 0, 0.1)' // color of grid lines
        }
      }
    }
  };

  return (
    <div className='md:w-[60vw] w-[80vw]'>
      <Line data={data} options={options} />
    </div>
  )
};

export default Product_chart;