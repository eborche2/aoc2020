console.time("computation");
const fs = require('fs');
function processPart(part, routes, rules) {


    if (part.indexOf('|') !== -1) {
        let parts = part.split('|');
        if (!(parts[1] in routes)) {
            routes.push([parts[1], false]);
        } else {
            if (routes[parts[1][1]]) {
                part = parts[1]
            } else {
                part = parts[0]
            }
        }
    }
    if (part.indexOf('"a"') !== -1 || part.indexOf('"b"') !== -1) {
        return part;
    }
    console.log(part, "part");
    let row = part.split(' ');
    console.log(row);
    part= row.reduce((acc, number) => {
        if (number === '|') {
            acc.push('|');
        } else {
            acc.push(rules[parseInt(number)]);
        }
        return acc;
    }, []);
    console.log(part);
    if (part.length > 1) {
        return part.join('-');
    }
    return part[0]

}
fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let input = data.split(/\r?\n\n/);
    let beginning = input[0].split(/\r?\n/);
    let end = input[1].split(/\r?\n/);
    let rules = new Array(beginning.length);
    for (let x=0;x<beginning.length;x++) {
        let row = beginning[x].split(':');
        rules[parseInt(row[0])] = row[1].substring(1,)
    }
    let start = rules[0];
    let more = true;
    let routes = [];
    let route = '';
    let count = 0;
    while(more) {
        console.log(start, "before");
        start = start.split('-').map(part=>processPart(part, routes, rules));
        console.log(start);
        let check = start.filter(x=> x.indexOf('a') === -1 && x.indexOf('b') === -1);
        if (check.length === 0) {
            more = true;
        }
        if (start.length > 1) {
            start = start.join('-');
        } else {
            start = start[0];
        }
        console.log(start, "After join")
        count++;
        if (count === 4) {
            more = false;
        }

    }

});
