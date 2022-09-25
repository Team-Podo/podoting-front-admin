import React, {useEffect, useState} from "react";
import {Places} from "../../models/places";
import {getPlaces} from "../../apis/places";
import {useNavigate} from "react-router-dom";

function PlaceListPage() {
    const [places, setPlaces] = useState<Places[]>()
    const navigate = useNavigate()

    useEffect(function () {
        getPlaces().then((res) => {
            setPlaces(res)
        })
    }, [])

    function onClickCreatePlace() {
        navigate("/places/create")
    }

    return <>

        <div className={"common-section"}>
            <table>
                <thead>
                <tr>
                    <td>id</td>
                    <td>이름</td>
                    <td>주소</td>
                    <td>생성일자</td>
                </tr>
                </thead>
                <tbody>
                {places && places.map((pl) =>
                    <tr key={pl.id}>
                        <td>{pl.id}</td>
                        <td onClick={() => {
                            window.location.href = `/place/${pl.id}`
                        }}>{pl.name}</td>
                        <td>{pl.location}</td>
                        <td>{pl.createdAt.slice(0, 10)}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <button className={"button"} onClick={onClickCreatePlace}>장소 생성</button>
        </div>
    </>
}

export default PlaceListPage