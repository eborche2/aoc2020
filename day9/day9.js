const fs = require('fs');

function checkNumber(number, numberList) {
    for (let x=0;x<numberList.length;x++) {
        if (numberList.indexOf(number - numberList[x]) !== -1) {
            return true;
        }
    }
    return false;
}
function findRange(endNumber, number, numberList) {
    let start = endNumber -1;
    let end = endNumber;
    let largeNumber = numberList[start];
    let found = false;
    while(!found) {
        if (largeNumber === number) {
            let largeSmall = findLargestAndSmallest(start, end, numberList);
            found = true;
            //part II
            console.log(largeSmall[0] + largeSmall[1]);
        } else if (start === 0) {
            end--;
            start = end - 1;
            largeNumber = numberList[start] + numberList[end];
        } else {
            start--;
            largeNumber += numberList[start];
        }
    }
}
function findLargestAndSmallest(start, end, numberList) {
    let small = numberList[start];
    let large = numberList[end];
    for (let x=start + 1;x<end;x++) {
        if (numberList[x] < small) {
            small = numberList[x];
        } else if (numberList[x] > large) {
            large = numberList[x];
        }
    }
    return [small, large];
}
fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let input = data.split(/\r?\n/);
    let numberList = [];
    for (let x=0;x<input.length;x++) {
        numberList.push(parseInt(input[x]));
    }
    let start = 25;
    let found = true;
    let badNumber = 0;
    while(found) {
        found = checkNumber(numberList[start], numberList.slice(start-25, start));
        if (!found) {
            badNumber = numberList[start];
            //Part 1
            console.log(badNumber);
        } else {
            start++;
        }
    }
    findRange(start -1 , badNumber, numberList);

});