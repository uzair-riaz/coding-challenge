import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function LineChart(props) {
    const {chartData} = props;

    const options = {
        title: {
            text: null
        },
        xAxis: {visible: false},
        yAxis: {visible: false},
        legend: {enabled: false},
        chart: {height: '45%'},
        plotOptions: {
            series: {
                color: '#9995DD',
                lineWidth: 1,
                marker: {
                    fillColor: '#FFFFFF',
                    lineWidth: 1,
                    lineColor: '#9995DD',
                    width: 8,
                    height: 8
                }
            }
        },
        series: [{
            name: 'Conversions',
            data: Object.keys(chartData).map(key => {
                const conversions = chartData[key].filter(item => item.type === 'conversion').length;

                return [parseInt(key), conversions];
            })
        }]
    }

    return <HighchartsReact
        highcharts={Highcharts}
        options={options}
    />
}
