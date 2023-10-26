import React, { useState, useEffect, useRef } from "react"

import { Frame, Cell } from "./styled"
import { gameConfig, snakeOrientation } from "../../config/gameConfig"

export default function Screen() {
    let animationFrame
    const frames = []

    const [headPosition, setHeadPosition] = useState(gameConfig.initialBody[gameConfig.initialBody.length - 1])
    const [body, setBody] = useState(gameConfig.initialBody)

    const [direction, setDirection] = useState(gameConfig.initialDirection)
    const [orientation, setOrientation] = useState(snakeOrientation[direction.toLowerCase()])
    const [controls, setControls] = useState(true)

    const [fruit, setFruit] = useState(gameConfig.coordinatesPattern)
    const [gameOver, setGameOver] = useState(false)

    const lastUpdateTimeRef = useRef(0);
    const animationFrameRef = useRef();

    const orientations = {
        Up: { x: -1, y: 0 },
        Down: { x: 1, y: 0 },
        Left: { x: 0, y: -1 },
        Right: { x: 0, y: 1 },
    }


    function gameLoop(timestamp) {
        if (!animationFrameRef.current) return

        const timeElapsed = timestamp - lastUpdateTimeRef.current;

        if (timeElapsed >= 300) {
            lastUpdateTimeRef.current = timestamp
            setOrientation(orientations[direction])
            moveSnake();
        }

        animationFrameRef.current = requestAnimationFrame(gameLoop);
    }


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


    function command(event) {
        let { key } = event

        if (key !== 'F5') event.preventDefault()

        setDirection(prevDirection => {
            if (!controls) return prevDirection

            switch (key) {
                case "ArrowUp":
                    if (prevDirection !== 'Down') return 'Up'
                    return prevDirection
                case "ArrowDown":
                    if (prevDirection !== 'Up') return 'Down'
                    return prevDirection
                case "ArrowLeft":
                    if (prevDirection !== 'Right') return 'Left'
                    return prevDirection
                case "ArrowRight":
                    if (prevDirection !== 'Left') return 'Right'
                    return prevDirection
                default:
                    return prevDirection
            }
        })
    }


    function moveSnake() {
        setHeadPosition((prevPosition) => {
            let newHead = {
                x: prevPosition.x + orientation.x,
                y: prevPosition.y + orientation.y
            }

            setBody(body => {
                body.push(newHead)
                body.shift()
                return body
            })

            colision(newHead)

            return newHead
        })
    }


    function colision(coordinates) {
        let snakeBody = body.slice(0, body.length - 1)

        for (let segment in snakeBody) {
            if (snakeBody[segment].x === coordinates.x && snakeBody[segment].y === coordinates.y) alert("P E R D E U")
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


    function classifier(frame) {
        let className = ""

        if (fruit.x === frame.line && fruit.y === frame.column) className = 'fruit'
        if (body.find(segment => segment.x === frame.line && segment.y === frame.column)) className += ' body'
        if (body[body.length - 1].x === frame.line && body[body.length - 1].y === frame.column) className += ' head'

        return className
    }


    useEffect(() => {
        document.addEventListener('keydown', command)
        spawnFruit()
        return () => {
            document.removeEventListener('keydown', command)
            cancelAnimationFrame(animationFrameRef.current);
        }
    }, [])


    useEffect(() => {
        if (headPosition.x === fruit.x && headPosition.y === fruit.y) {
            let newBody = body
            newBody.unshift({ ...fruit })
            setBody(newBody)
            spawnFruit()
        }
    }, [headPosition])


    useEffect(() => {
        cancelAnimationFrame(animationFrameRef.current)

        setOrientation(orientations[direction])
        return () => {
            cancelAnimationFrame(animationFrame);
        }
    }, [direction]);

    useEffect(() => {
        cancelAnimationFrame(animationFrameRef.current)

        animationFrameRef.current = requestAnimationFrame(gameLoop);
    }, [orientation])


    createFrames(gameConfig.dimension)


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
                <h3>direction: {direction}</h3>
                <h3>controls: {controls ? 'enabled' : 'disabled'}</h3>
            </div>

        </div>

    )
}