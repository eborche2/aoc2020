const fs = require('fs');
function checkSurrounding(map, surrounding, seat) {
    let seats = 0;
    if (seat === ".") {
        return [seat, false];
    }
    for (let z=0;z<surrounding.length;z++) {
        if (surrounding[z][0][0] > -1 && surrounding[z][0][0] < map[0].length) {
            if (surrounding[z][0][1] > -1 && surrounding[z][0][1] < map.length) {
                let spot = map[surrounding[z][0][1]][surrounding[z][0][0]];
                if (spot === '#') {
                    seats++;
                }
            }
        }
    }
    if (seat === '#' && seats >= 4) {
        return ['L', true];
    } else if(seat === 'L' && seats === 0) {
        return ['#', true];
    } else {
        return [seat, false];
    }
}
function checkSurroundingSlider(map, surrounding, seat) {
    let seats = 0;
    if (seat === ".") {
        return [seat, false];
    }
    while(surrounding.length > 0) {
        let newSurrounding = [];
        for (let z=0;z<surrounding.length;z++) {
            if (surrounding[z][0][0] > -1 && surrounding[z][0][0] < map[0].length) {
                if (surrounding[z][0][1] > -1 && surrounding[z][0][1] < map.length) {
                    let spot = map[surrounding[z][0][1]][surrounding[z][0][0]];
                    if (spot === '#') {
                        seats++;
                    } else if (spot === '.') {
                        if (seats < 5) {
                            newSurrounding.push([[surrounding[z][0][0] + surrounding[z][1][0], surrounding[z][0][1] + surrounding[z][1][1]], surrounding[z][1]]);
                        }
                    }
                }
            }
        }
        surrounding = newSurrounding;
    }
    if (seat === '#' && seats >= 5) {
        return ['L', true];
    } else if(seat === 'L' && seats === 0) {
        return ['#', true];
    } else {
        return [seat, false];
    }
}
function swapSeats(map, part1) {
    let occupiedSeats = 0;
    let surroundingSeats = [[1,0], [1,1], [0,1], [-1,1], [-1,0], [-1,-1], [0,-1], [1,-1]];
    let newMap = [];
    let changes = false;
    for (let y=0;y<map.length;y++) {
        let newRow = [];
        for (let x=0;x<map[0].length;x++) {
            let surrounding = surroundingSeats.map(surroundingSeat => [[surroundingSeat[0] + x, surroundingSeat[1] + y], surroundingSeat]);
            let result = part1 ? checkSurrounding(map, surrounding, map[y][x]) : checkSurroundingSlider(map, surrounding, map[y][x]);
            newRow.push(result[0]);
            if (result[1]) {
                changes = true;
            }
            if (result[0] === '#') {
                occupiedSeats++;
            }
        }
        newMap.push(newRow);
    }
    return [newMap, changes, occupiedSeats];
}
fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let input = data.split(/\r?\n/);
    let originalMap = input.map(row=>row.split(''));
    let changes = true;
    let result;
    let map = originalMap;
    while (changes) {
        result = swapSeats(map, true);
        map = result[0]
        changes = result[1];
    }
    //Part 1
    console.log(result[2]);
    changes = true;
    while (changes) {
        result = swapSeats(originalMap, false);
        originalMap = result[0];
        changes = result[1];
    }
    //Part 2
    console.log(result[2]);
});