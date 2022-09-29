import React, {useEffect, useState} from "react";
import {Places} from "../../models/places";
import {getPlaces} from "../../apis/places";
import ModalPortal from "../../components/ModalPortal";
import PlaceModal from "../../components/createPlaceModal/PlaceModal";
function PlaceListPage() {
    const [places, setPlaces] = useState<Places[]>()
    const [modal, setModal] = useState({ state: false, type: "create"})
    const [placeId, setPlaceId] = useState(0)


    useEffect(function () {
        getPlaces().then((res) => {
            setPlaces(res)
        })
    }, [])

    function openPlaceModal(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if(e.currentTarget.value) {
            setPlaceId(Number(e.currentTarget.value))
            setModal({ state: true, type: "edit"})
        } else {
            setModal({ state: true, type: "create"})
        }
    }

    function deletePlaceModal(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
    }

    function closePlaceModal() {
        setPlaceId(0)
        setModal({ state: false, type: "create"})
    }

    return <>
        <div className={"common-section"}>
            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>이름</th>
                    <th>주소</th>
                    <th>생성일자</th>
                    <th>-</th>
                </tr>
                </thead>
                <tbody>
                {places && places.map((pl) =>
                    <tr key={pl.id}>
                        <td>{pl.id}</td>
                        <td onClick={() => {
                            window.location.href = `/place/${pl.id}`
                        }}>{pl.name}</td>
                        <td>{pl.address}</td>
                        <td>{pl.createdAt.slice(0, 10)}</td>
                        <td>
                            <button onClick={openPlaceModal} value={pl.id} className={"btn-small"}>수정</button>
                            <button onClick={deletePlaceModal} value={pl.id} className={"btn-small"}>삭제</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <button className={"button"} onClick={openPlaceModal}>장소 생성</button>
        </div>
        {
            modal.state &&
            <ModalPortal>
                <PlaceModal handleClose={closePlaceModal} type={modal.type} id={placeId}/>
            </ModalPortal>
        }
    </>
}

export default PlaceListPage