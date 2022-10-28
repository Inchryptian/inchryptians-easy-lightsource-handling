import { createLightButton } from "./lib.js"
import { LightSourcesHandler } from "./light-sources-handler.js"

Hooks.on('renderTokenHUD', (hud, html, title) => {
    const lightButton = createLightButton();
    const actor = game.actors.get(title.actorId)

    lightButton.on('click', () => {
        let lightSourceHandler = new LightSourcesHandler()
        lightSourceHandler.startInchryptianScript(canvas.tokens.ownedTokens.find(t => t.actor.id == title.actorId ))
    })

    html.children('.left').append(lightButton)
})