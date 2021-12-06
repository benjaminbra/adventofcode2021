const fs = require('fs');
const path = require('path');
const MAX_ARRAY_LENGTH = 4294967296;

const data = fs.readFileSync(path.join(__dirname, '/data.txt'), 'utf8');
const arrayData = data.split(',').map(Number);

const data2 = fs.readFileSync(path.join(__dirname, '/dataTest.txt'), 'utf8');
const dataTest = data2.split(',').map(Number);

fishSimulation(arrayData, 80);
fishSimulation(arrayData, 256);

function fishSimulation(dataList, nbDays){
    let simResults = {};
    for(let i = 0; i <= 8; i++){
        simResults[i] = dataList.filter(e => parseInt(e) === i).length;
    }
    for(let day = 0; day < nbDays; day++){
        let dailyResult = {};
        for(let fishStateI = 7; fishStateI >= 0; fishStateI--){
            dailyResult[fishStateI] = simResults[fishStateI + 1];
        }
        dailyResult[8] = simResults[0];
        dailyResult[6] += simResults[0];
        simResults = dailyResult;
    }
    console.log(Object.values(simResults).reduce((a, b) => a + b));
}