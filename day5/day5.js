const fs = require('fs');

function getHalf(spot, rows) {
    const front = spot === 'F' || spot === 'L' ? true : false;
    const half = Math.ceil(rows.length / 2);
    if (front) {
        return rows.splice(0, half);
    } else {
        return rows.splice(-half);
    }
}

function findSpot(directions, length) {
    let rows = new Array(length);
    for (let x=0;x<rows.length;x++) {
        rows[x] = x;
    }
    for (let x=0;x<directions.length;x++) {
        rows = getHalf(directions[x], rows);
    }
    return rows[0];
}

fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let input = data.split(/\r?\n/);
    let largestSeat = 0;
    const seatIds = []
    for(let x=0;x<input.length;x++) {
        let first = input[x].substring(0, 7);
        let second = input[x].substring(7, input[x].length);
        let firstNumber = findSpot(first, 128);
        let secondNumber = findSpot(second, 8);
        const seatId = firstNumber * 8 + secondNumber;
        seatIds.push(seatId);
        largestSeat = seatId > largestSeat ? seatId : largestSeat;
    }
    //part 1
    console.log(largestSeat);
    seatIds.sort();
    let seat = seatIds[0];
    for (let x=1;x<seatIds.length;x++) {
        if (seat + 1 === seatIds[x]) {
            seat++;
        } else {
            //Part 2
            console.log(seat+1);
            break;
        }
    }
})