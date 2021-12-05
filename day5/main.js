const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, '/data.txt'), 'utf8');
const arrayData = data.split('\r\n');

const data2 = fs.readFileSync(path.join(__dirname, '/dataTest.txt'), 'utf8');
const dataTest = data2.split('\r\n');

generateVentsMap(arrayData, false);
generateVentsMap(arrayData, true);


function generateVentsMap(dataList, isPartTwo){
    let ventsMap = {};
    let dangerZone = [];
    for (const line of dataList) {
        let points = line.split(' -> ');
        let a = points[0].split(',').map(Number);
        let b = points[1].split(',').map(Number);
        //console.log(`${a} to ${b}`);
        let y = a[1];
        let x = a[0];
        let lastRun = false;
        if(a[0] === b[0]){
            //console.log("Change Y");
            if(ventsMap[x] === undefined){
                ventsMap[x] = {};
            }
            do{
                //console.log(`Current progress: ${x}/${b[0]} Done:${x !== b[0]} ${x > b[0] ? "Need lower": x === b[0] ? "Done" : "Need higher"}`);
                if(ventsMap[x][y] === undefined){
                    ventsMap[x][y] = 0;
                }
                ventsMap[x][y]++;

                if(ventsMap[x][y] >= 2 && dangerZone.indexOf(`${x},${y}`) === -1){
                    dangerZone.push(`${x},${y}`);
                }

                if(!lastRun){
                    y > b[1] ? y--: y === b[1] ? 0 : y++;
                    lastRun = y === b[1];
                } else {
                    lastRun = false;
                }
            } while(y !== b[1] || lastRun)
        } else if(a[1] === b[1]){
            //console.log("Change X");
            do{
                //console.log(`Current progress: ${x}/${b[0]} Done:${x !== b[0]} ${x > b[0] ? "Need lower": x === b[0] ? "Done" : "Need higher"}`);
                if(ventsMap[x] === undefined){
                    ventsMap[x] = {};
                }
                if(ventsMap[x][y] === undefined){
                    ventsMap[x][y] = 0;
                }
                ventsMap[x][y]++;

                if(ventsMap[x][y] >= 2 && dangerZone.indexOf(`${x},${y}`) === -1){
                    dangerZone.push(`${x},${y}`);
                }

                if(!lastRun){
                    x > b[0] ? x--: x === b[0] ? 0 : x++;
                    lastRun = x === b[0];
                } else {
                    lastRun = false;
                }
            } while(x !== b[0] || lastRun)
        }  else if(isPartTwo) {
            do{
                //console.log(`Current progress: ${x}/${b[0]} Done:${x !== b[0]} ${x > b[0] ? "Need lower": x === b[0] ? "Done" : "Need higher"}`);
                if(ventsMap[x] === undefined){
                    ventsMap[x] = {};
                }
                if(ventsMap[x][y] === undefined){
                    ventsMap[x][y] = 0;
                }
                ventsMap[x][y]++;

                if(ventsMap[x][y] >= 2 && dangerZone.indexOf(`${x},${y}`) === -1){
                    dangerZone.push(`${x},${y}`);
                }

                if(!lastRun){
                    x > b[0] ? x--: x === b[0] ? 0 : x++;
                    y > b[1] ? y--: y === b[1] ? 0 : y++;
                    lastRun = x === b[0] && y === b[1];
                } else {
                    lastRun = false;
                }
            } while((x !== b[0] && y !== b[1]) || lastRun)
        }
    }
    //console.log(ventsMap);
    console.log(dangerZone.length);
}


