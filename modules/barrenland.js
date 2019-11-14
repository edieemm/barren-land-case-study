// these can be changed to try the problem in other dimensions
const totalWidth = 400;
const totalHeight = 600;

// these inputs were given in the case study and are available to be tested in the console ...
// by calling processInput(input#) at the bottom of the document
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
                field[x][y].fertile = false; // makes each point within the coordinates marked as unfertile
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
    let field = matrix; // stores matrix in a variable to be manipulated
    // checks points on all 4 sides of field[x][y]
    // if the neighboring point is fertile and unchecked (as indicated by 0), then it reruns the function on that neighbor
    if (field[x + 1] && field[x + 1][y].checked === 0 && field[x + 1][y].fertile) { // right
        field[x + 1][y].checked = count; 
        field = fillInArea1(field, x + 1, y, count)
    }
    if (field[x - 1] && field[x - 1][y].checked === 0 && field[x - 1][y].fertile) { // left
        field[x - 1][y].checked = count;
        field = fillInArea1(field, x - 1, y, count)
    }
    if (field[x][y + 1] && field[x][y + 1].checked === 0 && field[x][y + 1].fertile) { // above
        field[x][y + 1].checked = count;
        field = fillInArea1(field, x, y + 1, count)
    }
    if (field[x][y - 1] && field[x][y - 1].checked === 0 && field[x][y - 1].fertile) { // below
        field[x][y - 1].checked = count;
        field = fillInArea1(field, x, y - 1, count)
    }
    return field;
}

// final attempt using BFS (Breadth First Search)
const fillInArea2 = (matrix, coordX, coordY, count) => {
    let field = matrix;                          // stored params in variables because they will be manipulated
    let x = coordX;
    let y = coordY
    let queue = [];                              // the queue stores the list of points that still need to be checked
    queue.push(field[x][y])                      // the seed point is the first item in the queue
    while (queue.length > 0) {                              // as long as there are points in the queue to be checked...
        fieldxy = queue.pop();                              // remove the last element from the queue and store it in variable fieldxy
        fieldxy.checked = count;                            // mark the point as a part of the current area by assigning it the current area count value
        x = fieldxy.x;                                      // set variables x and y to the coordinates of the current point being checked
        y = fieldxy.y;
        
            // these conditionals check points on all 4 sides of fieldxy
            // if they are fertile and unchecked (as indicated by 0), then it adds them to the queue to be checked later
        if (field[x + 1] && field[x + 1][y].checked === 0 && field[x + 1][y].fertile) { // right
            queue.push(field[x + 1][y])
        }
        if (field[x - 1] && field[x - 1][y].checked === 0 && field[x - 1][y].fertile) { // left
            queue.push(field[x - 1][y])
        }
        if (field[x][y + 1] && field[x][y + 1].checked === 0 && field[x][y + 1].fertile) { // above
            queue.push(field[x][y + 1])
        }
        if (field[x][y - 1] && field[x][y - 1].checked === 0 && field[x][y - 1].fertile) { // below
            queue.push(field[x][y - 1])
        }
    }
    return field; // returns the whole field including the updated "checked" values
}

// function to call to process input to output
// returns an object containing the output array ("output"), and the total area of fertile land in the field ("fertileArea")
const processInput = (array) => {
    let field = mapBarrenLandToField(array);                                        // maps the barren areas onto the 400x600 matrix of the total land
    let uoListOfOutputs = []                                                        // to collect the list of unordered outputs
    let fertileAreaCount = 1;                                                       // used to distinguish between distinct fertile areas
    for (let x = 0; x < field.length; x++) {
        for (let y = 0; y < field[x].length; y++) {                                 // maps through the entire matrix of the field with barren land
            if (field[x][y].fertile === true && field[x][y].checked === 0) {        // once it hits a fertile point (not yet checked as indicated by the {checked: 0})
                field = fillInArea2(field, x, y, fertileAreaCount);                 // it runs the BFS algorithm and returns the field containing the found fertile area which now has "checked" assigned to the area's value
                uoListOfOutputs.push(totalArea(field, 'checked', fertileAreaCount));// totalArea calculates the area where "checked" is equal to the area value. This value gets pushed into the unordered list of outputs
                // console.log(fertileAreaCount)
                fertileAreaCount++;                                                 // finally the fertile area count is incremented so that the next area to be found has a unique area value
            }
        }
    }
    const orderedOutputs = uoListOfOutputs.sort(function (a, b) { return a - b });                         // sorts the unordered list of outputs in ascending order
    console.log('OUTPUT: ', orderedOutputs)                                        // logs output to terminal(node) or console(vanilla js)
    return {                    
        output: orderedOutputs,                                                    // returns a js object with an "output" of all distinct fertile land patches from smallest to largest area (m)
        fertileArea: totalArea(field, 'fertile', true)                             // and a "fertileArea" which calculates the total fertile area of the matrix -- used for testing
    };
}

// --------------TO RUN IN THE TERINAL-------------//

// enter the input as a parameter in the function below
// the input should be formatted as an array of strings where each string has the coordinates
// of the rectangle of barren land as given in the case study problem i.e. ["48 192 351 207", "48 392 351 407"]

// in the terminal, run:
// ~$ npm start
// the output will log in the terminal

processInput(input2)

module.exports = processInput;