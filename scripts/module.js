import { createLightButton } from "./lib.js"

Hooks.on('renderTokenHUD', (hud, html) => {
    const lightButton = createLightButton();

    lightButton.on('click', () => {
        LightSourceHandler.startInchryptianScript(hud.object)
    })

    html.children('.left').append(lightButton)
})