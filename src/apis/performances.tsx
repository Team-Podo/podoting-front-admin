import axios from "axios";

export async function getPerformances() {
    const res = await axios.get(`https://api.podoting.com/admin/performances/`)

    return res.data.performances
}

export async function createPerformance({title, placeID, runningTime, rating, startDate, endDate} : {
    title: string
    placeID: number
    runningTime: string
    rating: string
    startDate: string
    endDate: string
}):Promise<number> {
    try {
        console.log(placeID)
        const res = await axios.post(`https://api.podoting.com/admin/performances/`, {
            title,
            "placeID": Number(placeID),
            runningTime,
            rating,
            startDate,
            endDate
        })
        console.log("create performance", res)
        return res.data
    } catch (e) {
        console.log(e)
        throw new Error()
    }
}

export async function updatePerformance({id, title, placeID, runningTime, rating, startDate, endDate} : {
    id: string
    title: string
    placeID: number
    runningTime: string
    rating: string
    startDate: string
    endDate: string
}) {
    try {
        const res = await axios.put(`https://api.podoting.com/admin/performances/${id}`, {
            title,
            "placeID": Number(placeID),
            runningTime,
            rating,
            startDate,
            endDate
        })
        return res
    } catch (e) {
        console.log(e)
        throw new Error()
    }
}

export async function uploadFiles({performanceId, formData}: {
    performanceId: number
    formData: FormData
}) {
    try {
        const res = await axios.post(`https://api.podoting.com/admin/performances/${performanceId}/thumbnail`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}

export async function deletePerformance({performanceID} : {performanceID:string}) {
    const res = await axios.delete(`https://api.podoting.com/admin/performances/${performanceID}`)

    return res.status
}