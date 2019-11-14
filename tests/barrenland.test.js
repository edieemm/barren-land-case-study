const processInput = require('../modules/barrenland');
const input1 = ["0 292 399 307"]
const input2 = ["48 192 351 207", "48 392 351 407", "120 52 135 547", "260 52 275 547"]

let process1 = processInput(input1);
let process2 = processInput(input2);


test('Input 1', () => {
    expect([process1][0]).toBe(116800)
})
// test('Input 2', () => {
//     expect(processInput(input2)).toBe([22816, 192608])
// })