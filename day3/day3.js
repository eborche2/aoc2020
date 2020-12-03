const fs = require('fs');

fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let input = data.split(/\r?\n/);
    let trees = 0;
    let x = 0;
    let y = 0;
    while(y < input.length) {
        let currentx = x;
        if (x >= input[0].length) {
            currentx = x % input[0].length;
        }
        if (input[y].charAt(currentx) === '#') {
            trees++;
        }
        x += 3;
        y++;
    }
    //First Part
    console.log(trees);
    const slopex = [1,5,7,1];
    const slopey = [1,1,1,2];
    let trees_arr = [0,0,0,0]
    for (let z=0; z < slopex.length; z++) {
        let x = 0;
        let y = 0;
        while(y < input.length) {
            let currentx = x;
            if (x >= input[0].length) {
                currentx = x % input[0].length;
            }
            if (input[y].charAt(currentx) === '#') {
                trees_arr[z]++;
            }
            x += slopex[z];
            y += slopey[z];
        }
        trees *= trees_arr[z];
    }
    //Part 2
    console.log(trees);
});