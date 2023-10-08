import React, { useState, useEffect, useRef } from "react";
import { Frame } from "./styled";

export default function Screen() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const dimension = 12

    const lines = []
    const columns = []
    const frames = []

    let initialBody = [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
    ]

    const [headPosition, setHeadPosition] = useState({ x: 1, y: 3 });
    const [body, setBody] = useState(initialBody)
    const [fruit, setFruit] = useState({ x: 6, y: 8 })


    function createFrames(dimension) {
        for (let i = 0; i < dimension; i++) {
            lines[i] = i + 1;
            columns[i] = alphabet.charAt(i)
        }

        lines.map(
            (line) => {
                let lineBlock = []

                columns.map(
                    (column) => {
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
            setBody(body => {
                body.push({
                    x: prevPosition.x + direction.x,
                    y: prevPosition.y + direction.y
                })

                body.shift()
                return body
            })
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

    function classifier(frame) {
        let className = ""

        if (body.find(body => body.x == frame.line - 1 && body.y == alphabet.indexOf(frame.column))) className = 'body'
        if (body[body.length - 1].x == frame.line - 1 && body[body.length - 1].y == alphabet.indexOf(frame.column)) className = 'head'
        if (fruit.x == frame.line - 1 && fruit.y == alphabet.indexOf(frame.column)) className = 'fruit'

        return className
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
                                        <Frame
                                            id={id}
                                            className={
                                                classifier({ id, line, column })
                                            }
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                <p>Olá
                    <span style={
                        {
                            backgroundImage: "linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)",
                            color: "transparent",
                            WebkitBackgroundClip: "text"
                        }}>
                         @Recruiter
                    </span>!
                </p>
                <p>Esse projeto ainda não está finalizdo</p>
                <p>Bjs!</p>

            </div>

        </div >
    )
}