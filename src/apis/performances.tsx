import axios from "axios";

export async function getPerformances() {
    const res = await axios.get<any>(`https://api.podoting.com/admin/performances/`)

    return res.data.performances
}

export async function createPerformance({title, placeId, runningTime, rating, startDate, endDate} : {
    title: string
    placeId: number
    runningTime: string
    rating: string
    startDate: string
    endDate: string
}):Promise<number> {
    try {
        console.log({
            title,
            placeId,
            runningTime,
            rating,
            startDate,
            endDate
        })
        const res = await axios.put(`https://api.podoting.com/admin/performances`, {
            title,
            placeId,
            runningTime,
            rating,
            startDate,
            endDate
        })
        console.log("create performance", res)
        return res.data.performanceId
    } catch (e) {
        console.log(e)
        throw new Error()
    }
}

export async function updatePerformance({id, title, placeId, runningTime, rating, startDate, endDate} : {
    id: string
    title: string
    placeId: number
    runningTime: string
    rating: string
    startDate: string
    endDate: string
}) {
    try {
        console.log({
            title,
            placeId,
            runningTime,
            rating,
            startDate,
            endDate
        })
        return
        const res = await axios.post(`https://api.podoting.com/admin/performance/${id}/`, {
            title,
            placeId,
            runningTime,
            rating,
            startDate,
            endDate
        })
        console.log("create performance", res)
    } catch (e) {
        throw new Error("create performance error")
    }
}

export async function uploadFiles({performanceId, formData}: {
    performanceId: number
    formData: FormData
}) {
    try {
        const res = await axios.post(`https://api.podoting.com/admin/performance/${performanceId}/file_upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}