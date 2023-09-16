import * as types from '../types'

const initialState = {
    placar: 0
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.AUMENTAR_PLACAR:
            const newState = { ...state }
            newState.placar += 1
            console.log(newState)
            return newState

        default:
            return state
    }
}
