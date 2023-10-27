export const gameConfig = {
    dimension: 24,
    speed: 50,
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

export const snakeOrientation = {
    up: { x: -1, y: 0 },
    down: { x: 1, y: 0 },
    left: { x: 0, y: -1 },
    right: { x: 0, y: 1 },
}