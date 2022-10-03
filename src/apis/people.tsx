import axios from "axios";

export async function getPeople() {
    const res = await axios.get(`https://api.podoting.com/admin/people/`)
    return res.data.people
}