fetch('https://data.cdc.gov/resource/w9j2-ggv5.csv')
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

function csvToSeries(text) {
    const lifeExp = 'average_life_expectancy';
    let dataAsJson = JSC.csv2Json(text);
    let Male = [], Female = [];
    let White = [], Black = [];


    dataAsJson.forEach(function (row) {
        if(row.sex === 'Both Sexes'){
            if(row.race === 'White'){
                White.push({x: row.year, y: row[lifeExp]} );
            } else if (row.race === 'Black') {
                Black.push({x: row.year, y: row[lifeExp]} );
            }
        }
        
        // add either to male, female, or discard.
        if (row.race === 'All Races') {
            if (row.sex === 'Male') {
                Male.push({x: row.year, y: row[lifeExp]});
                
            } else if (row.sex === 'Female') {
                Female.push({x: row.year, y: row[lifeExp]});
            }
        }
    });
    return [
        {name: 'Black', points: Black},
        {name: 'White', points: White},
        {name: 'Male', points: Male},
        {name: 'Female', points: Female}
    ]
    
}

function renderCharts(series){

    JSC.Chart('chartDivA',{
        title_label_text: 'Life Expectancy in the United States',
        annotations: [{
            label_text: 'Source: National Center for Health Statistics',
            position: 'bottom left'
        }],
        legend_template: '%icon,%name',
        legend_visible: true,
        defaultSeries_lastPoint_label_test: '<b>%seriesName</b>',
        xAxis_crosshair_enabled: true,
        //xAxis: {crosshari: {enabled: true}},
        defaultPoint_tooltip: '%seriesName <b>%yValue</b> years', 
        series: [series[0],series[1]]
    });
    JSC.Chart('chartDivB',{
        title_label_text: 'Life Expectancy in the United States',
        annotations: [{
            label_text: 'Source: National Center for Health Statistics',
            position: 'bottom left'
        }],
        legend_template: '%icon,%name',
        legend_visible: true,
        defaultSeries_lastPoint_label_test: '<b>%seriesName</b>',
        xAxis_crosshair_enabled: true,
        //xAxis: {crosshari: {enabled: true}},
        defaultPoint_tooltip: '%seriesName <b>%yValue</b> years',
        series: [series[2],series[3]]
    });

}

