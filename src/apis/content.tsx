import axios from "axios";

export async function getContent({performanceID}: { performanceID: string }) {
    const res = await axios.get(`https://api.podoting.com/admin/performances/${Number(performanceID)}/contents/`)
    return res
}

export async function saveContent({
                                      performanceID,
                                      content,
                                      managingTitle
                                  }: { performanceID: string, content: string, managingTitle: string }) {
    const res = await axios.post(`https://api.podoting.com/admin/performances/${Number(performanceID)}/contents/`, {
        content,
        managingTitle
    })
    return res
}

export async function editContent({
                                      performanceID,
                                      contentID,
                                      content,
                                      managingTitle
                                  }: { performanceID: string, contentID:string, content: string, managingTitle: string }) {
    const res = await axios.put(`https://api.podoting.com/admin/performances/${Number(performanceID)}/contents/${contentID}`, {
        content,
        managingTitle
    })
    return res
}


export async function uploadImage({
                                      performanceID,
                                      contentImage
                                  }: { performanceID: string, contentImage: FormData }) {
    console.log(contentImage)
    const res = await axios.post(`https://api.podoting.com/admin/performances/${performanceID}/contents/image`, contentImage, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    console.log(res)
    return res
}