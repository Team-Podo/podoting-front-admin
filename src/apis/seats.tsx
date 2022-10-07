import axios from "axios";

interface SeatProp {
    uuid: string
    gradeID: number
}

export async function getSeats({performanceID, areaID}: {
    performanceID: string
    areaID: number
}) {
    const res = await axios.get(`https://api.podoting.com/admin/performances/${performanceID}/areas/${areaID}/seats/`)
    return res.data
}

export async function saveSeats({performanceID, areaID, seatArray}: {
    performanceID: string
    areaID: number,
    seatArray: SeatProp[]
}) {
    const res = await axios.post(`https://api.podoting.com/admin/performances/${performanceID}/areas/${areaID}/seats/`, seatArray)
    return res
}