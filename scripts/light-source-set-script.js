let mousePosition = canvas.mousePosition
let lightColor = "#f98026"

new Dialog({
    title: "Lichtquelle auswählen",
    buttons: {
        //von hier kopieren
        candle: {
            label: "Candle",
            callback: () => {
                canvas.scene.createEmbeddedDocuments("AmbientLight", [{
                    t: "l", // l for local. The other option is g for global.
                    x: mousePosition.x,
                    y: mousePosition.y,
                    rotation: 0,
                    darkness: {min: 0.5, max: 1},
                    config: {
                        dim: 10,
                        bright: 5,
                        angle: 360,
                        color: lightColor,
                        alpha: 0.2,
                        animation: { type: "torch", "speed": 1, "intensity": 1 }
                    }
                }
                ])
            }
        },
        //bis hier kopieren
        torch: {
            label: "Torch",
            callback: () => {
                canvas.scene.createEmbeddedDocuments("AmbientLight", [{
                    t: "l", // l for local. The other option is g for global.
                    x: mousePosition.x,
                    y: mousePosition.y,
                    rotation: 0,
                    darkness: {min: 0.5, max: 1},
                    config: {
                        dim: 40,
                        bright: 20,
                        angle: 360,
                        color: lightColor,
                        alpha: 0.4,
                        animation: { type: "torch", "speed": 2, "intensity": 2 }
                    }
                }
                ])
            }
        },
        lamp: {
            label: "Lamp",
            callback: () => {
                canvas.scene.createEmbeddedDocuments("AmbientLight", [{
                    t: "l", // l for local. The other option is g for global.
                    x: mousePosition.x,
                    y: mousePosition.y,
                    rotation: 0,
                    darkness: {min: 0.5, max: 1},
                    config: {
                        dim: 45,
                        bright: 15,
                        angle: 360,
                        color: lightColor,
                        alpha: 0.3,
                        animation: { type: "torch", "speed": 1, "intensity": 1 }
                    }
                }
                ])
            }
        },
        hoodedLantern: {
            label: "Hooded",
            callback: () => {
                canvas.scene.createEmbeddedDocuments("AmbientLight", [{
                    t: "l", // l for local. The other option is g for global.
                    x: mousePosition.x,
                    y: mousePosition.y,
                    rotation: 0,
                    darkness: {min: 0.5, max: 1},
                    config: {
                        dim: 5,
                        bright: 0,
                        angle: 360,
                        color: lightColor,
                        alpha: 0.2,
                        animation: { type: "torch", "speed": 1, "intensity": 1 }
                    }
                }
                ])
            }
        },
        lantern: {
            label: "Lantern",
            callback: () => {
                canvas.scene.createEmbeddedDocuments("AmbientLight", [{
                    t: "l", // l for local. The other option is g for global.
                    x: mousePosition.x,
                    y: mousePosition.y,
                    rotation: 0,
                    darkness: {min: 0.5, max: 1},
                    config: {
                        dim: 60,
                        bright: 30,
                        angle: 360,
                        color: lightColor,
                        alpha: 0.4,
                        animation: { type: "torch", "speed": 1, "intensity": 1 }
                    }
                }
                ])
            }
        },
        bullseyeLantern: {
            label: "Bullseye",
            callback: () => {
                canvas.scene.createEmbeddedDocuments("AmbientLight", [{
                    t: "l", // l for local. The other option is g for global.
                    x: mousePosition.x,
                    y: mousePosition.y,
                    rotation: 0,
                    darkness: {min: 0.5, max: 1},
                    config: {
                        dim: 120,
                        bright: 60,
                        angle: 60,
                        color: lightColor,
                        alpha: 0.4,
                        animation: { type: "torch", "speed": 1, "intensity": 1 }
                    }
                }
                ])
            }
        },
        daylight: {
            label: "Daylight",
            callback: () => {
                canvas.scene.createEmbeddedDocuments("AmbientLight", [{
                    x: mousePosition.x,
                    y: mousePosition.y,

                    walls: false,
                    darkness: {min: 0, max: 0.5},
                    bright: 100,
                    config: { luminosity: 0.4 }
                }
                ])
            }
        }
    }
}).render(true);