const fs = require('fs');

fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let passwords = data.split(/\r?\n/);
    let good = 0;
    let good2 = 0;
    for (let x=0;x<passwords.length;x++) {
        let line = passwords[x].split(/\r?:/);
        let rule = line[0];
        let pass = line[1];
        var n = rule.indexOf("-");
        let lower = parseInt(rule.substring(0,n)) ;
        let upper = parseInt(rule.substring(n+1, n+3));
        let letter = rule.substring(rule.length-1, rule.length);
        let occurrence = pass.split(letter).length - 1;
        if (occurrence <= upper && occurrence >= lower) {
            good++;
        }
        // There is a space in front of password.
        if ((pass.charAt(lower) !== letter && pass.charAt(upper) === letter) || (pass.charAt(lower) === letter && pass.charAt(upper) !== letter)) {
            good2++;
        }

    }
    // Part 1
    console.log(good);
    //Part 2
    console.log(good2);
});