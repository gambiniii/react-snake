import React, { useState, useEffect } from "react";
import { Frame, Cell } from "./styled";

export default function Screen() {
    const gameConfig = {
        dimension: 24,
        speed: 100,
        initialDirection: 'Right',
        coordinatesPattern: {
            x: null,
            y: null
        },
        initialBody: [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
            { x: 1, y: 3 },
        ]
    }

    const frames = []

    const [headPosition, setHeadPosition] = useState(gameConfig.initialBody[gameConfig.initialBody.length - 1])
    const [body, setBody] = useState(gameConfig.initialBody)
    const [fruit, setFruit] = useState(gameConfig.coordinatesPattern)
    const [direction, setDirection] = useState(gameConfig.initialDirection)
    const [controls, setControls] = useState(true)


    function createFrames(dimension) {
        let lineBlock

        for (let line = 0; line < dimension; line++) {
            lineBlock = []

            for (let column = 0; column < dimension; column++) {
                lineBlock.push(
                    {
                        id: column + line,
                        line: line,
                        column: column
                    }
                )
            }

            frames.push(lineBlock)
        }
    }


    function spawnFruit() {
        try {
            let coordinates = {}

            do {
                coordinates = {
                    x: Math.floor(gameConfig.dimension - Math.random() * gameConfig.dimension),
                    y: Math.floor(gameConfig.dimension - Math.random() * gameConfig.dimension)
                }

            } while (body.some(segment => segment.x === coordinates.x && segment.y === coordinates.y))

            setFruit(coordinates)
        } catch (error) {
            console.log(error)
        }
    }


    function moveSnake(movement) {
        setHeadPosition((prevPosition) => {
            let newBody = {
                x: prevPosition.x + movement.x,
                y: prevPosition.y + movement.y
            }

            setBody(body => {
                body.push(newBody)
                body.shift()
                return body
            })

            colision(newBody)
            setControls(true)

            return newBody
        })

    }


    function command(event) {
        let { key } = event

        if (key !== 'F5') event.preventDefault()

        setDirection(prevDirection => {
            if (!controls) return prevDirection

            switch (key) {
                case "ArrowUp":
                    if (prevDirection === 'Down') return prevDirection
                    return 'Up'
                case "ArrowDown":
                    if (prevDirection === 'Up') return prevDirection
                    return 'Down'
                case "ArrowLeft":
                    if (prevDirection === 'Right') return prevDirection
                    return 'Left'
                case "ArrowRight":
                    if (prevDirection === 'Left') return prevDirection
                    return 'Right'
                default:
                    return prevDirection
            }
        })
    }


    function movement() {
        switch (direction) {
            case "Up":
                moveSnake({ x: -1, y: 0 });
                break;
            case "Down":
                moveSnake({ x: 1, y: 0 });
                break;
            case "Left":
                moveSnake({ x: 0, y: -1 });
                break;
            case "Right":
                moveSnake({ x: 0, y: 1 });
                break;
            default:
                break;
        }
    }

    function tick() {
        window.clearTimeout()
        setTimeout(() => {
            movement()
        }, gameConfig.speed)
    }


    function colision(coordinates) {
        let corpo = body.slice(0, body.length - 1)

        for (let segment in corpo) {
            if (corpo[segment].x === coordinates.x && corpo[segment].y === coordinates.y) alert("P E R D E U")
        }
    }


    function classifier(frame) {
        let className = ""

        if (fruit.x === frame.line && fruit.y === frame.column) className = 'fruit'
        if (body.find(segment => segment.x === frame.line && segment.y === frame.column)) className += ' body'
        if (body[body.length - 1].x === frame.line && body[body.length - 1].y === frame.column) className += ' head'

        return className
    }


    createFrames(gameConfig.dimension)

    useEffect(() => {
        document.addEventListener('keydown', command);
        spawnFruit()
        movement()
        return () => {
            document.removeEventListener('keydown', command);
        };
    }, [])


    useEffect(() => {
        if (headPosition.x === fruit.x && headPosition.y === fruit.y) {
            let newBody = body
            newBody.unshift({ ...fruit })
            setBody(newBody)
            spawnFruit()
        }

        tick()
    }, [headPosition])

    useEffect(() => {
        setControls(false)
    }, [direction])


    return (
        <div style={{ display: 'flex' }}>

            <div>
                <h1>Tela</h1>

                <Frame>
                    {
                        frames.map((frame) => {
                            return (
                                <div style={{ display: "flex" }}>
                                    {
                                        frame.map(({ id, line, column }) => {
                                            return (
                                                <Cell
                                                    id={id}
                                                    className={
                                                        classifier({ line, column })
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
                    <p>ESTE PROJETO AINDA ESTÁ SENDO DESENVOLVIDO!</p>
                    <p>Bjs!</p>
                </div>
            </div >

            <div>
                <h3>Direção: {direction}</h3>
                <h3>Controles: {controls ? 'enabled' : 'disabled'}</h3>
            </div>

        </div>

    )
}