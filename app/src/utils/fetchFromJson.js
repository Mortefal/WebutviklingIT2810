const fetch = require('node-fetch');

class FetchFromJson {
    constructor(url){
        this.url = url;
    }

    async fetchFromString(stringParams){
        let url = this.url;
        return new Promise(async function (resolve) {
            let response = await fetch(url + '?' + stringParams);
            resolve(response.json());
        })

    }
}

export default FetchFromJson;
