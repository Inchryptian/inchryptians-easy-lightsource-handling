import { createLightButton } from "./lib.js"

Hooks.on('renderTokenHUD', (hud, html, title) => {
    const lightButton = createLightButton();
    const actor = game.actors.get(title.actorId)

    lightButton.on('click', () => {
        startinchryptianscript(canvas.tokens.ownedTokens.find(t => t.actor.id == title.actorId ))
    })

    html.children('.left').append(lightButton)
})