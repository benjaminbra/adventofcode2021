const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, '/data.txt'), 'utf8');
const arrayData = data.split('\n');

let dataTest = ['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010'];

getPowerConsumption(arrayData);

function getPowerConsumption(dataList){
    let gamma = getGammaRate(dataList);
    let epsilon = getEpsilonRate(gamma);

    let power = parseInt(gamma, 2) * parseInt(epsilon, 2);
    console.log(power);
}

function getGammaRate(dataList) {
    let gamma = '';
    let reportSize = arrayData[0].length;
    for (let bit = 0; bit < reportSize; bit++) {
        let oneCount = 0;
        let zeroCount = 0;

        for (let line = 0; line < dataList.length; line++) {
            let currentBit = dataList[line][bit];
            if (currentBit === '1') {
                oneCount++;
            } else if (currentBit === '0') {
                zeroCount++;
            }
        }

        if(oneCount > zeroCount){
            gamma += '1';
        } else if(zeroCount > oneCount) {
            gamma += '0';
        }
    }

    console.log(`${gamma} ${parseInt(gamma, 2)}`);
    return gamma;
}

function getEpsilonRate(gamma){
    let epsilon = '';
    for(let i = 0; i < gamma.length; i++){
        epsilon += gamma[i] === '1' ? '0' : '1';
    }

    console.log(`${epsilon} ${parseInt(epsilon, 2)}`);
    return epsilon;
}

/**
 * PART TWO
 */

getLifeSupportRating(arrayData);

function getLifeSupportRating(dataList){
    let oxygen = getRating(dataList, true);
    let co2 = getRating(dataList, false);

    console.log(parseInt(oxygen, 2) * parseInt(co2, 2))
}

function getRating(dataList, isOxygen){
    let bit = 0;
    let reportSize = dataList[0].length;
    let previousList = dataList;
    let currentList = dataList;
    while(bit < reportSize && currentList.length > 1){
        //console.log(`\n\nNew bit ${bit} - current size : ${currentList.length}`)
        previousList = currentList;
        currentList = [];
        let criteriaBit = getCurrentBitCriteria(previousList, bit, isOxygen);
        //console.log(`Criteria bit prefered : ${criteriaBit}`)
        for(let line = 0; line < previousList.length; line++){
            let lineVal = previousList[line];
            let bitVal = lineVal[bit];
            if(bitVal === criteriaBit){
                currentList.push(lineVal);
            }
        }
        bit++;
        //console.log(`List of this loop - size ${currentList.length}`)
        //console.log(currentList);
    }

    console.log(currentList[0]);
    return currentList[0];
}


function getCurrentBitCriteria(dataList, currentBit, isOxygen){
    let oneCount = 0;
    let zeroCount = 0;

    for(let line = 0; line < dataList.length; line++){
        let bitValue = dataList[line][currentBit];
        if(bitValue === '1'){
            oneCount++;
        } else if(bitValue === '0'){
            zeroCount++;
        }
    }
    //console.log(`${isOxygen ? 'Oxygen' : 'CO2'} : 1-${oneCount} 0-${zeroCount} ${isOxygen ? oneCount >= zeroCount ? '1' : '0' : zeroCount <= oneCount ? '0' : '1'}`);
    return isOxygen ? oneCount >= zeroCount ? '1' : '0' : zeroCount <= oneCount ? '0' : '1';
}