const os = require('os');
const fs = require('fs');
const { parse } = require('path');

const file = '5_input.txt';

// Takes input from file, splits
const inputArr = fs.readFileSync(file, 'utf-8').split(os.EOL);

const findSeatID = (row, column) => (
    (row * 8) + column
);

const findMissingIDs = (ids) => {
    const missingIDs = [];
    ids.forEach((id, index) => {
        if (ids[index + 1] != id - 1) {
            missingIDs.push(id - 1);
        };
    });
    return missingIDs;
};

const boardingIDs = [];
inputArr.forEach((boardingPass) => {
    let rowBinary = '';
    let columnBinary = '';
    for (const c in boardingPass) {
        switch (boardingPass[c]) {
            case 'F':
                rowBinary = rowBinary.concat('0');
                break;

            case 'B':
                rowBinary = rowBinary.concat('1');
                break;

            case 'R':
                columnBinary = columnBinary.concat('1');
                break;

            case 'L':
                columnBinary = columnBinary.concat('0');
                break;

        };
    };
    const rowNumber = parseInt(rowBinary, 2);
    const columnNumber = parseInt(columnBinary, 2);
    boardingIDs.push(findSeatID(rowNumber, columnNumber));
});

// Answer to part 1
boardingIDs.sort((a,b) => (b-a));
console.log(boardingIDs[0]);

// Answer to part 2
console.log(findMissingIDs(boardingIDs));
