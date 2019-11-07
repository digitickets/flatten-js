const { unflatten } = require('../src/flatten');

describe('unflatten', () => {
    it('Should work with a basic object', () => {
        let data = {
            'hello': 'world',
            'colors.red': 1,
            'colors.green': 2,
            'colors.blue': 3
        };
        let result = unflatten(data);
        expect(result).toEqual({
            hello: 'world',
            colors: {
                red: 1,
                green: 2,
                blue: 3
            }
        });
    });

    it('Should work with one value', () => {
        let data = {
            'something.one' : 'val1'
        };
        let result = unflatten(data);
        expect(result).toEqual({
            something: {
                one: 'val1'
            }
        });
    });

    it('Should work with empty object', () => {
        let data = {};
        let result = unflatten(data);
        expect(result).toEqual({});
    });
});
