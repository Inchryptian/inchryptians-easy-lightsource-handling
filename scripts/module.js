import { createLightButton } from "./helpers/buttons.js"
import { lightSourceHandlingSettings } from "./settings.js"
import { LIGHT_INFO_ORDER } from "./constants.js"
import LightSourceHandler from "./light-source-handler.js"

Hooks.on('renderTokenHUD', (hud, html) => {
    
    const lightButton = createLightButton();

    lightButton.on('click', () => {
        LightSourceHandler.startInchryptianScript(hud.object)
    })

    html.children('.left').append(lightButton)
})

Hooks.on("init", () => {
    window.LightSourceHandler = LightSourceHandler
    for (let setting of lightSourceHandlingSettings) {
        game.settings.register("inchryptians-easy-lightsource-handling", setting.settingName, setting.settingObject)
    }
    for(let lightInfo of LIGHT_INFO_ORDER) {
        console.log(lightInfo)
        CONFIG.statusEffects.push(lightInfo.effect)
    }
})
