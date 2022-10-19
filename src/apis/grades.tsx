import axios from "axios";

export async function getGrades({performanceID} : {performanceID: string}) {
    const res = await axios.get(`https://api.podoting.com/admin/performances/${performanceID}/seat-grades/`)

    return res
}