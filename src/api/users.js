// users fetches


export async function registerUserFetch(username, password) {
    try {
        const response = await fetch(
            "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password
                    }
                })
            }
        )

        const data = await response.json();
            // console.log("register data:", data);
        return data;

    } catch (error) {
        console.log(error);
    }
}


export async function loginUserFetch(username, password) {
    try {
        const response = await fetch(
            "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password
                    }
                })
            }
        )

        const data = await response.json();
        // console.log("login data: ", data);
        return data;

    } catch (error) {
        console.log(error);
    }
}


export async function usersMeFetch() {
    try {
        const response = await fetch(
            "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/me",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            })

        const data = await response.json();
        // console.log("users/me data: ", data.data);
        return data.data;

    } catch(error) {
        console.log(error);
    }
}


export async function testUserFetch() {    
    try {
        const response = await fetch(
            "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/test/me",
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
        const data = await response.json();
        // console.log("test user data: ", data);
        return data;
    } catch (error) {
        console.log(error);
    }
}