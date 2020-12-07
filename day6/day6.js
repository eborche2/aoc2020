const fs = require('fs');

fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let input = data.split(/\r?\n\n/);
    let total = 0;
    for (let x=0;x<input.length;x++) {
        let row = input[x];
        row = row.split('\n' ).join('');
        row = new Set(row);
        total += row.size;
    }
    //Part 1
    console.log(total);
    total = 0;
    for (let x=0;x<input.length;x++) {
        let row = input[x];
        row = row.split('\n');
        if (row.length === 1) {
            total += row[0].length;
            continue;
        }
        let people = row.length;
        row = row.join('');
        let counts = {};
        for (let z=0;z<row.length;z++){
            const ch = row.charAt(z);
            const count = counts[ch];
            counts[ch] = count ? count + 1 : 1;
        }
        for (const [key, value] of Object.entries(counts)) {
            if (value === people) {
                total++;
            }
        }
    }
    console.log(total);
});