console.time("computation");
const fs = require('fs');
function getNextNumber(numbers, numberMap, x) {
    let last = numbers[x - 1];
    if (numberMap[last] === undefined) {
        numberMap[last] = x - 1;
    }
    let next = x -  1 - numberMap[last];
    if (next !== 0) {
        numberMap[last] = x -1;
    }
    return [next, numberMap];
}
fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let input = data.split(/\r?\n/);
    let numbers = input[0].split(',').map(stringNumber => parseInt(stringNumber));
    let hugeNumbers = new Array(30000010);
    let numberMap =  new Array(30000010);
    for (let x=0;x<numbers.length;x++) {
        hugeNumbers[x] = numbers[x];
        numberMap[numbers[x]] = x;
    }
    for (let x=numbers.length;x<30000000;x++) {
        let result = getNextNumber(hugeNumbers, numberMap, x);
        hugeNumbers[x]  = result[0];
        numberMap = result[1];
    }
    //Part 1
    console.log(hugeNumbers[2019]);
    //Part 2
    console.log(hugeNumbers[30000000 - 1]);
    console.timeEnd("computation");
});