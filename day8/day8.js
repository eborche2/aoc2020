const fs = require('fs');
function check(commands, x, comm, visited) {
    let testVisited = [...visited];
    let z = x;
    testVisited.push(z);
    if (comm === 'nop') {
        z++;
    } else {
        z += commands[z]['nop'];
    }
    while (testVisited.indexOf(z) === -1 ) {
        let row = commands[z];
        let command = Object.keys(row)[0];
        testVisited.push(z);
        if (command === 'nop') {
            z++;
        } else if (command === 'acc') {
            z++;
        } else {
            z += row[command];
        }
        if (z >= commands.length) {
            return true;
        }
    }
    return false;
}
function figureAccumulation(commands) {
    let visited = [];
    let x = 0;
    let accumulator = 0;
    while (visited.indexOf(x) === -1 && x < commands.length) {
        let row = commands[x];
        let command = Object.keys(row)[0];
        visited.push(x);
        if (command === 'nop') {
            x++;
        } else if (command === 'acc') {
            accumulator += row[command];
            x++;
        } else {
            x += row[command];
        }
    }
    return [accumulator, visited];
}
fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let input = data.split(/\r?\n/);
    let commands = [];
    for (let x=0;x<input.length;x++){
        let command = input[x].split(' ');
        commands.push({[command[0]]: parseInt(command[1])});
    }
    //Part1
    let result = figureAccumulation(commands);
    console.log(result[0]);
    let visited = result[1];
    let reverseVisited = visited.slice().reverse();
    for (let z=0;z<reverseVisited.length;z++) {
        let last = reverseVisited[z];
        let row = commands[last];
        let command = Object.keys(row)[0];
        if (command === 'nop') {
            command = 'jmp';
        } else if (command === 'jmp') {
            command = 'nop';
        } else {
            continue;
        }
        let result = check(commands, last, command, visited);
        if (!result) {
            visited.pop();
        } else {
            commands[last] = {
                [command] : commands[last][Object.keys(commands[last])[0]]
            };
            break;
        }
    }
    //Part2
    console.log(figureAccumulation(commands)[0]);
});