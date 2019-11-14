// this file tests the input/output provided in the case study example

const processInput = require('../modules/barrenland');

// inputs to test
const input1 = ["0 292 399 307"]
const input2 = ["48 192 351 207", "48 392 351 407", "120 52 135 547", "260 52 275 547"]

// outputs to test
let process1 = processInput(input1).output;
let process2 = processInput(input2).output;

// accessing the index of each output array to test the numbers one at a time
let test1 = process1[0];
let test2 = process1[1];
let test3 = process2[0];
let test4 = process2[1];

// to run tests, use terminal to type:
// ~$ npm run test

test('Input 1 first output', () => {
    expect(test1).toBe(116800)
})
test('Input 1 second output', () => {
    expect(test2).toBe(116800)
})
test('Input 2 first output', () => {
    expect(test3).toBe(22816)
})
test('Input 2 second output', () => {
    expect(test4).toBe(192608)
})