const ADD_BLOCK = "seats/ADD_DIV"


interface Block {
    id: string,
    grade: string,
    color: string
}

export const addBlock = (block:Block) => ({
    type: ADD_BLOCK,
    payload: block
})

type BlockAction =
    | ReturnType<typeof addBlock>

// 초기 상태 선언
const initialState: Block[] = []

// 리듀서
function seats(
    state: Block[] = initialState,
    action: BlockAction
) {
    switch (action.type) {
        case ADD_BLOCK:
            return state.push(action.payload)
        default:
            return state
    }
}

export default seats