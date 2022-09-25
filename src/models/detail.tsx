export interface Content {
    uuid: string
    title: string
    content: string
}

export interface Detail {
    id: number;
    title: string;
    thumbUrl: string;
    place: {
        id:number,
        name: string,
        image: string
    }
    rating: string
    runningTime: string;
    startDate: string;
    endDate: string
    schedules: {
        uuid: string,
        date: string,
        time: string,
        cast: { id: number, name: string }[]
    }[],
    cast: {
        id: number,
        profile: {
            url: string
        },
        name: string,
        role: string
    }[],
    contents: Content[]
}
