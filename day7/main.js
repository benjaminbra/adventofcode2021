const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, '/data.txt'), 'utf8');
const arrayData = data.split(',').map(Number);

const data2 = fs.readFileSync(path.join(__dirname, '/dataTest.txt'), 'utf8');
const dataTest = data2.split(',').map(Number);

calcFuelCrab(arrayData)
alternativeCalc(arrayData)

function calcFuelCrab(dataList){

    let max = Math.max(...dataList);
    let min = Math.min(...dataList);

    let cheapest = Number.MAX_SAFE_INTEGER;
    let cheapest2 = Number.MAX_SAFE_INTEGER;

    for(let i = min; i <= max; i++){
        let currentSum = 0;
        let currentSumExpanded = 0;
        dataList.forEach(current => {
            let n = Math.abs(current - i);
            currentSum += n;
            currentSumExpanded += (n * (n+1))/2;
        });
        if(currentSum < cheapest){
            cheapest = currentSum;
        }
        if(currentSumExpanded < cheapest2){
            cheapest2 = currentSumExpanded;
        }
    }

    console.log(`${cheapest}`);
    console.log(`${cheapest2}`);
}

// More performant try

function alternativeCalc(dataList){
    let medianVal = median(dataList);
    let val = dataList.map((a) => Math.abs(a - medianVal)).reduce((a,b) => a + b, 0)
    let mean = Math.floor(dataList.reduce((a,b) => a + b, 0) / dataList.length);
    let val2 = dataList.map((d) => {
        let n = Math.abs(d - mean);
        return (n * (n + 1)) / 2;
    }).reduce((a,b) => a + b, 0);

    console.log(val)
    console.log(val2)
}

function median(numbers){
    const sorted = numbers.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
}