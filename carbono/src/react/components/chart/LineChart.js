import React from "react"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

export const LineChart = ({lineChart}) => {

    return(
        <Line data={lineChart} />
    )
}