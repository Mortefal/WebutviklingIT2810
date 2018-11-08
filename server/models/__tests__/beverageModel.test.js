const mockingoose = require('mockingoose');
const beverageModel = require('../beverageModel');
const dataJson      = require('../__mocks__/dummyBeverages.json');

describe( 'Test Beverage Model', () => {
    it('Should contain 19 objects', () => {
        const dataArray = dataJson;
        const count = dataArray[0].length;
        mockingoose.beverageModel.toReturn(count, 'count');

        return beverageModel.count()
            .then(bevCount => {
                expect(bevCount).toEqual(count);
            })
    });
});