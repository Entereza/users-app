export const fetchWithoutToken = (path, method, body) => {

    const baseURL = "https://enterezabol.com:8443"

    let url = baseURL +"/"+ path;
    if (method === 'GET') {
        return global.fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }else {
        return global.fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
    }

}