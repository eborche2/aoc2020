const fs = require('fs');
let paths = {
    E: [1, 0],
    N: [0, 1],
    W: [-1, 0],
    S: [0, -1],
};
function translateRotation(rotation) {
    let simple = rotation / 360;
    let partial = simple % 1;
    if (partial === 0) {
        return 'E';
    } else if (partial === .25 || partial === -.75) {
        return 'N';
    } else if (partial === .5 || partial === -.5) {
        return 'W';
    } else {
        return 'S';
    }
}
function moveADirection(current, direction) {
    if (direction[0] === 'L') {
        current[2] += direction[1];
    } else if (direction[0] === 'R') {
        current[2] -= direction[1];
    } else if (direction[0] === 'F') {
        current[0] += paths[translateRotation(current[2])][0] * direction[1];
        current[1] += paths[translateRotation(current[2])][1] * direction[1];
    } else {
        current[0] += paths[direction[0]][0] * direction[1];
        current[1] += paths[direction[0]][1] * direction[1];
    }
    return current;
}
function translate(waypoint) {
    return [waypoint[1] / -1, waypoint[0]];
}
function rotateWayPoint(waypoint, direction) {
    if (direction[0] === 'R') {
        direction[1] = 360 - direction[1];
    }
    let times = direction[1] / 90;
    for (let x=0;x<times;x++) {
        waypoint = translate(waypoint);
    }
    return waypoint;
}
function actualInstructions(shipAndWay, direction) {
    if (direction[0] === 'L' || direction[0] === 'R') {
        let rotatedPoint = rotateWayPoint([shipAndWay[2], shipAndWay[3]], direction);
        shipAndWay[2] = rotatedPoint[0];
        shipAndWay[3] = rotatedPoint[1];
    } else if (direction[0] === 'F') {
        shipAndWay[0] += shipAndWay[2] * direction[1];
        shipAndWay[1] += shipAndWay[3] * direction[1];
    } else {
        let newWayPoint = moveADirection([shipAndWay[2], shipAndWay[3]], direction);
        shipAndWay[2] = newWayPoint[0];
        shipAndWay[3] = newWayPoint[1];
    }
    return shipAndWay;
}
fs.readFile('file.in', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let input = data.split(/\r?\n/);
    let directions = input.map(direction=> {
        let instruction = [];
        instruction.push(direction.substring(0, 1));
        instruction.push(parseInt(direction.substring(1, direction.length)));
        return instruction;
    });
    let current = [0, 0, 0];
    for (let x=0;x<directions.length;x++) {
        current = moveADirection(current, directions[x]);
    }
    //part 1
    console.log(Math.abs(current[0]) + Math.abs(current[1]));
    let shipAndWay = [0, 0, 10, 1];
    for (let x=0;x<directions.length;x++) {
        shipAndWay = actualInstructions(shipAndWay, directions[x]);
    }
    //part 2
    console.log(Math.abs(shipAndWay[0]) + Math.abs(shipAndWay[1]));
});