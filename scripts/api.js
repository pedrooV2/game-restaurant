class Api {

    baseUrl = "http://game.paschoalotto.com.br/gamificationapi/api";
    //baseUrl = "http://localhost:5000/api";

    async getRequest(endpoint, queryParams = "") {
        const options = {
            method: 'GET',
            mode: 'cors',
        }

        const response = await fetch(this.baseUrl + endpoint + queryParams, options)
            .then((response) => response)
            .catch(() => window.location.href = "error.html")

        return response;
    }

    async postRequest(endpoint, requestBody) {
        const options = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(requestBody),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }

        const response = await fetch(this.baseUrl + endpoint, options)
            .then((response) => response)
            .catch(() => window.location.href = "error.html")

        return response;
    }

    async putRequest(endpoint, requestBody) {
        const options = {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(requestBody),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }

        const response = await fetch(this.baseUrl + endpoint, options)
            .then((response) => response)
            .catch(() => window.location.href = "error.html")

        return response;
    }
}
