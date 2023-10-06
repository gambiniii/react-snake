import React, { useState, useEffect, useRef } from "react";
import { Frame } from "./styled";

export default function Screen() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const dimension = 12

    const lines = []
    const columns = []
    const frames = []

    const [headPosition, setHeadPosition] = useState({ x: 0, y: 0 });


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

    function moveSnake(direction) {
        setHeadPosition((prevPosition) => {
            return {
                x: prevPosition.x + direction.x,
                y: prevPosition.y + direction.y
            }
        });
    }

    function command({ key }) {
        switch (key) {
            case "ArrowUp":
                moveSnake({ x: -1, y: 0 });
                break;
            case "ArrowDown":
                moveSnake({ x: 1, y: 0 });
                break;
            case "ArrowLeft":
                moveSnake({ x: 0, y: -1 });
                break;
            case "ArrowRight":
                moveSnake({ x: 0, y: 1 });
                break;
            default:
                break;
        }
    }

    createFrames(dimension)

    useEffect(() => {
        document.addEventListener('keydown', command);
        return () => {
            document.removeEventListener('keydown', command);
        };
    }, [])

    return (
        <div>
            <h1>Tela</h1>

            {
                frames.map((line) => {
                    return (
                        <div style={{ display: "flex" }}>
                            {
                                line.map(({ id, line, column }) => {
                                    return (
                                        <Frame id={id} className={headPosition.x === line - 1 && headPosition.y === alphabet.indexOf(column) ? 'head' : ''} />
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