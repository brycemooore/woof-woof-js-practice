class Adapter{

    static #baseUrl = 'http://localhost:3000/pups';

    static getObjects(){
        return fetch(this.#baseUrl)
        .then(res => res.json());
    }

    static getFirstObject(){
        return fetch(this.#baseUrl + '/1').then(res =>res.json());
    }

    static updateObject(object){
        let requestUrl = this.#baseUrl + '/' + object.id;
        let request = new Object();
        request.method = 'PATCH'
        request.headers = {
            'Content-Type': 'application/json'
        };
        request.body = JSON.stringify(object);
        return fetch(requestUrl, request).then(res => res.json());
    }
}