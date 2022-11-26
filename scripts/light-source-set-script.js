let mousePosition = canvas.app.renderer.plugins.interaction.mouse.getLocalPosition(canvas.app.stage);
let lightColor = "#f98026"

new Dialog({
    title: "Lichtquelle auswählen",
    buttons: {
        candle: {
            label: "Candle",
            callback: () => {
                canvas.scene.createEmbeddedDocuments("AmbientLight", [{
                    t: "l", // l for local. The other option is g for global.
                    x: mousePosition.x,
                    y: mousePosition.y,
                    rotation: 0,
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
        torch: {
            label: "Torch",
            callback: () => {
                canvas.scene.createEmbeddedDocuments("AmbientLight", [{
                    t: "l", // l for local. The other option is g for global.
                    x: mousePosition.x,
                    y: mousePosition.y,
                    rotation: 0,
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
    }
}).render(true);