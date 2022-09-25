import React, {useState} from "react";

interface Block {
    id: string,
    grade: string,
    color: string
}

function BlockItem({id, grade, color}: Block) {
    const [isActive, setIsActive] = useState(false)
    const [cursor, setCursor] = useState({ x:0, y:0 })

    function onClickMouseHandler(e: React.MouseEvent) {
        setIsActive((curr) => !curr)
        setCursor({ x: e.pageX, y: e.pageY})
    }


    const blockStyle = {
        backgroundColor: color,
        marginRight: "5px"
    }

    return <div
        className={"blocks"}
        style={blockStyle}>
    </div>

}

export default BlockItem
