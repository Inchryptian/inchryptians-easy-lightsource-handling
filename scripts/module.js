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

Hooks.on("canvasReady", async (canvas) => {
    if(!game.settings.get("inchryptians-easy-lightsource-handling", "questionMarksOnNPCHealth")) return 
    await canvas.initializing
    if(game.settings.get("inchryptians-easy-lightsource-handling", "pandaBar")){
        for(let token of canvas.tokens.placeables) {
            if(!(token.document.actor.type === "npc")) continue
            
            let sprite = new PIXI.Sprite(PIXI.Texture.from("modules/inchryptians-easy-lightsource-handling/images/AlternateHPBar.png"))
            token.bars.bar1.addChild(sprite)
            sprite.width = sprite.parent.width*1.01
            sprite.height = sprite.parent.height * 2
            sprite.anchor.x = 0.01
            sprite.anchor.y = 0.1
        }
    }
    else {
        for(let token of canvas.tokens.placeables) {
            if(!(token.document.actor.type === "npc")) continue
            
            let text = new PreciseText("? ? ?", {fontWeight: "bolder",  fontFamily: "Signika", fontSize: "7px", align: "center"})
            token.bars.bar1.addChild(text)
            text.x = text.parent.width / 2
            text.anchor.x = 0.5
        }
    }
})

Hooks.on("dropCanvasData", async (canvas, data) => {
    if(!game.settings.get("inchryptians-easy-lightsource-handling", "questionMarksOnNPCHealth")) return 
    await canvas.initializing
    if(game.settings.get("inchryptians-easy-lightsource-handling", "pandaBar")){
        for(let token of canvas.tokens.placeables) {
            if(token.bars.bar1.children.length > 0 ) continue
            if(!(token.document.actor.type === "npc")) continue
            
            let sprite = new PIXI.Sprite(PIXI.Texture.from("modules/inchryptians-easy-lightsource-handling/images/AlternateHPBar.png"))
            token.bars.bar1.addChild(sprite)
            sprite.width = sprite.parent.width*1.01
            sprite.height = sprite.parent.height * 2
            sprite.anchor.x = 0.01
            sprite.anchor.y = 0.1
        }
    }
    else {
        for(let token of canvas.tokens.placeables) {
            if(token.bars.bar1.children.length > 0 ) continue
            if(!(token.document.actor.type === "npc")) continue
            
            let text = new PreciseText("? ? ?", {fontWeight: "bolder",  fontFamily: "Signika", fontSize: "7px", align: "center"})
            token.bars.bar1.addChild(text)
            text.x = text.parent.width / 2
            text.anchor.x = 0.5
        }
    }
})