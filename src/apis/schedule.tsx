import axios from "axios";

export async function getSchedules({performanceID} : {performanceID:string}) {
    const res = await axios.get(`https://api.podoting.com/admin/performances/${performanceID}/schedules/`)

    return res.data
}

export async function createSchedule({performanceID, data} : {performanceID:string, data:any}) {
    const res = await axios.post(` https://api.podoting.com/admin/performances/${performanceID}/schedules/`, data)

    return res
}

export async function editSchedule({UUID, data} : {UUID:string, data:any}) {
    const res = await axios.put(` https://api.podoting.com/admin/schedules/${UUID}`, data)

    return res
}

export async function deleteSchedule({UUID}:  {UUID:string}) {
    const res = await axios.delete(` https://api.podoting.com/admin/schedules/${UUID}`)
    return res
}