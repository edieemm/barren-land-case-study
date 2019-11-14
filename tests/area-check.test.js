// this file tests the output to make sure it adds up to the total fertile land

const processInput = require('../modules/barrenland');

//inputs to test
const input1 = ["0 292 399 307"];
const input2 = ["48 192 351 207", "48 392 351 407", "120 52 135 547", "260 52 275 547"];
const input3 = ["23 300 289 350", "48 392 351 407", "120 52 135 547"];
const input4 = [];
const input5 = ["48 192 351 207", "48 392 351 407", "23 300 289 350", "100 50 200 500", "260 52 275 547"];
const input6 = ["0 100 300 200", "23 300 289 350", "0 292 399 307", "100 50 200 500", "48 192 351 207", "48 392 351 407", "120 52 135 547", "260 52 275 547"];

// outputs to test
// returns an object that contains the output array
// and the total fertile land
const test1 = processInput(input1);
const test2 = processInput(input2);
const test3 = processInput(input3);
const test4 = processInput(input4);
const test5 = processInput(input5);
const test6 = processInput(input6);

// used to add up each element of an array
const sum = (array) => {
    let sum = 0
    array.forEach(number => {
        sum += number;
    })
    return sum
}

// to run tests, use terminal to type:
// ~$ npm run test

test('Input 1 ', () => {
    expect(sum(test1.output)).toBe(test1.fertileArea)
})
test('Input 2 ', () => {
    expect(sum(test2.output)).toBe(test2.fertileArea)
})
test('Input 3 ', () => {
    expect(sum(test3.output)).toBe(test3.fertileArea)
})
test('Input 4 ', () => {
    expect(sum(test4.output)).toBe(test4.fertileArea)
})
test('Input 5 ', () => {
    expect(sum(test5.output)).toBe(test5.fertileArea)
})
test('Input 6 ', () => {
    expect(sum(test6.output)).toBe(test6.fertileArea)
})