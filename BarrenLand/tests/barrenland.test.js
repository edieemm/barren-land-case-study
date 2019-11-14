const processInput = require('../modules/barrenland');
input1 = ["0 8 14 13"]
input2 = ["4 2 6 18", "10 2 12 18", "2 6 13 8", "2 12 13 14"]


test('Input 1', () => {
    expect(processInput(input1)).toBe([116800, 116800])
})
test('Input 2', () => {
    expect(processInput(input2)).toBe([22816, 192608])
})