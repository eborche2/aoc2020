console.time("computation");
const fs = require('fs');
function addOrSubtract(current, next, addOrMultiply) {
    if (addOrMultiply) {
        return current + next;
    } else {
        return current * next;
    }
}
function insertParanthesis(row) {
    row = row.split(' ');
    let onOff = false;
    let bracket  = false;
    for (let x=0;x<row.length;x++) {
        console.log(row);
        if (onOff && row[x].indexOf('(') !== -1) {
            bracket = true;
        }
        if (row[x] === '+' && !onOff && row[x -1].indexOf(')') === -1) {
            row[x - 1] = '(' + row[x-1];
            onOff = true;
        }
        if (row[x] === '+' && !onOff && row[x+1].indexOf(')') !== -1 && row[x+1].indexOf('(') !== -1) {
            row[x+1] += ')';
            let check = row[x+1].split(')');
            for (let z=x-1;z>=0;z--) {
                if(row[z].indexOf(')') !== -1) {
                    check += row[z].split(')').length-1
                }
                if (row[z].indexOf('(') !== -1) {
                    check -= row[z].split('(').length-1
                    if (check = 1) {
                        row[z] = '(' + row[z];
                    }
                }
            }
        }
        if (onOff && row[x].indexOf(')') !== -1) {
            row[x] += ')';
            onOff = false;
            bracket = false;
        }
        if (onOff && row[x] === '*') {
            if (!bracket) {
                row[x - 1] += ')';
            } else {
                for (z=x+1;z<row.length;z++) {
                    if (row[z].indexOf(')') !== -1) {
                        row[z] += ')';
                        break;
                    }
                }
            }
            onOff = false;
            bracket = false;
        }
    }
    if (onOff) {
        row[row.length - 1] += ')'
    }
    return row.join(' ')
}
function doMath(outsideParenthesis, current, position, operation) {
    if (position.charAt(0) === '(') {
        current !== -1 ? outsideParenthesis.push([current, operation]) : outsideParenthesis.push([]);
        let start = position.split('(').length-1;
        if (start > 1) {
            for (let x=0;x<start - 1;x++) {
                outsideParenthesis.push([])
            }
        }
        current = parseInt(position.substring(start,));
    } else if (position.charAt(position.length - 1) === ')') {
        let end = position.split(')').length-1;
        current = addOrSubtract(current, parseInt(position.substring(0, position.indexOf(')'))), operation);
        for (let x=0;x<end;x++) {
            let nextOperation = outsideParenthesis.pop();
            if (nextOperation.length > 0) {
                current = addOrSubtract(current, nextOperation[0], nextOperation[1])
            }
        }
    } else {
            current = current !== -1 ? addOrSubtract(current, parseInt(position), operation) : parseInt(position);
    }
    return [outsideParenthesis, current];
}

function processRow(row) {
    let problem = row.split(' ');
    let outsideParenthesis = [];
    let current = -1;
    let operation = false;
    for (let z=0;z<problem.length;z++) {
        if (problem[z] === '+') {
            operation = true;
        } else if (problem[z] === '*') {
            operation = false;
        } else {
            let result = doMath(outsideParenthesis, current, problem[z], operation);
            outsideParenthesis = result[0];
            current = result[1]
        }
    }
    return current;
}
fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let input = data.split(/\r?\n/);
    let sum = 0;
    for (let x=0;x<input.length;x++) {
        sum += processRow(input[x]);
    }
    //Part 1
    console.log(sum);
    for (let x=0;x<1;x++) {
        input[x] = insertParanthesis(input[x]);
    }
    sum = 0;
    for (let x=0;x<1;x++) {
        let test = processRow(input[x]);
        console.log(input[x], test);
        sum += test;
    }
    //Part 1
    console.log(sum);
    console.timeEnd("computation");
});