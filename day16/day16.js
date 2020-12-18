console.time("computation");
const fs = require('fs');
function calculateInvalid(tickets, rulesMap) {
    let total= [[], 0];
    total = tickets.reduce((acc, ticket) => {
        let addTicket = true;
        for (let z=0;z<ticket.length;z++) {
            let check = ticket[z];
            let found = false;
            for (const [key, value] of Object.entries(rulesMap)) {
                if ((check >= value[0] && check <= value[1]) || (check >= value[2] && check <= value[3])) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                acc[1] += check;
                addTicket = false;
            }
        }
        if (addTicket) {
            acc[0].push(ticket);
        }
        return acc;
    }, total);
    console.log(total[1]);
    return total[0];
}
function findSix(validTickets, rulesMap, ruleArray, myTicket) {
    let whatValid = [];
    whatValid = validTickets.reduce((acc, ticket) => {
        let validTicket = new Array(myTicket.length);
        for (let z=0;z<ticket.length;z++) {
           let x=0;
           let valid =[];
           let check = ticket[z];
           for (const [key, value] of Object.entries(rulesMap)) {
               if ((check >= value[0] && check <= value[1]) || (check >= value[2] && check <= value[3])) {
                   valid.push(x);
               }
               x++;
            }
           validTicket[z] = valid;
        }
        acc.push(validTicket);
       return acc;
    }, whatValid);
    let temp = ruleArray[0];
    for (let x=0;x<whatValid.length;x++) {
        for (let z=0;z<myTicket.length;z++) {
            if (whatValid[x][z].length < myTicket.length) {
                let row = whatValid[x][z];
                for (let j=0;j<temp.length;j++) {
                    if (row.indexOf(temp[j]) === -1) {
                        if (ruleArray[temp[j]].indexOf(z) !== -1) {
                            let toRemove = ruleArray[temp[j]].indexOf(z);
                            ruleArray[j] = ruleArray[temp[j]].slice(0, toRemove).concat(ruleArray[temp[j]].slice(toRemove + 1, ruleArray[temp[j]].length));
                        }

                    }
                }
            }
        }
    }
    let reduce = true;
    while (reduce) {
        let zeros = [];
        for (let x=0;x<ruleArray.length;x++) {
            if (ruleArray[x].length === 1) {
                zeros.push(ruleArray[x][0]);
            }
        }
        if (zeros.length === myTicket.length) {
            reduce = false;
        }
        for (let x=0;x<ruleArray.length;x++) {
            if (ruleArray[x].length > 1) {
                let removed = ruleArray[x].reduce((acc, rule) =>
                {
                    if (zeros.indexOf(rule) === -1) {
                        acc.push(rule);
                    }
                    return acc;
                }, []);
                ruleArray[x] = removed;
            }
        }
    }
    let six = 1;
    for (let z=0;z<6;z++) {
        six *= myTicket[ruleArray[z][0]];
    }
    //Part 2 Argh, not proud.
    console.log(six);
}
fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let input = data.split(/\r?\n\n/);
    let rulesMap = {};
    let rules = input[0].split('\n');
    let ruleArray = [];
    for (let z=0;z<rules.length;z++) {
        let ruleRow = rules[z].split(':');
        let ranges = ruleRow[1].split( 'or');
        let numbers = ranges[0].split('-').concat(ranges[1].split('-'));
        numbers = numbers.map(number=>parseInt(number));
        let array = new Array(rules.length);
        for (let x=0;x<array.length;x++) {
            array[x] = x;
        }
        rulesMap[ruleRow[0]] = numbers;
        ruleArray.push(array);
    }
    let myTicket = input[1].split('\n')[1].split(',').map(number=>parseInt(number));
    let tickets = input[2].split('\n').slice(1,).map(row=>row.split(',').map(number=>parseInt(number)));
    let validTickets = calculateInvalid(tickets, rulesMap);
    findSix(validTickets, rulesMap, ruleArray, myTicket);
});