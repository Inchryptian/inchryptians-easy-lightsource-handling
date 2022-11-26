export const NO_LIGHT_SOURCES = -1
export const NO_LIGHT_SOURCES_AVAILABLE_OR_CLOSE = -2
export const NO_FUEL = -3

export const TORCH_INFOS = {
    droppedItemName: "Dropped Torch",
    itemName: "Torch",
    germanName: "Fackel",
    buttonName: "torch",
    effect: {
        id: "Torch",
        label: "Torch",
        icon: "icons/sundries/lights/torch-brown-lit.webp"
    },
    data: {
        light: {
            dim: 40,
            bright: 20,
            angle: 360,
            color: "#f98026",
            alpha: 0.4,
            animation: { type: "torch", "speed": 2, "intensity": 2 }
        }
    }
}

export const CANDLE_INFOS = {
    droppedItemName: "Dropped Candle",
    itemName: "Candle",
    germanName: "Kerze",
    buttonName: "candle",
    effect: {
        id: "Candle",
        label: "Candle",
        icon: "icons/sundries/lights/candle-unlit-tan.webp"
    },
    data: {
        light: {
            dim: 10,
            bright: 5,
            angle: 360,
            color: "#f98026",
            alpha: 0.2,
            animation: { type: "torch", "speed": 1, "intensity": 1 }
        }
    }
}

export const LAMP_INFOS = {
    droppedItemName: "Dropped Lamp",
    itemName: "Lamp",
    germanName: "Lampe",
    buttonName: "lamp",
    effect: {
        id: "Lamp",
        label: "Lamp",
        icon: "https://assets.forge-vtt.com/bazaar/systems/dnd5e/assets/icons/items/inventory/lamp.jpg"
    },
    data: {
        light: {
            dim: 45,
            bright: 15,
            angle: 360,
            color: "#f98026",
            alpha: 0.3,
            animation: { type: "torch", "speed": 1, "intensity": 1 }
        }
    },
    fuel: "Oil Flask",
    ddbFuel: "Oil (flask)"
}

export const BULLSEYE_INFOS = {
    droppedItemName: "Dropped Bullseye Lantern",
    itemName: "Bullseye Lantern",
    germanName: "Bullseye-Laterne",
    buttonName: "bullseyeLantern",
    effect: {
        id: "Bullseye",
        label: "Bullseye",
        icon: "icons/sundries/lights/lantern-bullseye-signal-copper.webp"
    },
    data: {
        light: {
            dim: 120,
            bright: 60,
            angle: 60,
            color: "#f98026",
            alpha: 0.4,
            animation: { type: "torch", "speed": 1, "intensity": 1 }
        }
    },
    fuel: "Oil Flask",
    ddbFuel: "Oil (flask)"
}

export const HOODED_LANTERN_CLOSED_INFOS = {
    droppedItemName: "Dropped Hooded Lantern",
    itemName: "Hooded Lantern",
    ddbItemName: "Lantern",
    germanName: "Kapuzenlaterne (geschlossen)",
    buttonName: "hoodedLanternClosed",
    effect: {
        id: "Hooded Lantern",
        label: "Hooded Lantern",
        icon: "icons/sundries/lights/lantern-iron-yellow.webp"
    },
    data: {
        light: {
            dim: 5,
            bright: 0,
            angle: 360,
            color: "#f98026",
            alpha: 0.2,
            animation: { type: "torch", "speed": 1, "intensity": 1 }
        }
    },
    fuel: "Oil Flask",
    ddbFuel: "Oil (flask)"
}

export const HOODED_LANTERN_OPEN_INFOS = {
    droppedItemName: "Dropped Lantern",
    itemName: "Hooded Lantern",
    ddbItemName: "Lantern",
    germanName: "Kapuzenlaterne (offen)",
    buttonName: "hoodedLanternOpen",
    effect: {
        id: "Hooded Lantern",
        label: "Hooded Lantern",
        icon: "icons/sundries/lights/lantern-iron-yellow.webp"
    },
    data: {
        light: {
            dim: 60,
            bright: 30,
            angle: 360,
            color: "#f98026",
            alpha: 0.4,
            animation: { type: "torch", "speed": 1, "intensity": 1 }
        }
    },
    fuel: "Oil Flask",
    ddb_fuel: "Oil (flask)"
}

export const LIGHT_SPELL_INFOS = {
    germanName: "Light Spell",
    buttonName: "light",
    effect: {
        id: "Light",
        label: "Light",
        icon: "systems/dnd5e/icons/spells/light-sky-1.jpg"
    },
    data: {
        light: {
            dim: 40,
            bright: 20,
            angle: 360,
            color: "#f98026",
            alpha: 0.4,
            animation: { type: "torch", "speed": 1, "intensity": 1 }
        }
    }
}

export const LIGHT_INFO_ORDER = [BULLSEYE_INFOS, LAMP_INFOS, HOODED_LANTERN_OPEN_INFOS,
    LIGHT_SPELL_INFOS, TORCH_INFOS, CANDLE_INFOS, HOODED_LANTERN_CLOSED_INFOS]