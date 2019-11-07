const { flatten } = require('../src/flatten');

describe('flatten', () => {
    it('Should work with a basic object', () => {
        let obj = {
            hello: 'world',
            colors: {
                red: 1,
                green: 2,
                blue: 3
            }
        };

        let result = flatten(obj);

        expect(result).toEqual({
            'hello': 'world',
            'colors.red': 1,
            'colors.green': 2,
            'colors.blue': 3
        });
    });
});
