import axios from "axios";

export interface Area {
    id: number
    name: string
    backgroundImageUrl: string
}

export async function getAreas(id: string) {
    try {
        const res = await axios.get<Area[]>(`https://api.podoting.com/admin/places/${id}/areas/`)
        return res
    } catch (e) {
        throw new Error()
    }
}


export async function getArea(id: string, areaId: string) {
    try {
        const res = await axios.get<Area>(`https://api.podoting.com/admin/places/${id}/areas/${areaId}`)
        return res
    } catch (e) {
        console.log(e)
        throw new Error()
    }
}

export async function createArea({placeId, name}: { placeId: number, name: string }) {
    const res = await axios.post(`https://api.podoting.com/admin/places/${Number(placeId)}/areas/`, {name})
    return res
}

export async function editArea({placeId, areaId, name}: { placeId: number, areaId: number, name: string }) {
    const res = await axios.put(`https://api.podoting.com/admin/places/${Number(placeId)}/areas/${areaId}`, {name})
    return res
}

export async function deleteArea({placeId, areaId}: { placeId: string, areaId: string}) {
    const res = await axios.delete(`https://api.podoting.com/admin/places/${placeId}/areas/${areaId}`)
    return res.status
}

export async function uploadAreaImage({placeId, areaId, formData} : {
    placeId: string
    areaId: number
    formData: FormData
}) {
    const res = await axios.post(`https://api.podoting.com/admin/places/${placeId}/areas/${areaId}/background-image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return res
}

