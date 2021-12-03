const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, '/data.txt'), 'utf8');
const arrayData = data.split('\n');

const HORIZONTAL_POSITIVE = "forward";
const VERTICAL_NEGATIVE = "up";
const VERTICAL_POSITIVE = "down";

const dataTest = ['forward 5','down 5','forward 8','up 3','down 8','forward 2'];

calcHorizontalAndDepth(arrayData);
calcHorizontalAndDepthWithAim(arrayData);

function calcHorizontalAndDepth(dataList){
    let currentHorizontal = 0;
    let currentDepth = 0;

    for(let value of dataList){
        let command = value.split(' ');
        let intValue = parseInt(command[1]);
        switch (command[0]){
            case HORIZONTAL_POSITIVE:
                currentHorizontal += intValue;
                break;
            case VERTICAL_NEGATIVE:
                currentDepth -= intValue;
                break;
            case VERTICAL_POSITIVE:
                currentDepth += intValue;
                break;
        }
    }

    console.log(currentHorizontal * currentDepth);
}

function calcHorizontalAndDepthWithAim(dataList){
    let currentHorizontal = 0;
    let currentDepth = 0;
    let currentAim = 0;

    for(let value of dataList){
        let command = value.split(' ');
        let intValue = parseInt(command[1]);
        switch (command[0]){
            case HORIZONTAL_POSITIVE:
                currentHorizontal += intValue;
                currentDepth += currentAim * intValue;
                break;
            case VERTICAL_NEGATIVE:
                currentAim -= intValue;
                break;
            case VERTICAL_POSITIVE:
                currentAim += intValue;
                break;
        }
    }

    console.log(currentHorizontal * currentDepth);
}