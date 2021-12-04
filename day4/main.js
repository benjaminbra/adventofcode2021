const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, '/data.txt'), 'utf8');
const arrayData = data.split('\r\n\r\n');

const data2 = fs.readFileSync(path.join(__dirname, '/dataTest.txt'), 'utf8');
const dataTest = data2.split('\r\n\r\n');

startBingo(arrayData);

function doDraws(draw, numberArrays, checkedArrays) {
    let drawI = 0;
    let bingoWin = false;
    let winScore = 0;
    let winList = [];
    while (drawI < draw.length && !bingoWin) {
        numberArrays.forEach((bingoCard, CardI) => {
            bingoCard.forEach((line, lineI) => {
                let drawNumber = draw[drawI];
                let numberI = line.indexOf(drawNumber);
                if (numberI > -1) {
                    //console.log(`line ${lineI} - Cell ${numberI} : ${drawNumber}`);
                    checkedArrays[CardI][lineI][numberI] = 1;
                    if(checkWin(checkedArrays[CardI], lineI, numberI)){
                        bingoWin = true;
                        let cardSum = getCardUncheckedSum(bingoCard, checkedArrays[CardI]);
                        //console.log(`Sum score ${cardSum} - Win Number ${drawNumber} : ${parseInt(drawNumber) * cardSum}`)
                        winScore = parseInt(drawNumber) * cardSum;
                    }
                }
            })
        });
        drawI++;
    }
    return winScore;
}

function doDrawsWithLastWin(draw, numberArrays, checkedArrays) {
    let drawI = 0;
    let bingoWin = false;
    let winScore = 0;
    let winList = [];
    while (drawI < draw.length && !bingoWin) {
        numberArrays.forEach((bingoCard, CardI) => {
            bingoCard.forEach((line, lineI) => {
                let drawNumber = draw[drawI];
                let numberI = line.indexOf(drawNumber);
                if (numberI > -1) {
                    //console.log(`line ${lineI} - Cell ${numberI} : ${drawNumber}`);
                    checkedArrays[CardI][lineI][numberI] = 1;
                    if(checkWin(checkedArrays[CardI], lineI, numberI) && winList.indexOf(CardI) === -1){
                        //console.log(`Progress : ${winList.length}/${numberArrays.length - 1}`)
                        if(winList.length === numberArrays.length - 1){
                            bingoWin = true;
                            let cardSum = getCardUncheckedSum(bingoCard, checkedArrays[CardI]);
                            //console.log(`Sum score ${cardSum} - Win Number ${drawNumber} : ${parseInt(drawNumber) * cardSum}`)
                            winScore = parseInt(drawNumber) * cardSum;
                            return false;
                        }
                        winList.push(CardI);
                    }
                }
            })
        });
        drawI++;
    }
    return winScore;
}

function getCardUncheckedSum(bingoCard, checkedCard){
    let sum = 0;
    for (let i = 0; i < checkedCard.length; i++) {
        for(let j = 0; j < checkedCard[i].length; j++){
            if(checkedCard[i][j] === 0){
                sum += parseInt(bingoCard[i][j]);
            }
        }
    }
    return sum;
}

function checkWin(checkedCard, lineI, colI){
    let nbCols = checkedCard[lineI].length;


    let horizontalWin = checkedCard[lineI].reduce((a, v) => (v === 1 ? a + 1: a), 0) === nbCols;
    let verticalWin = true;
    checkedCard.forEach((line) => {
        if(line[colI] === 0){
            verticalWin = false;
        }
    });

    //console.log(`HWin ${horizontalWin} - VWin: ${verticalWin}`)

    return horizontalWin || verticalWin;
}

function startBingo(dataList){
    let draw = dataList[0].split(',');
    let checkedArrays = [];
    let numberArrays = [];

    // Init checked Array
    for (let bingoIndex = 1; bingoIndex < dataList.length; bingoIndex++) {
        let bingoNumber = [];
        let bingoCheck = [];
        let bingoLines = dataList[bingoIndex].split('\r\n');
        bingoLines.forEach((line) => {
           let numbers = line.split(' ').filter(e => e);
           bingoNumber.push(numbers);
           bingoCheck.push(Array(numbers.length).fill(0));
        });
        checkedArrays.push(bingoCheck);
        numberArrays.push(bingoNumber);
    }

    let winnerScore = doDraws(draw, numberArrays, checkedArrays);
    let LastWinnerScore = doDrawsWithLastWin(draw, numberArrays, checkedArrays);

    console.log(winnerScore);
    console.log(LastWinnerScore);
}

