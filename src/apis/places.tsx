import axios from "axios";
import {Places} from "../models/places";

export async function getPlaces() {
    const res = await axios.get<Places[]>(`https://api.podoting.com/admin/places/`)
    return res.data
}

export async function getPlace(id: number) {
    const res = await axios.get(`https://api.podoting.com/admin/places/${id}`)
    return res.data
}

export async function createPlace(data: {name: string, address:string}) {
    try {
        const res = await axios.post(`https://api.podoting.com/admin/places/`, data)

    } catch (e) {
        console.log(e)
    }
}

export async function editPlace(data: {id: number, name: string, address:string}) {
    console.log("edit 전달 데이터", data)
    try {
        const res = await axios.put(`https://api.podoting.com/admin/places/${data.id}`, {"name": data.name, "address": data.address})
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}