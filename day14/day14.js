const fs = require('fs');
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
function getPossibilities(n){
  const states = [];
  const maxDecimal = parseInt("1".repeat(n),2);
  for(let i = 0; i <= maxDecimal; i++){
    states.push(i.toString(2).padStart(n,'0'));
  }
  return states;
}
function dec2bin(dec){
    return (dec).toString(2);
}
function writeInstruction (instruction, memory, mask) {
    let ending = instruction[0].indexOf(']');
    let memoryAddress = instruction[0].substring(4, ending);
    let binary = dec2bin(parseInt(instruction[2]));
    let length = binary.length;
    let tooAdd = 36 - length;
    for (let x=0;x<tooAdd;x++) {
        binary = '0' + binary;
    }
    let newValue = mask;
    for (let x=0;x<newValue.length;x++) {
        if (newValue.charAt(x) === 'X') {
            newValue = newValue.replaceAt(x, binary.charAt(x));
        }
    }
    memory[memoryAddress] = newValue;
    return memory;
}
function writeInstructionV2 (instruction, memory, mask) {
    let ending = instruction[0].indexOf(']');
    let memoryAddress = instruction[0].substring(4, ending);
    let binary = dec2bin(parseInt(memoryAddress));
    let length = binary.length;
    let tooAdd = 36 - length;
    for (let x=0;x<tooAdd;x++) {
        binary = '0' + binary;
    }
    let positions = [];
    for (let x=0;x<mask.length;x++) {
        if (mask.charAt(x) === '1') {
            binary = binary.replaceAt(x, '1');
        } else if (mask.charAt(x) === 'X') {
            positions.push(x);
        }
    }
    let permutations = getPossibilities(positions.length);
    for (let x=0;x<permutations.length;x++) {
        let newValue = binary;
        for (let z=0;z<positions.length;z++) {
            newValue = newValue.replaceAt(positions[z], permutations[x].charAt(z));
        }
        let address = parseInt(newValue, '2');
        memory[address.toString()] = parseInt(instruction[2]);
    }
    return memory;
}
fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let input = data.split(/\r?\n/);
    let memory = {};
    let mask = 0;
    for (let x=0;x<input.length;x++) {
        let row = input[x].split(' ');
        if (row[0] === "mask") {
            mask = row[2];
        } else {
            memory = writeInstruction(row, memory, mask);
        }
    }
    let sum = 0;
    for (const [key, value] of Object.entries(memory)) {
        sum += parseInt(value, 2);
    }
    //Part 1
    console.log(sum);
    memory = {};
    mask = 0;
    for (let x=0;x<input.length;x++) {
        let row = input[x].split(' ');
        if (row[0] === "mask") {
            mask = row[2];
        } else {
            memory = writeInstructionV2(row, memory, mask);
        }
    }
    sum = 0;
    for (const [key, value] of Object.entries(memory)) {
        sum += value;
    }
    //Part 2
    console.log(sum);
});