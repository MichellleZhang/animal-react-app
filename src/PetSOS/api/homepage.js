import api from "./api";

export const getToken = () => {
    const key = "2fX4cxD5glhQK4egKgBgHzROhy0G2QE9uk2lfn3yVtcFMaa5p6";
    const secret = "6EeKgGgCFFOHqQm1edjzA35seDf0tS8OkfW4EwlT";
    return api.post("https://api.petfinder.com/v2/oauth2/token", {
        grant_type: "client_credentials",
        client_id: key,
        client_secret: secret
    }, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
}

export const getAnimal = async (animal, zip) => {
    const token = (await getToken()).data.access_token;
    const url = `https://api.petfinder.com/v2/animals?type=${animal}&location=${zip}`;
    return api.get(url, {
        headers: {
            Authorization: "Bearer " + token,
        }
    });
}