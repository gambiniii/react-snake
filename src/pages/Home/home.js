import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Screen from "../Screen/screen";

export default function Home() {
    const dispatch = useDispatch()
    const placar = useSelector(state => {
        console.log(state)
        return state.score.placar
    })

    let aumentarPlacar = (event) => {
        event.preventDefault()

        console.log(placar)

        dispatch({
            type: 'AUMENTAR_PLACAR'
        })
    }


    return (
        <>
            <h1>Home Page</h1>

            <Screen />

            {/* <button onClick={aumentarPlacar}>
                {placar}
            </button> */}
        </>
    )
}