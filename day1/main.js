const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, '/data.txt'), 'utf8');
const arrayData = data.split('\n');

calcNbUp(arrayData);
calcNbUpSumDepth(arrayData);

function calcNbUp(dataList){
    let nbUp = 0;
    let previous = null;
    for(let value of dataList){
        let intValue = parseInt(value);
        if(previous != null){
            if(intValue > previous){
                nbUp++;
            }
        }
        previous = intValue;
    }

    console.log(nbUp);
}

function calcNbUpSumDepth(dataList){
    let nbUp = 0;
    let previous = null;
    for(let i = 0; i < dataList.length - 2; i++){
        let valueA = parseInt(dataList[i]);
        let valueB = parseInt(dataList[i + 1]);
        let valueC = parseInt(dataList[i + 2]);
        let sum = valueA + valueB + valueC;

        if(previous != null){
            if(sum > previous){
                nbUp++;
            }
        }
        previous = sum;
    }

    console.log(nbUp);
}