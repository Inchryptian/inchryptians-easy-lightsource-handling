import { createLightButton } from "./helpers/buttons.js"
import { lightSourceHandlingSettings } from "./settings.js"
import { LIGHT_INFO_ORDER } from "./constants.js"
import { createMainDialog } from "./helpers/dialogs.js"
import { createArtButton, createNewMediaDisplayApp, prepTokenKeybinding} from "./art_with_credits/lib.js"
import { registerSettings } from './art_with_credits/settings.js';

Hooks.on('renderTokenHUD', (hud, html) => {
    
    const lightButton = createLightButton();
    const artButton = createArtButton();
    const actor = hud.object.document.actor
 
    const emptyButton = document.createElement('button')
    emptyButton.style="padding: 0px; height: 0px; border: 0px;"

    html.children[0].append(emptyButton)
    html.children[0].append(lightButton[0])
    html.children[0].append(artButton[0]);

    lightButton.on('click', () => {
        createMainDialog(hud.object)
    })

    artButton.on('click', () => {
        createNewMediaDisplayApp(actor.img, actor, 'token');
    });
    artButton.on('contextmenu', () => {
        createNewMediaDisplayApp(actor.img, actor, 'main');
    })

    
})

Hooks.on("init", () => {
    registerSettings()
    window.createMainDialogForInchryptianModule = createMainDialog
    for (let setting of lightSourceHandlingSettings) {
        game.settings.register("inchryptians-easy-lightsource-handling", setting.settingName, setting.settingObject)
    }
})

Hooks.on("ready", () => {
    for(let lightInfo of LIGHT_INFO_ORDER) {
        CONFIG.statusEffects.push(lightInfo.effect)
    }
    console.log('setting up socket connection');
})

Hooks.on("refreshToken", async (token) => {
    if(!game.settings.get("inchryptians-easy-lightsource-handling", "questionMarksOnNPCHealth")) return 
    if(token.bars.bar1.children.length >= 1) return 
    if(game.settings.get("inchryptians-easy-lightsource-handling", "pandaBar")){
        
        if(token.document.actor === null) return 
        if(!(token.document.actor.type === "npc")) return
        let texture = PIXI.Texture.from("modules/inchryptians-easy-lightsource-handling/images/AlternateHPBar.png")
        let sprite = new PIXI.Sprite(texture)
        let scaleRatio = (token.border.width - 4) / sprite.width

        if(scaleRatio > 2) return
        token.bars.bar1.addChild(sprite)
        sprite.x = sprite.x - 1
        sprite.y = sprite.y - 1
        sprite.scale.x = scaleRatio
        sprite.scale.y = scaleRatio
        
    }
    else {
        if(!(token.document.actor.type === "npc")) return
        
        let text = new PreciseText("? ? ?", {fontWeight: "bolder",  fontFamily: "Signika", fontSize: "7px", align: "center"})
        token.bars.bar1.addChild(text)
        text.x = text.parent.width / 2
        text.anchor.x = 0.5
        
    }
})

Hooks.on("controlToken", (...args) => prepTokenKeybinding(...args));
Hooks.on("hoverToken", (...args) => prepTokenKeybinding(...args));


Hooks.on("updateChatMessage", (chatMessage, a, b) => {
    console.log(chatMessage)
    if(!game.user.isGM) return 
    if(!game.settings.get("inchryptians-easy-lightsource-handling", "diceSounds")) return 

    for(let roll of chatMessage.rolls){
        for(let die of roll.dice){
            if(die.faces != 20) continue

            if(die.results.find(result => result.result == 20)){ 
                console.log("NAT 20!!!!")
                setTimeout(() => {foundry.audio.AudioHelper.play({src: "modules/inchryptians-easy-lightsource-handling/sounds/nat20.mp3", volume: 0.5}, []) }, 1000)
                return
            }
            if(die.results.find(result => result.result == 1)){ 
                console.log("NAT 1††††")
                setTimeout(() => {foundry.audio.AudioHelper.play({src: "modules/inchryptians-easy-lightsource-handling/sounds/nat1.mp3", volume: 0.5}, []) }, 1000)
                return 
            }
        }
    }
})