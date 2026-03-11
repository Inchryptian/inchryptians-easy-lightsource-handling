import { createButton } from "./helpers/buttons.js"
import { handleLightEffectAndChangeLight, createOrAddItemToInventory, removeItemFromInventory } from "./lightSourceHandler.js"
import { createReceivedMediaDisplayApp } from "./art_with_credits/lib.js"
let socket 

Hooks.once("setup", () =>{
    socket = socketlib.registerModule("inchryptians-easy-lightsource-handling")
    socket.register("askOtherPlayerForLight", askOtherPlayerForLight)
    socket.register("deleteLightGM", deleteLightGM)
    socket.register("offerLightSourceForPlayer", offerLightSourceForPlayer)
    socket.register("removeEffectForUser", removeEffectForUser)
    socket.register("shareImages", receiveSharedImages)
    socket.register("toggleDarkVision", toggleDarkVision)
})

export function changeDarkvision(){
    socket.executeForEveryone("toggleDarkVision", CONFIG.Canvas.visionModes.darkvision.vision.defaults.brightness)
}

export function askForLight(request){
    socket.executeForEveryone("askOtherPlayerForLight", request)
}

export function deleteLight(closeLightItem){
    socket.executeAsGM("deleteLightGM", closeLightItem.object.id)
}

export async function offerLightSource(lightSource) {
    //For multiple targets [...new Set(...game.user.targets.map(i => Object.keys(i.actor.ownership)))].filter(i => i !== 'default')
    const users = Object.keys(game.user.targets.first().actor.ownership).filter(i => i !== 'default')
    socket.executeForUsers("offerLightSourceForPlayer", users, game.user.targets.first().id, lightSource)
}

export function takeLightSource(lightSourceActor, lightInfos) {
    const users = Object.keys(lightSourceActor.object.actor.ownership).filter(i => i !== 'default')
    socket.executeForUsers("removeEffectForUser", users, lightSourceActor.object.id, lightInfos)
}

export async function shareImage(imgPath, text, actorId, type){
    await socket.executeForEveryone('shareImages', {
      imgPath: imgPath,
      text: text,
      actorId: actorId,
      type: type
    });
  };

function toggleDarkVision(current_GM_Value){
    if(current_GM_Value == 0.1){
        CONFIG.Canvas.visionModes.darkvision.vision.defaults.brightness = -1
        canvas.tokens.ownedTokens.forEach(element => {
            element.document.update({x: element.document.x + 1 }) 
        })
    } else { 
        CONFIG.Canvas.visionModes.darkvision.vision.defaults.brightness = 0.1
        canvas.tokens.ownedTokens.forEach(element => {
            element.document.update({x: element.document.x - 1  }) 
        })
    }
}

function askOtherPlayerForLight(request){
    if(!game.settings.get("inchryptians-easy-lightsource-handling", "lightRequestsForAdmin") && game.user.isGM) return
    let targetedTokens = canvas.tokens.ownedTokens.filter( token => request.userTargets.includes(token.id) )
    for(let token of targetedTokens){
        if(!token.owner) continue
        let acceptButton = createButton("Zulassen", () => handleLightEffectAndChangeLight(token, request.lightInfos))
        let declineButton = createButton("Ablehnen", () => {} , false)
        new foundry.applications.api.DialogV2({
            window: { title: "Licht Angebot" },
            content: "Jemand wirkt einen Licht-Zauber auf dich",
            buttons: [
                acceptButton,
                declineButton
            ],
        }).render(true)        
    }
}

function deleteLightGM(closeLightItemTokenId){
    canvas.tokens.get(closeLightItemTokenId).document.delete()
}

async function offerLightSourceForPlayer(target, lightInfos){
    if(game.user.isGM) return
    const token = canvas.tokens.ownedTokens.find( token => target === token.id )
    handleLightEffectAndChangeLight(token, lightInfos)
    if(lightInfos.fuel !== undefined) createOrAddItemToInventory(token, lightInfos)
}

async function removeEffectForUser(tokenId, lightInfos){
    if(game.user.isGm) return 
    const token = canvas.tokens.get(tokenId)
    handleLightEffectAndChangeLight(token, lightInfos)
    if (lightInfos.fuel != undefined) {
        removeItemFromInventory(token, lightInfos)
    }
}

function receiveSharedImages(receivedObject) {
    if(receivedObject.handlerName != null) return
    createReceivedMediaDisplayApp(receivedObject);
  };