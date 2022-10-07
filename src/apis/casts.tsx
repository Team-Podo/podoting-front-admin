import axios from "axios";
import {Cast} from "../models/cast";

export async function getCasts({performanceID}: { performanceID: string }) {
    const res = await axios.get(`https://api.podoting.com/admin/performances/${performanceID}/casts/`)
    return res.data.casts
}

export async function saveCasts({performanceID, casts}: { performanceID: string, casts: Cast[] }) {
    const data = casts.map((c) => {
        if (c.id) {
            return {
                id: c.id,
                characterID: Number(c.characterID),
                personID: Number(c.personID)
            }
        } else return {
            characterID: Number(c.characterID),
            personID: Number(c.personID)
        }
    })
    console.log(data)
    try {
        const res = await axios.post(`https://api.podoting.com/admin/performances/${performanceID}/casts/many`, data)
        console.log(res)
        return res
    }catch (e) {
        console.log(e)
        throw new Error()
    }

}

export async function deleteCast({castID}: { castID: number }) {
    const res = await axios.delete(`https://api.podoting.com/admin/casts/${castID}`)
    console.log("deleted", res)
    return res
}