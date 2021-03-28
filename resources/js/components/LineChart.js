import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function Line(props) {
    const {chartData} = props;

    const options = {
        title: {
            text: null
        },
        xAxis: {visible: false},
        yAxis: {visible: false},
        legend: {enabled: false},
        chart: {height: '45%'},
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
