console.time("computation");
const fs = require('fs');
function getDirections(bigger) {
    let array = [-1, -1, -1, 1, 1, 1, 0, 0];
    let results = [];
    let usedChars = [];
    let l = 3;
    if (bigger) {
        l = 4;
        array.push(1);
        array.push(-1);
        array.push(0);
    }
    function permute(input, k) {
        let i, ch;
        for (i = 0; i < input.length; i++) {
          ch = input.splice(i, 1)[0];
          usedChars.push(ch);
          if (input.length ===0) {
            var toadd = usedChars.slice(0,k).join(',');
            if(!results.includes(toadd)) {
                results.push(toadd); // resizing the returned array to size k
            }
          }
          permute(input, k);
          input.splice(i, 0, ch);
          usedChars.pop();
        }
        return results;
    }
    return new permute(array, l);
}
function computeDirection(dimension, direction) {
    let newDirection = dimension.slice(0, dimension.length);
    for (let x=0;x<dimension.length;x++) {
        newDirection[x] = dimension[x] + direction[x];
    }
    return newDirection.map(value=>value.toString()).join(',')
}
function enlargeMap(dimensions, directions) {
    let newDimensions = new Map();
    for (const [key, value] of Object.entries(dimensions)) {
        newDimensions[key] = value;
        let dimension = key.split(',').map(value=>parseInt(value));
        for (let x=0;x<directions.length;x++) {
          let direction = computeDirection(dimension, directions[x].split(',').map(value=>parseInt(value)));
          if (!(direction in dimensions)) {
              newDimensions[direction] = false;
          }
      }
    }
    return newDimensions;
}
function processRound(dimensions, directions) {
    let newDimensions = new Map();
    let onCount = 0;
    dimensions = enlargeMap(dimensions, directions);
    for (const [key, value] of Object.entries(dimensions)) {
      let count = 0;
      let dimension = key.split(',').map(value=>parseInt(value));
      for (let x=0;x<directions.length;x++) {
          let direction = computeDirection(dimension, directions[x].split(',').map(value=>parseInt(value)))
          if (direction in dimensions) {
              count += dimensions[direction] ? 1 : 0;
          } else {
              newDimensions[direction] = false;
          }
      }
      let onOff = true;
      if (value) {
          if (count < 2 || count > 3) {
              onOff = false;
          }
      } else {
          onOff = count !== 3 ? false : true;
      }
      onCount += onOff ? 1 : 0;
      newDimensions[key] = onOff;
    }
    return [newDimensions, onCount];
}
function expandDimensions(dimensions) {
    let biggerDimensions = new Map();
    for (const [key, value] of Object.entries(dimensions)) {
        biggerDimensions[key + ',0'] = value
    }
    return biggerDimensions;
}
fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let input = data.split(/\r?\n/);
    let dimensions = new Map();
    for (let y=0;y<input.length;y++) {
        let row = input[y].split('');
        for (let x=0;x<row.length;x++) {
            dimensions[x + ',' + y + ',0'] = row[x] === '.' ? false : true;
        }
    }
    let biggerDimensions = expandDimensions(dimensions);
    let directions = getDirections(false);
    let count = 0;
    for (let x=0;x<6;x++) {
        let result = processRound(dimensions, directions);
        dimensions = result[0];
        count = result[1];
    }
    //part1
    console.log(count);
    count = 0;
    directions = getDirections(true);
    for (let x=0;x<6;x++) {
        let result = processRound(biggerDimensions, directions);
        biggerDimensions = result[0];
        count = result[1];
    }
    //Part2 Not fast but effective
    console.log(count);
    console.timeEnd("computation");

});