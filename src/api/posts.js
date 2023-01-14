// posts fetches


export async function fetchAllPosts() {
    try {
        const response = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-FT/posts');
        const data = await response.json();
        // console.log("all posts data: ", data);
        return data;
    } catch (error) {
        console.log(error);
    }
}


export async function editPostFetch(id, title, description, price, location, willDeliver) {
    try {
        const response = await fetch(`http://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                post: {
                    title: title,
                    description: description,
                    price: price,
                    location: location,
                    willDeliver: willDeliver
                }
            })
        })

        const data = await response.json();
        // console.log("edit post data ", data);
        return data;

    } catch (error) {
        console.log(error);
    }
}


export async function deletePostFetch(id) {
    try {
        const response = await fetch(
            `http://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        const data = await response.json();
        // console.log("delete post data: ", data);
        return data;

    } catch (error) {
        console.log(error);
    }
}
