import axios from "axios";

interface getDetailProps {
    id:string
}

export async function getDetail({id}:getDetailProps) {
    const res = await axios.get(`https://api.podoting.com/admin/performances/${id}`)

    return res.data
}