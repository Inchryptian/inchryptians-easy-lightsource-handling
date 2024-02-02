export const NO_LIGHT_SOURCES = -1
export const NO_LIGHT_SOURCES_AVAILABLE_OR_CLOSE = -2
export const NO_FUEL = -3

export const TORCH_INFOS = {
    droppedItemName: "Dropped Torch",
    itemName: "Torch",
    ddbItemName: "Torch",
    germanName: "Torch",
    buttonName: "torch",
    effect: {
        id: "Torch",
        name: "Torch",
        icon: "icons/sundries/lights/torch-brown-lit.webp" //might get renamed to img
    },
    data: light({ animation: { type: "torch", "speed": 3, "intensity": 2 } })
}

export const CANDLE_INFOS = {
    droppedItemName: "Dropped Candle",
    itemName: "Candle",
    ddbItemName: "Candle",
    germanName: "Candle",
    buttonName: "candle",
    effect: {
        id: "Candle",
        name: "Candle",
        icon: "icons/sundries/lights/candle-unlit-tan.webp"
    },
    data: light({ dim: 10, bright: 5, alpha: 0.15 })
}

export const LAMP_INFOS = {
    droppedItemName: "Dropped Lamp",
    itemName: "Lamp",
    ddbItemName: "Lamp",
    germanName: "Lamp",
    buttonName: "lamp",
    effect: {
        id: "Lamp",
        name: "Lamp",
        icon: "https://assets.forge-vtt.com/bazaar/systems/dnd5e/assets/icons/items/inventory/lamp.jpg"
    },
    data: light({ dim: 20, bright: 10, alpha: 0.25 }),
    fuel: "Oil Flask",
    ddbFuel: "Oil (flask)"
}

export const BULLSEYE_INFOS = {
    droppedItemName: "Dropped Bullseye Lantern",
    itemName: "Bullseye Lantern",
    ddbItemName: "Bullseye Lantern",
    germanName: "Bullseye",
    buttonName: "bullseyeLantern",
    effect: {
        id: "Bullseye",
        name: "Bullseye",
        icon: "icons/sundries/lights/lantern-bullseye-signal-copper.webp"
    },
    data: light({ dim: 120, bright: 60, angle: 60, alpha: 0.3 }),
    fuel: "Oil Flask",
    ddbFuel: "Oil (flask)"
}

export const HOODED_LANTERN_CLOSED_INFOS = {
    droppedItemName: "Dropped Hooded Lantern",
    itemName: "Hooded Lantern",
    ddbItemName: "Lantern",
    germanName: "Hooded",
    buttonName: "hoodedLanternClosed",
    effect: {
        id: "Hooded Lantern",
        name: "Hooded Lantern",
        icon: "icons/sundries/lights/lantern-iron-yellow.webp"
    },
    data: light({ dim: 5, bright: 0, alpha: 0.2 }),
    fuel: "Oil Flask",
    ddbFuel: "Oil (flask)"
}

export const HOODED_LANTERN_OPEN_INFOS = {
    droppedItemName: "Dropped Lantern",
    itemName: "Hooded Lantern",
    ddbItemName: "Lantern",
    germanName: "Lantern",
    buttonName: "hoodedLanternOpen",
    effect: {
        id: "Lantern",
        name: "Lantern",
        icon: "icons/sundries/lights/lantern-iron-yellow.webp"
    },
    data: light({ dim: 60, bright: 30 }),
    fuel: "Oil Flask",
    ddbFuel: "Oil (flask)"
}

export const LIGHT_SPELL_INFOS = {
    germanName: "Light Spell",
    buttonName: "light",
    effect: {
        id: "Light",
        name: "Light",
        icon: "icons/magic/light/explosion-star-small-blue-yellow.webp"
    },
    data: light()
}

export const LIGHT_INFO_ORDER = [BULLSEYE_INFOS, LAMP_INFOS, HOODED_LANTERN_OPEN_INFOS,
    LIGHT_SPELL_INFOS, TORCH_INFOS, CANDLE_INFOS, HOODED_LANTERN_CLOSED_INFOS]

export const LIGHT_BUTTONS_ORDER = [CANDLE_INFOS, LAMP_INFOS, TORCH_INFOS, HOODED_LANTERN_CLOSED_INFOS, HOODED_LANTERN_OPEN_INFOS,
    BULLSEYE_INFOS, LIGHT_SPELL_INFOS]

function light({ dim = 40, bright = 20, angle = 360, color = "#f98026", alpha = 0.3, animation = { type: "torch", speed: 1, intensity: 1 } } = {}) {
    return { light: { dim, bright, angle, color, alpha, animation } }
}
