const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, '/data.txt'), 'utf8');
const arrayData = data.split(',').map(Number);

const data2 = fs.readFileSync(path.join(__dirname, '/dataTest.txt'), 'utf8');
const dataTest = data2.split(',').map(Number);

calcFuelCrab(arrayData)

function calcFuelCrab(dataList){
    let max = 0;
    let min = -1;

    let cheapest = -1;
    let cheapest2 = -1;

    dataList.forEach(current => {
        if(current > max){
            max = current;
        }
        if(min === -1 || current < min){
            min = current;
        }
    })

    for(let i = min; i <= max; i++){
        let currentSum = 0;
        let currentSumExpanded = 0;
        dataList.forEach(current => {
            let n = Math.abs(current - i);
            currentSum += n;
            currentSumExpanded += (n * (n+1))/2;
        });
        if(cheapest === -1 || currentSum < cheapest){
            cheapest = currentSum;
        }
        if(cheapest2 === -1 || currentSumExpanded < cheapest2){
            cheapest2 = currentSumExpanded;
        }
    }

    console.log(`${cheapest}`);
    console.log(`${cheapest2}`);
}