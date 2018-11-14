const mockingoose = require('mockingoose');
const beverageRetriever = require('../beverageRetriever');
const bevRet = new beverageRetriever.beverageRetriever('vinmonopolet_TEST');

describe('Preprocessing of URL arguments', () => {
    const defaultOptions = {
        sort: {name: -1},
        page: 1,
        limit: 20,
        lean: true
    };
    const genericQuery = {
        genericParam1: 'Generic Paramater',
        genericParam2: 'Second Generic Parameter'
    };

    it('Should give default options on url-query w/o options', () => {
        // First set: No optional parameters. Query should be everything, and options default
        let firstSet = bevRet.prepareQuery(genericQuery);
        expect(firstSet.options).toEqual(defaultOptions);
        expect(firstSet.query)  .toEqual(genericQuery);
    });

    it('Should remove "page" from url-query and add correct page to options', () => {
        let secSet = bevRet.prepareQuery({
            ...genericQuery,
            page: '3'
        });
        expect(secSet.options).toEqual({
            ...defaultOptions,
            page: 3
        });
        expect(secSet.query).toEqual(genericQuery);
    });
    it('Should get all option (sort, page, pagesize) out of url-query and into options', () => {
        let thirdSet = bevRet.prepareQuery({
            ...genericQuery,
            sort: 'price_1',
            page: 2,
            pagesize: 10
        });
        expect(thirdSet.options).toEqual({
            ...defaultOptions,
            sort: {price: 1},
            page: 2,
            limit: 10
        });
        expect(thirdSet.query).toEqual(genericQuery);
    });

    it('Should make "name" parameters into regex', () => {
        let nameSetOne = bevRet.prepareQuery({
            ...genericQuery,
            name: 'Generic'
        });
        let nameSetTwo = bevRet.prepareQuery({
            name: 'JP Chenet 2002 alk>31.0%'
        });

        expect(nameSetOne.options).toEqual(defaultOptions);
        expect(nameSetOne.query)  .toEqual({
            ...genericQuery,
            name: /Generic/i
        });
        expect(nameSetTwo.query).toEqual({
            name: /JP Chenet 2002 alk>31.0%/i
        })
    })
});

// describe('Test correct retrieval of categories', () => {
//    it('Should have 5 main categories', done => {
//        function callback(categories){
//            console.log(categories);
//            expect(categories.length).toEqual(5);
//            done();
//        }
//
//        bevRet.getTypes(callback);
//    })
// });