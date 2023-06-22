JSC.Chart('chartDiv', {
    type: 'horizontal column',
    series: [
        {
            name:'Andy',
            points: [
                {x: 'Apples', y:50},
                {x: 'Oranges', y:42}
            ]
        },{
            name:'Anna',
            points:[
                {x: 'Apples', y: 30},
                {x: 'Oranges', y: 22}
            ]
        }
    ]
});

fetch('https://data.cdc.gov/resource/w9j2-ggv5.csv')
   .then(function (response) {
      return response.text();
   })
   .then(function (text) {
	csvToSeries(text);
   })
   .catch(function (error) {
      console.log(error);
   });

function csvToSeries(text) {
   console.log(text);
}

