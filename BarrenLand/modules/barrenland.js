const totalWidth = 90;
const totalHeight = 90;
const wholeField = [0, 0, totalWidth - 1, totalHeight - 1];
const input1 = ["0 8 14 13"]
const input2 = ["4 2 6 18", "10 2 12 18", "2 6 13 8", "2 12 13 14"]

const area = ([a, b, c, d]) => {
    return (d - b + 1) * (c - a + 1)
}
const sum = (array) => {
    let sum = 0
    array.forEach(number => {
        sum += number;
    })
    return sum
}

// given 2 coordinates, this function builds a 2D array
buildMatrix = ([x1, y1, x2, y2], bool) => {
    let matrix = []
    for (let x = x1; x < x2 + 1; x++) {
        let column = []
        for (let y = y1; y < y2 + 1; y++) {
            column.push({
                x: x,
                y: y,
                fertile: bool,
                checked: 0
            })
        }
        matrix.push(column)
    }
    return matrix;
}

// builds a matrix of the entire field marking each cell as fertile 
createTotalFieldMatrix = () => {
    return buildMatrix(wholeField, true);
}

//converts an array of strings with spaces into it
//to an array of arrays (splitting at each space)
const stringsToArrays = (array) => {
    let listOfBarrenCoords = [];
    for (let i = 0; i < array.length; i++) {
        let coords = array[i].split(" "); // turns coords from string into array
        listOfBarrenCoords.push(coords)
    }
    return listOfBarrenCoords;
}

// takes in a set of rectangles of barren land and maps them to total land
// returns a matrix of the field that includes fertile and barren land
const mapBarrenLandToField = (array) => {
    let arrayOfCoords = stringsToArrays(array);// converts string coords to array of coords separating at each space: ' '
    let field = createTotalFieldMatrix(); //matrix where the entire field is fertile 
    arrayOfCoords.forEach(coords => {
        for (let x = Number(coords[0]); x < Number(coords[2]) + 1; x++) {
            for (let y = Number(coords[1]); y < Number(coords[3]) + 1; y++) {
                field[x][y].fertile = false; // makes each coordinate within the 
            }
        }
        // console.log(coords)
    })

    return field;
}

// takes in a matrix of the land including barren and fertile areas
// returns the total barren land
const totalArea = (field, attribute, condition) => {
    let area = 0;
    field.forEach(column => {
        column.forEach(row => {
            if (row[attribute] === condition) {
                area++;
            }
        })
    })
    return area;
}

const fillInArea1 = (matrix, x, y, count) => {
    let field = matrix;
    // check area to the right
    if (field[x + 1] && field[x + 1][y].checked === 0 && field[x + 1][y].fertile) {
        // console.log(field[x + 1][y])
        field[x + 1][y].checked = count;
        field = fillInArea1(field, x + 1, y, count)
    }
    // check area to the left
    if (field[x - 1] && field[x - 1][y].checked === 0 && field[x - 1][y].fertile) {
        // console.log(field[x - 1][y])
        field[x - 1][y].checked = count;
        field = fillInArea1(field, x - 1, y, count)
    }
    // check area above
    if (field[x][y + 1] && field[x][y + 1].checked === 0 && field[x][y + 1].fertile) {
        // console.log(field[x][y + 1])
        field[x][y + 1].checked = count;
        field = fillInArea1(field, x, y + 1, count)
    }
    // check area below
    if (field[x][y - 1] && field[x][y - 1].checked === 0 && field[x][y - 1].fertile) {
        // console.log(field[x][y - 1])
        field[x][y - 1].checked = count;
        field = fillInArea1(field, x, y - 1, count)
    }
    return field;
}

const fillInArea2 = (matrix, x, y, count) => {
    let field = matrix;
    // check area to the right
    if (field[x + 1] && field[x + 1][y].checked === 0 && field[x + 1][y].fertile) {
        // console.log(field[x + 1][y])
        field[x + 1][y].checked = count;
        fillInArea2(field, x + 1, y, count)
    }
    // check area to the left
    if (field[x - 1] && field[x - 1][y].checked === 0 && field[x - 1][y].fertile) {
        // console.log(field[x - 1][y])
        field[x - 1][y].checked = count;
        fillInArea2(field, x - 1, y, count)
    }
    // check area above
    if (field[x][y + 1] && field[x][y + 1].checked === 0 && field[x][y + 1].fertile) {
        // console.log(field[x][y + 1])
        field[x][y + 1].checked = count;
        fillInArea2(field, x, y + 1, count)
    }
    // check area below
    if (field[x][y - 1] && field[x][y - 1].checked === 0 && field[x][y - 1].fertile) {
        // console.log(field[x][y - 1])
        field[x][y - 1].checked = count;
        fillInArea2(field, x, y - 1, count)
    }
    return field;
}
const processInput = (array) => {
    let field = mapBarrenLandToField(array);
    let uoListOfOutputs = []
    let fertileAreaCount = 1;
    for (let x = 0; x < field.length; x++) {
        for (let y = 0; y < field[x].length; y++) {
            if (field[x][y].fertile === true && field[x][y].checked === 0) {
                field = fillInArea2(field, x, y, fertileAreaCount);
                uoListOfOutputs.push(totalArea(field, 'checked', fertileAreaCount));
                // console.log(fertileAreaCount)
                fertileAreaCount++;
            }
        }
    }
    uoListOfOutputs.sort(function (a, b) { return a - b }); // sorts in ascending order
    console.log(uoListOfOutputs)
    return uoListOfOutputs;

    // console.log(totalArea(field, 'fertile', true), totalArea(field, 'fertile', false), totalArea(field, 'checked', 0), area(wholeField) - totalArea(field, 'checked', 0))
    // console.log(sum(uoListOfOutputs), totalArea(field, 'fertile', true))

}


processInput(input2) 

module.exports = processInput;