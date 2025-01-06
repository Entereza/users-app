export const fetchWithoutToken = (path, method, body) => {
    //https://enterezabol.com:2053
    const baseURL = "https://enterezabol.com:2053"

    let url = baseURL + "/" + path;

    // console.log(url)

    if (method === 'GET') {
        return global.fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    } else {
        return global.fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
    }
}