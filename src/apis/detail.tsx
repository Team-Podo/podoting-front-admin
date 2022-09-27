import axios from "axios";

interface getDetailProps {
    id:string
}

export interface PerformanceDetail {
    id: string
    title: string
    thumbUrl: string
    place: {
        id: number
        name: string
    }
    runningTime: string
    rating: string
    startDate: string
    endDate: string
}

export async function getDetail({id}:getDetailProps) {
    const res = await axios.get<PerformanceDetail>(`https://api.podoting.com/admin/performances/${id}`)
    console.log(res)

    return res.data
}