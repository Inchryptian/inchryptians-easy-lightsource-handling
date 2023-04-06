let socket 

Hooks.once("setup", () =>{
    socket = socketlib.registerModule("inchryptians-easy-lightsource-handling")
    socket.register("askOtherPlayerForLight", askOtherPlayerForLight)
})

export function askForLight(request){
    socket.executeForEveryone("askOtherPlayerForLight", request)
}

function askOtherPlayerForLight(request){
    let targetedTokens = canvas.tokens.ownedTokens.filter( token => request.userTargets.includes(token.id) )
    for(let token of targetedTokens){
        if(!token.owner) continue
        let acceptButton = LightSourceHandler.createButton("Zulassen", () => LightSourceHandler.handleLightEffectAndChangeLight(token, request.lightInfos))
        let declineButton = LightSourceHandler.createButton("Ablehnen", () => {} , false)
        new Dialog({
            title: "Licht Angebot",
            content: "Jemand wirkt einen Licht-Zauber auf dich",
            buttons: {
                acceptButton,
                declineButton
            },
        }).render(true)        
    }
}



