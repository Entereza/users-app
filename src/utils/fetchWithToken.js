import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchWithToken = async (path, method, body) => {
    //http://181.177.143.198:8165
    //https://enterezabol.com:8443
    //http://35.238.246.148:8555
    const baseURL = 'https://enterezabol.com:8443'
    const token = await AsyncStorage.getItem('ENT-TKN')
    // console.log(token)

    let url = baseURL + "/" + path;
    if (method === 'GET') {
        return global.fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    } else {
        return global.fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
    }

}

export const fetchWithToken3 = async (path, method, body) => {
    const baseURL = 'http://35.238.246.148:8024';
    const token = await AsyncStorage.getItem('ENT-TKN');

    let url = baseURL + "/" + path;
    console.log(url)
    if (method === 'GET') {
        return global.fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    } else {
        return global.fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
    }
};

export const fetchWithToken4 = async (path, method, body) => {
    const baseURL = 'http://35.238.246.148:8027';
    const token = await AsyncStorage.getItem('ENT-TKN');

    let url = baseURL + "/" + path;
    console.log(url)
    if (method === 'GET') {
        return global.fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    } else {
        return global.fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
    }
};