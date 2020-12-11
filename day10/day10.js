const fs = require('fs');
function countDifferences(joltages) {
    let one = 0;
    let three = 1;
    let before = 0;
    let runs = [];
    let run = 0;
    for (let x=0;x<joltages.length;x++) {
        if (joltages[x] - before === 1) {
            one++;
            run++;
        } else if (joltages[x] - before === 3) {
            three++;
            runs.push(run);
            run = 0;
        }
        before = joltages[x];
    }
    runs.push(run);
    return [one, three, runs];
}
function figureMultiples(runs) {
    let factors = [1, 1, 1, 2, 4, 7, 13]; //The ones are just buffers because I'm lazy.
    let multiple = factors[runs[0]];
    for (let x=1;x<runs.length;x++) {
        multiple *= factors[runs[x]];
    }
    //Part 2
    console.log(multiple);
}
fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let input = data.split(/\r?\n/);
    input = input.map(value => parseInt(value)).sort(function(a, b){return a-b});
    let results = countDifferences(input);
    //part1
    console.log(results[0] * results[1]);
    let runs = results[2].filter(run => run !== 0 && run !== 1).map(run => run +1);
    figureMultiples(runs);
});