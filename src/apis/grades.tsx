import axios from "axios";
import {Grade} from "../models/seat";

export async function getGrades({performanceID} : {performanceID: string}) {
    const res = await axios.get(`https://api.podoting.com/admin/performances/${performanceID}/seat-grades/`)

    return res
}

export async function createGrade({performanceID, data} : {performanceID:string, data:Grade}) {
    const res = await axios.post(`https://api.podoting.com/admin/performances/${performanceID}/seat-grades/`, {
        name: data.name,
        price: Number(data.price),
        color: data.color
    })

    return res
}

