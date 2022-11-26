import { createLightButton } from "./hud-buttons.js"
import { lightSourceHandlingSettings } from "./settings.js"

Hooks.on('renderTokenHUD', (hud, html) => {
    const lightButton = createLightButton();

    lightButton.on('click', () => {
        LightSourceHandler.startInchryptianScript(hud.object)
    })

    html.children('.left').append(lightButton)
})

Hooks.on("init", () => {
    for (let setting of lightSourceHandlingSettings) {
        game.settings.register("inchryptians-easy-lightsource-handling", setting.settingName, setting.settingObject)
    }
})
