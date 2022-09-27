import axios from "axios";

export async function getPerformances() {
    const res = await axios.get<any>(`https://api.podoting.com/admin/performances/`)

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
        const res = await axios.put(`https://api.podoting.com/admin/performance/${id}/`, {
            title,
            placeID,
            runningTime,
            rating,
            startDate,
            endDate
        })
        console.log("update performance", res)
    } catch (e) {
        throw new Error("update performance error")
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