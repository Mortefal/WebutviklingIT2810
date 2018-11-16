const fetch = require('node-fetch');

class FetchFromJson {
    constructor(url){
        this.url = url;
    }

    async fetchFromString(stringParams){
        // let stringParams = JSON.stringify(stringParamas);
        let url = this.url
        return new Promise(async function (resolve) {
            let response = await fetch(url + '?' + stringParams);
            resolve(response.json());
            // fetch
            //     .then(results => {
            //         return results.json();
            //     }).then(data => {
            //     console.log(data);
            //     callback(data);
            // }).catch(err => console.log(err))
        })

    }

    // fetchFromJson(jsonArgs, callback){
    //     // i.e. {productType='Rødvin', country='Frankrike'}
    //     let stringParams = JSON.stringify(jsonArgs);
    //     stringParams = stringParams.replace(':', '=');
    //     stringParams = stringParams.replace(/\s*({)*(})* /g,'');
    //     stringParams = stringParams.replace('{','');
    //     stringParams = stringParams.replace('}','');
    //     stringParams = stringParams.replace(/"/,'');
    //     fetch(this.url + '?' + stringParams)
    //         .then(results => {
    //             return results.json();
    //         }).then(data => {
    //             callback(data);
    //         }).catch(err => console.log(err))
    // }
}

export default FetchFromJson;
/*
let fetcher = new FetchFromJson('http://it2810-15.idi.ntnu.no:3000/beverages/search');
fetcher.fetchFromString("_id=5be43eceb899cc72e3b0975f", (data => console.log(data)));
*/
