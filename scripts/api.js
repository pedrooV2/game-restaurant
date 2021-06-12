class Api {

    // baseUrl = "http://game.paschoalotto.com.br/Gamification/api";
    baseUrl = "http://localhost:5000";

    async getRequest(endpoint) {
        const options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }

        const response = await fetch(this.baseUrl + endpoint, options)
        .then((response) => response)
        .catch(() =>  window.location.href = "error.html")

        return response;
    }

    async postRequest(endpoint, requestBody) {
        const options = {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }

        const response = await fetch(this.baseUrl + endpoint, options)
        .then((response) => response)
        .catch(() =>  window.location.href = "error.html")
        
        return response;
    }

    async putRequest(endpoint, requestBody) {
        const options = {
            method: 'PUT',
            body: JSON.stringify(requestBody),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }

        const response = await fetch(this.baseUrl + endpoint, options)
        .then((response) => response)
        .catch(() =>  window.location.href = "error.html")
        
        return response;
    }
}
