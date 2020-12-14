const fs = require('fs');
fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let input = data.split(/\r?\n/);
    let timestamp = parseInt(input[0]);
    let stops = input[1].split(',');
    let bestTime = timestamp;
    let bestId = 0;
    let total = 0;
    let sumIds = 0;
    let combo =[];
    let ids = [];
    let largest = 0;
    for (let x=0;x<stops.length;x++) {
        if (stops[x] !== 'x') {
            stops[x] = parseInt(stops[x]);
            sumIds += stops[x];
            if (stops[x] > largest) {
                largest = stops[x];
            }
            ids.push(stops[x]);
            combo.push([x, stops[x], x % stops[x], Math.floor(x / stops[x])]);
            total += x;
            let time = stops[x]- timestamp % stops[x];
            if (time < bestTime) {
                bestTime = time;
                bestId = stops[x];
            }
        }
    }
    // Part 1
    console.log(bestTime * bestId);
    console.log(sumIds, total);

    let factor = stops[0];
    let start = 0;
    let found = false;
    let newFactor = [];
    console.log(combo);
    while(!found) {
        if (start % stops[0] === 0) {
            for(let x=1;x<combo.length;x++) {
                if (x > 5) {
                    if (newFactor.length < 2) {
                        newFactor.push(start);
                    }
                    if (newFactor.length === 2) {
                        factor = newFactor[1] - newFactor[0];
                        found = true;
                        break;
                    }
                }
                if (combo[x][2] === combo[x][1] - (start % combo[x][1])) {
                    found = true;
                } else {
                    found = false;
                    break;
                }
            }
        }
        start += factor;
    }
    found = false;
    factor = BigInt(factor);
    start = BigInt(start);
    let originals = []
    for (let x=0;x<combo.length;x++) {
        combo[x][1] = BigInt(combo[x][1]);
        originals.push(combo[x][1]);
        combo[x][2] = BigInt(combo[x][2]);

    }
    console.log(start, factor);
    stops[0] = BigInt(stops[0]);
    while (!found) {
        if (start % stops[0] === BigInt(0)) {
            console.log(start);
            for(let x=1;x<combo.length;x++) {
                if (combo[x][2] === combo[x][1] - (start % combo[x][1])) {
                    found = true;
                } else {
                    found = false;
                    break;
                }
            }
        }
        start += factor;
    }
    start -= factor;
    //Part 2 Ugly solution. Sue me...
    console.log(start);
});