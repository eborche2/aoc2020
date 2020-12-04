const fs = require('fs');

fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let input = data.split(/\r?\n\n/);
    const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
    let valid = 0;
    for (let x=0; x < input.length; x++) {
        let passport = input[x];
        passport = passport.split(/(?: |:|\n)+/);
        let check = requiredFields.filter(field => passport.includes(field));
        if (check.length === 7) {
            valid++;
        }
    }
    //part 1
    console.log(valid);
    valid = 0
    for (let x=0; x < input.length; x++) {
        let passport = input[x];
        passport = passport.split(/(?: |:|\n)+/);
        let check = requiredFields.filter(field => {
            let loc = passport.indexOf(field);
            if (loc === -1) {
                return false;
            }
            let value = passport[loc+1];
            if (['byr', 'iyr', 'eyr'].includes(field)) {
                value = parseInt(value);
            }
            if (field === 'byr') {
                if (value < 1920 || value > 2002) {
                    return false;
                }
            }
            if (field === 'iyr') {
                if (value < 2010 || value > 2020) {
                    return false;
                }
            }
            if (field === 'eyr') {
                if (value < 2020 || value > 2030) {
                    return false;
                }
            }
            if (field === 'hgt') {
                let height = [];
                height.push(value.substring(0, value.length-2));
                height.push(value.substring(value.length-2, value.length));
                if (height[1] !== 'in' && height[1] !== 'cm') {
                    return false;
                }
                if ((height[1] === 'in' && (height[0] < 59 || height[0] > 76)) || (height[1] === 'cm' && (height[0] < 150 || height[0] > 193))) {
                    return false;
                }
            }
            if (field === 'hcl') {
                if (value.charAt(0) !== '#' || value.length !== 7) {
                    return false;
                }
                for (let x=1;x<7;x++) {
                    if (!value.charAt(x).match(/[0-9a-f]/)) {
                        return false;
                    }
                }
            }
            if (field === 'ecl') {
                const colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
                if (!colors.includes(value)) {
                    return false;
                }
            }
            if (field === 'pid') {
                if (value.length !== 9) {
                    return false;
                }
            }
            return true;
        });

        if (check.length === 7) {
            valid++;
        }
    }
    console.log(valid);
});