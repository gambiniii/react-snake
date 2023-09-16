import React from "react";
import { Frame } from "./styled";

export default function Screen() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const dimension = 12

    const lines = []
    const columns = []
    const frames = []


    function createFrames(dimension) {
        for (let i = 0; i < dimension; i++) {
            lines[i] = i + 1;
            columns[i] = alphabet.charAt(i)
        }

        lines.map(
            (line, lineIndex) => {
                let lineBlock = []

                columns.map(
                    (column, columnIndex) => {
                        lineBlock.push(
                            {
                                id: column + line,
                                line: line,
                                column: column
                            }
                        )
                    }
                )
                frames.push(lineBlock)
            }
        )
    }

    createFrames(dimension)

    return (
        <div>
            <h1>Tela</h1>

            {
                frames.map((line) => {
                    return (
                        <div style={{ display: "flex" }}>
                            {
                                line.map(({ id }) => {
                                    return (
                                        <Frame />
                                    )
                                })
                            }
                        </div>
                    )
                })
            }

        </div>
    )
}