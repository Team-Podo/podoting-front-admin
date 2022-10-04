import axios from "axios";

export async function getPeoples() {
    const res = await axios.get(`https://api.podoting.com/admin/people/`)
    return res.data.people
}

export async function getPeople({id}:{id:string}) {
    const res = await axios.get(`https://api.podoting.com/admin/people/${id}`)
    return res
}

export async function createPeople({name, birth}:{name:string, birth:string}) {
    const res = await axios.post(`https://api.podoting.com/admin/people/`, {name, birth})
    return res
}

export async function editPeople({id, name, birth}:{id:number, name:string, birth:string}) {
    const res = await axios.put(`https://api.podoting.com/admin/people/${id}`, {name, birth})
    return res
}

export async function deletePeople({id}:{id:string}) {
    const res = await axios.delete(`https://api.podoting.com/admin/people/${id}`)
    return res
}