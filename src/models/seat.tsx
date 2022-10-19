export interface Grade {
    color: string
    id?: number
    name: string
    price: number
}

interface Point {
    x: number
    y: number
}

export interface Seat {
    uuid: string
    grade: Grade
    point: Point
}
