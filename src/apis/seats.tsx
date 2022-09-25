import axios from "axios";

export async function getSeats() {
    const res = await axios.get("https://api.podoting.com/admin/performances/11")

    return res.data
}