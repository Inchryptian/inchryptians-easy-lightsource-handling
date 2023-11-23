import { createLightButton } from "./helpers/buttons.js"
import { lightSourceHandlingSettings } from "./settings.js"
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
})
