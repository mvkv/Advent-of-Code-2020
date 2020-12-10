const os = require('os');
const fs = require('fs');

const file = '3_input.txt';

// Takes input from file, splits
const inputArr = fs.readFileSync(file, 'utf-8').split(os.EOL);

const multiplyArray = (arr) => {
    let output = 1;
    for (let i = 0; i<arr.length; i++) {
        output = output * arr[i]
    }
    return output
} 

const calcPattern = (inputGrid, right, down) => {
    let horizPointer = 0
    let gridMaxIndex = inputGrid[0].length - 1;
    let trees = 0

    const incrementPointerHoriz = (pointerValue, gridMaxIndex, right) => {
        if (pointerValue < gridMaxIndex - right + 1) {
            return pointerValue + right
        } else {
            return pointerValue + right - 1 - gridMaxIndex
        }
    }

    for (var i = 0; i < inputGrid.length; i = i + down) {
        const row = inputGrid[i].split("")
        if (row[horizPointer] === '#') {
            trees++;
        }
        horizPointer = incrementPointerHoriz(horizPointer, gridMaxIndex, right)
    }

    console.log("Trees: ", trees);
    return trees
}

const output = [calcPattern(inputArr, 3, 1), calcPattern(inputArr, 1, 1), calcPattern(inputArr, 5, 1), calcPattern(inputArr, 7, 1), calcPattern(inputArr, 1, 2)]

console.log(multiplyArray(output));