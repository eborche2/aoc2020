const fs = require('fs');

fs.readFile('file.in', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let numbers = data.split(/\r?\n/);
  let ascending = numbers.sort(function(a, b){return a-b});
  let descending = numbers.sort(function(a, b){return b-a});
  //Part 1
  for (let x=0; x<descending.length; x++) {
      for (let z=0; z<ascending.length; z++) {
          if (parseInt(ascending[z]) + parseInt(descending[x]) === 2020) {
              console.log(parseInt(ascending[z]) * parseInt(descending[x]));
              break;
          }
          if (parseInt(ascending[z]) + parseInt(descending[x]) > 2020) {
              continue;
          }
      }
  }
  //Part2
  for (let x=0; x<descending.length; x++) {
      for (let z=0; z<ascending.length; z++) {
          for (let g = z + 1; g<ascending.length; g++) {
              if (parseInt(ascending[z]) + parseInt(descending[x]) + parseInt(ascending[g])=== 2020) {
              console.log(parseInt(ascending[z]) * parseInt(descending[x]) * parseInt(ascending[g]));
              break;
          }
          if (parseInt(ascending[z]) + parseInt(descending[x]) + parseInt(ascending[g]) > 2020) {
              continue;
          }
          }
      }
  }
});