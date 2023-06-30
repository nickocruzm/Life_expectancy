
fetch('https://data.cdc.gov/resource/9j2v-jamp.csv')
   .then(function (response) {
    return response.text();
   })
   .then(function (text){
    let series = csvToSeries(text);
    renderCharts(series);
    console.log(series)
   })
   .catch(function (error) {
    console.log(error);
   });

function csvToSeries(text){
    const estimate = 'estimate'
    let dataAsJson = JSC.csv2Json(text);
    let collected_data = [];

    dataAsJson.forEach(function(row) {
        if(row.age === '15-24 years'){
            collected_data.push({x: row.year, y:row[estimate]})
        }
    });

    return [
        {name: '15_24years', points: collected_data}
    ]

}

function renderCharts(series){
    JSC.Chart('chartDiv',{
        title_label_text: 'mortality rate: 15-24',
        annotations: [{
            label_text: 'Source: National Center for Health Statistics',
            position: 'bottom left'
        }],
        legend_template: '%icon,%name',
        legend_visible: true,
        defaultSeries_lastPoint_label_test: '<b>%seriesName</b>',
        xAxis_crosshair_enabled: true,
        defaultPoint_tooltip: '%seriesName <b>%yValue</b> years',
        xAxis_crosshair_enabled: true,
        series: series

    });
}