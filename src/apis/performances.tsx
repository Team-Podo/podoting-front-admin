import axios from "axios";

export async function getPerformances() {
    const res = await axios.get<any>(`https://api.podoting.com/admin/performances/`)

    return res.data.performances
}

export async function createPerformance({title, place, runningTime, rating, startDate, endDate} : {
    title: string
    place: number
    runningTime: string
    rating: string
    startDate: string
    endDate: string
}):Promise<number> {
    try {
        const res = await axios.post(`https://api.podoting.com/admin/performance/create`, {
            title,
            place,
            runningTime,
            rating,
            startDate,
            endDate
        })
        console.log("create performance", res)
        return res.data.performanceId
    } catch (e) {
        throw new Error("create performance error")
    }
}

export async function updatePerformance({id, title, place, runningTime, rating, startDate, endDate} : {
    id: string
    title: string
    place: number
    runningTime: string
    rating: string
    startDate: string
    endDate: string
}) {
    try {
        const res = await axios.post(`https://api.podoting.com/admin/performance/${id}/`, {
            title,
            place,
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