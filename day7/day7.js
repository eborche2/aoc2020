const fs = require('fs');
function findColors(tier, gold_colors, color_Map) {
    let nextTier = [];
    for (let x=0;x<tier.length;x++) {
        let color = tier[x];
        for (const [key, value] of Object.entries(color_Map)) {
            for (let z=0;z<value.length;z++) {
                let color_check = Object.keys(value[z])[0];
                if (color === color_check) {
                    if (gold_colors.indexOf(key) === -1) {
                        gold_colors.push(key);
                        nextTier.push(key);
                    }
                }
            }
        }
    }
    return nextTier;
}
function countTier(tier, count, color_map) {
    let nextTier = [];
    for (let x=0;x<tier.length;x++) {
        let color = Object.keys(tier[x])[0];
        for (const [key, value] of Object.entries(color_map)) {
            if (key === color) {
                for (let z=0;z<value.length;z++) {
                    let color_check = Object.keys(value[z])[0];
                    if (color_check === 'other bags.') {
                        break;
                    }
                    let too_add = tier[x][color] * value[z][color_check];
                    console.log(tier[x][color]);
                    console.log(value[z][color_check]);
                    console.log(too_add);
                    count += too_add;
                    console.log(count);
                    nextTier.push({[color_check]: too_add});
                }
            }
        }
    }
    return [nextTier, count];
}
fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let input = data.split(/\r?\n/);
    let color_map = {};
    let gold_colors = [];
    let tier = [];
    for (let x=0;x<input.length;x++) {
        let rule = input[x];
        rule = rule.split('contain');
        let packed = rule.splice(1, rule.length);
        rule = rule[0].split(' ');
        let main_bag = rule.splice(0, 2).join(' ');
        packed = packed[0].split(',');
        let bag_array = [];
        for (let z=0;z<packed.length;z++) {
            let bags = packed[z].split(' ');
            let bag = bags.slice(2,4).join(' ');
            if (bag === 'shiny gold') {
                tier.push(main_bag);
                gold_colors.push(main_bag);
            }
            bag_array.push({[bag]: parseInt(bags[1])});
        }
        color_map[main_bag] = bag_array;
    }
    while (tier.length > 0) {
        tier = findColors(tier, gold_colors, color_map);
    }
    // part I
    console.log(gold_colors.length);
    tier = [{'shiny gold': 1}];
    let count = 0;
    while (tier.length > 0) {
        let result = countTier(tier, count, color_map);
        tier = result[0];
        count = result[1];
        console.log(tier, count);
    }
    // part II
    console.log(count);
});