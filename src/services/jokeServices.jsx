export const postNewJoke = (theJoke) => {
    fetch("http://localhost:8088/jokes", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "text": theJoke,
            "told": false
        })
    })
}