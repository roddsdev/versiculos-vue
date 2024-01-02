export default class FetchAdapter {    

    constructor () {
        this.baseURL = null;
    }

    setUrl (url) {
        this.baseURL = url
    }

    async post (path, params = {}, headers = {}) {
        if (!this.baseURL) return "Api não encontrada"
        
        const response = await fetch(this.baseURL+path, {
            method: "POST",
            body: JSON.stringify(params),
            headers: headers
        })
        const data = await response.json()
        data.status = response.status

        return data;
    }

    async put (path, params = {}, headers = {}) {
        if (!this.baseURL) return "Api não encontrada"
        
        const response = await fetch(this.baseURL+path, {
            method: "PUT",
            body: JSON.stringify(params),
            headers: headers
        })
        const data = await response.json()
        
        return data;
    }

    async get (path, headers = {}) {
        if (!this.baseURL) return "Api não encontrada"
        
        const response = await fetch(this.baseURL+path, {
            method: "GET",
            headers: headers
        })
        const data = await response.json()
        data.status = response.status
        
        return data;
    }
}