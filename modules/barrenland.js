// these can be changed to try the problem in other dimensions
const totalWidth = 400;
const totalHeight = 600;

// these inputs are available to be tested in the console by calling processInput(input#) at the bottom of the document
const input1 = ["0 292 399 307"]
const input2 = ["48 192 351 207", "48 392 351 407", "120 52 135 547", "260 52 275 547"]

// these were used to test out smaller scale models
const input3 = ["0 8 14 13"]
const input4 = ["4 2 6 18", "10 2 12 18", "2 6 13 8", "2 12 13 14"]

// full field coordinates to build initial matrix
const wholeField = [0, 0, totalWidth - 1, totalHeight - 1];

// given coordinates, this function builds a 2D array
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

// builds a matrix of the entire field marking each cell as fertile initially
createTotalFieldMatrix = () => {
    return buildMatrix(wholeField, true);
}

//converts an array of strings (containing spaces) to an array of arrays splitting at each space
const stringsToArrays = (array) => {
    let listOfBarrenCoords = [];
    for (let i = 0; i < array.length; i++) {
        let coords = array[i].split(" "); // turns coords from string into array
        listOfBarrenCoords.push(coords)
    }
    return listOfBarrenCoords;
}

// takes in a set of rectangles of barren land and marks them on the matrix of total land
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

// takes in a matrix of the field a condition and returns the total area (in meters) of land that fits the condition
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


// Initial attempt at using recursion
// maxed out at around 90x90 grid
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

// final attempt to solve problem using BFS (Breadth First Search)
const fillInArea2 = (matrix, coordX, coordY, count) => {
    let field = matrix;
    let x = coordX;
    let y = coordY
    let queue = [];
    queue.push(field[x][y])
    while (queue.length > 0) {
        fieldxy = queue.pop();
        fieldxy.checked = count;
        x = fieldxy.x;
        y = fieldxy.y;

        if (field[x + 1] && field[x + 1][y].checked === 0 && field[x + 1][y].fertile) {
            queue.push(field[x + 1][y])
        }
        // check area to the left
        if (field[x - 1] && field[x - 1][y].checked === 0 && field[x - 1][y].fertile) {
            queue.push(field[x - 1][y])

        }
        // check area above
        if (field[x][y + 1] && field[x][y + 1].checked === 0 && field[x][y + 1].fertile) {
            queue.push(field[x][y + 1])

        }
        // check area below
        if (field[x][y - 1] && field[x][y - 1].checked === 0 && field[x][y - 1].fertile) {
            queue.push(field[x][y - 1])
        }
    }
    return field;
}

// function to call to process input to output
// logs the output in the terminal (node) or browser console (vanilla js)
// returns an object containing the output array ("output"), and the total area of fertile land in the field ("fertileArea")
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
    return {
        output: uoListOfOutputs,
        fertileArea: totalArea(field, 'fertile', true)
    };
}


// --------------TO RUN IN THE TERINAL-------------//
// enter the input as a parameter in the function below
// in the terminal, run:
// ~$ npm start

processInput(input2)

module.exports = processInput;