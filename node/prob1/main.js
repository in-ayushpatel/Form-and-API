const csv = require('csv-parser')
const fs = require('fs')

const result = [];

fs.createReadStream('kepler_data.csv').pipe(csv({}))
    .on('data', (data) => {
        if(data.koi_disposition == "CONFIRMED" && data.koi_insol <1.11 && data.koi_insol >0.36 && data.koi_prad<1.6){
            result.push(data)
        }
    })
    .on('end', () =>{console.log(result)})