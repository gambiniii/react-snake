import * as types from '../types'

export function aumentarPlacar() {
    return {
        type: types.AUMENTAR_PLACAR
    }
}

export function gameOver() {
    return {
        type: types.GAME_OVER
    }
}