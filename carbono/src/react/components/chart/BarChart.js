import React from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const BarChart = ({chartData}) => {

    let options = {
        scales: {
            yAxes: [{
                ticks: {
                    fontSize: 100
                }
            }]
        }
    }


    return(
        < Bar data={chartData}  
        options = {options}  
         />
    )
}