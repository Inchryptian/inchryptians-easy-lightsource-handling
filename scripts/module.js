import { createLightButton } from "./helpers/buttons.js"
import { lightSourceHandlingSettings } from "./settings.js"
import { LIGHT_INFO_ORDER } from "./constants.js"
import { createMainDialog } from "./helpers/dialogs.js"

Hooks.on('renderTokenHUD', (hud, html) => {
    
    const lightButton = createLightButton();

    lightButton.on('click', () => {
        createMainDialog(hud.object)
    })

    html.children('.left').append(lightButton)
})

Hooks.on("init", () => {
    window.createMainDialogForInchryptianModule = createMainDialog
    for (let setting of lightSourceHandlingSettings) {
        game.settings.register("inchryptians-easy-lightsource-handling", setting.settingName, setting.settingObject)
    }
})

Hooks.on("ready", () => {
    for(let lightInfo of LIGHT_INFO_ORDER) {
        CONFIG.statusEffects.push(lightInfo.effect)
    }
})
