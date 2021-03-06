
const basicAuth = {
    login: ({ username, password, project }) => {
        const request = new Request('/api/v1/users/login', {
            method: 'POST',
            body: JSON.stringify({ "email": username, password,"project":project }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
            //credentials: 'include',
        });
        return fetch(request)
            .then((response) => {
                console.log(response);
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                console.log(JSON.stringify(auth))
                localStorage.setItem('jwtToken', JSON.stringify(auth));
               
            })

    },
    logout: () => {
        localStorage.removeItem('jwtToken');
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('jwtToken');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('jwtToken')
            ? Promise.resolve()
            : Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
};

export default basicAuth; 