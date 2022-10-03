import axios from "axios";

export async function getCharacters({performanceID} : {performanceID:string}) {
    const res = await axios.get(`https://api.podoting.com/admin/performances/${Number(performanceID)}/characters/`)
    return res
}

export async function createCharacter({performanceID, name} : {performanceID:string, name:string}) {
    const res = await axios.post(`https://api.podoting.com/admin/performances/${performanceID}/characters/`, {name})
    return res
}

export async function deleteCharacter({characterID} : {characterID:number}) {
    const res = await axios.delete(`https://api.podoting.com/admin/characters/${characterID}`)
    return res
}