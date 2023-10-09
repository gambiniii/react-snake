import React, { useState, useEffect, useRef } from "react";
import { Frame, Cell } from "./styled";

export default function Screen() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const dimension = 24

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

    function spawnFruit() {
        let coordinates = {}

        do {
            coordinates = {
                x: Math.floor(dimension - Math.random() * dimension),
                y: Math.floor(dimension - Math.random() * dimension)
            }

        } while (body.some(segment => segment.x == coordinates.x && segment.y == coordinates.y))

        setFruit(coordinates)
        console.log(coordinates)
    }

    function moveSnake(direction) {
        setHeadPosition((prevPosition) => {
            let newBody = {
                x: prevPosition.x + direction.x,
                y: prevPosition.y + direction.y
            }

            setBody(body => {
                body.push(newBody)

                body.shift()
                return body
            })

            colision(newBody)

            return newBody
        });
    }

    function command(event) {
        let { key } = event

        if (key != 'F5') event.preventDefault()

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

    function colision(coordinates) {
        let corpo = body.slice(0, body.length - 1)

        console.log(corpo)
        console.log(body)
        console.log(headPosition)

        for (let segment in corpo) {
            console.log()

            if (corpo[segment].x == coordinates.x && corpo[segment].y == coordinates.y) alert("P E R D E U")
        }
    }

    function classifier(frame) {
        let className = ""

        if (fruit.x == frame.line - 1 && fruit.y == alphabet.indexOf(frame.column)) className = 'fruit'
        if (body.find(segment => segment.x == frame.line - 1 && segment.y == alphabet.indexOf(frame.column))) className += ' body'
        if (body[body.length - 1].x == frame.line - 1 && body[body.length - 1].y == alphabet.indexOf(frame.column)) className += ' head'

        return className
    }

    createFrames(dimension)

    useEffect(() => {
        document.addEventListener('keydown', command);
        spawnFruit()
        return () => {
            document.removeEventListener('keydown', command);
        };
    }, [])

    useEffect(() => {
        if (headPosition.x === fruit.x && headPosition.y === fruit.y) {
            let newBody = body
            newBody.unshift({ ...fruit })
            setBody(newBody)
            console.log(body)
            spawnFruit()
        }

    }, [headPosition])

    return (
        <div>
            <h1>Tela</h1>

            <Frame>
                {
                    frames.map((line) => {
                        return (
                            <div style={{ display: "flex" }}>
                                {
                                    line.map(({ id, line, column }) => {
                                        return (
                                            <Cell
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
            </Frame>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                <p>Olá <span style={
                    {
                        backgroundImage: "linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)",
                        color: "transparent",
                        WebkitBackgroundClip: "text"
                    }}>
                    @Recruiter
                </span>! </p>
                <p>Esse projeto ainda não está finalizado</p>
                <p>Bjs!</p>
            </div>
        </div >
    )
}