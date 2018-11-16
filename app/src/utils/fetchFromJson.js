const fetch = require('node-fetch');

class FetchFromJson {
    constructor(url){
        this.url = url;
    }

    // Used to fetch the data from the database using the url given to the class and the string given to the async function
    async fetchFromString(stringParams){
        let url = this.url;
        return new Promise(async function (resolve) {
            let response = await fetch(url + '?' + stringParams);
            resolve(response.json());
        })

    }
}

export default FetchFromJson;
