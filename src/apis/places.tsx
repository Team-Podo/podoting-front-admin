import axios from "axios";
import {Places} from "../models/places";

export async function getPlaces() {
    //const res = await axios.get<Places[]>(`https://api.podoting.com/admin/places/`)

    return [
        { id: 1, name: "어울림누리 대극장", location: "고양시 일산 화정 어울림누리누리", createdAt: "2022-09-14"}
    ]
}