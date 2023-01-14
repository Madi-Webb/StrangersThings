// messages fetches


export async function postMessageFetch(id, content) {
    try {
        const response = await fetch(
            `https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts/${id}/messages`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    message: {
                        content: content
                    }
                })
            }
        )
        const data = await response.json();
        // console.log("send message data: ", data);
        return data;

    } catch (error) {
        console.log(error);
    }
}