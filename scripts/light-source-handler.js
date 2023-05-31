import { LIGHT_INFO_ORDER, LIGHT_SPELL_INFOS, NO_LIGHT_SOURCES, NO_LIGHT_SOURCES_AVAILABLE_OR_CLOSE } from "./constants.js"
import { askForLight } from "./sockets.js"
import { createButton } from "./helpers/buttons.js"

class LightSourceHandler {
    static useDdbItems() {
        if(game.packs.get("world.ddb-data-hub-items") == undefined) return false
        return game.settings.get("inchryptians-easy-lightsource-handling", "ddbItems")
    }

    static adminMode(){
        return game.settings.get("inchryptians-easy-lightsource-handling", "adminMode") && game.user.isGM
    }

    static getEffect(token, lightInfo) {
        return token.actor.effects.find(effect => effect.getFlag("core", "statusId") == lightInfo.effect.id)
    }

    static lightLightSource(token, lightInfos) {
        if(this.adminMode()) return
        let lightSources = token.actor.items.find(item => item.name == lightInfos[this.useDdbItems() ? "ddbItemName" : "itemName"])
        if (lightSources == undefined) return NO_LIGHT_SOURCES
        if (lightSources.data.data.quantity < 1) return NO_LIGHT_SOURCES
        if (lightInfos.fuel == undefined) return
        let fuelItem = token.actor.items.find(e => e.name == lightInfos[this.useDdbItems() ? "ddbFuel" : "fuel"])
        if (fuelItem == undefined) return NO_LIGHT_SOURCES
        if (fuelItem.data.data.quantity < 1) return NO_LIGHT_SOURCES
    }

    static createDroppedLightItem(token, actor, lightInfos) {
        let protoToken = duplicate(actor.data.token)
        protoToken.x = token.center.x;
        protoToken.y = token.center.y;
        canvas.scene.createEmbeddedDocuments("Token", [protoToken])
        if (this.adminMode()) return 
        if (lightInfos.fuel != undefined) {
            let lightSourceItem = token.actor.items.find(e => e.name == lightInfos[this.useDdbItems() ? "ddbItemName" : "itemName"])
            lightSourceItem.update({ data: { quantity: lightSourceItem.data.data.quantity - 1 } })
        }
    }

    static dropLightItem(token, lightInfos) {
        let actor = game.actors.getName(lightInfos.droppedItemName)
        if (actor == undefined) {
            let actorsPack = game.packs.get("inchryptians-easy-lightsource-handling.inchryptians-easy-lightsource-light-sources")
            let actorId = actorsPack.index.find(e => e.name == lightInfos.droppedItemName)._id
            actorsPack.getDocument(actorId).then(actor => {
                newActor = Actor.create(actor.data)
                this.createDroppedLightItem(token, newActor, lightInfos)
            })
            return
        }
        this.createDroppedLightItem(token, actor, lightInfos)
    }

    static lightSourceIsClose(token, lightSource, distance) {
        let xVal = lightSource.x - token.x
        if (!(xVal <= distance && xVal >= -distance)) return false
        let yVal = lightSource.y - token.y
        if (!(yVal <= distance && yVal >= -distance)) return false

        return true
    }

    static pickUpLightItem(token, lightInfos) {
        let allLightSources = canvas.tokens.objects.children
        for (let lightSource of allLightSources) {
            if (lightSource.actor == null) continue
            if (lightInfos.droppedItemName != lightSource.actor.name) continue
            if (!this.lightSourceIsClose(token, lightSource, 100)) continue
            //lightSource.document.delete()
            return
        }

        allLightSources = canvas.lighting.sources.filter(filteringLightSource => filteringLightSource.object.actor == undefined && filteringLightSource.object.data.config.dim == lightInfos.data.light.dim)
        for (let lightSource of allLightSources) {
            if (lightSource.actor != undefined) continue
            if (!this.lightSourceIsClose(token, lightSource, 150)) continue
            //lightSource.object.document.delete()
            return
        }
        return NO_LIGHT_SOURCES_AVAILABLE_OR_CLOSE
    }

    static createLightSourceButtonObjects(token, lightInfos) {
        let buttonForPickup = createButton(`${lightInfos.germanName} aufheben`, () => {
            ui.notifications.info(`${lightInfos.germanName} aufgehoben`)
            this.handleLightEffectAndChangeLight(token, lightInfos)
            if (this.adminMode()) return
            if (lightInfos.fuel != undefined) {
                let lightSourceItem = token.actor.items.find(item => item.name == lightInfos[this.useDdbItems() ? "ddbItemName" : "itemName"])
                if (lightSourceItem != undefined) {
                    lightSourceItem.update({ data: { quantity: lightSourceItem.data.data.quantity + 1 } })
                } else {
                    let compendiumItems = game.packs.get(this.useDdbItems() ? "world.ddb-data-hub-items" : "dnd5e.items")
                    let lightSourceItemId = compendiumItems.index.find(item => item.name == lightInfos[this.useDdbItems() ? "ddbItemName" : "itemName"])._id
                    compendiumItems.getDocument(lightSourceItemId)
                        .then(item => { token.actor.createEmbeddedDocuments("Item", [item.data]) })
                }
            }
        })

        let buttonForLighting = createButton(`Neue ${lightInfos.germanName} anzünden`, () => {
            ui.notifications.info(`${lightInfos.germanName} angezündet`)
            this.handleLightEffectAndChangeLight(token, lightInfos)
            if (this.adminMode()) return 
            if (lightInfos.fuel) {
                let lightSourceFuel = token.actor.items.find(item => item.name == lightInfos[this.useDdbItems() ? "ddbFuel" : "fuel"])
                lightSourceFuel.update({ data: { quantity: lightSourceFuel.data.data.quantity - 1 } })
            } else {
                let lightSourceItem = token.actor.items.find(item => item.name == lightInfos[this.useDdbItems() ? "ddbItemName" : "itemName"])
                lightSourceItem.update({ data: { quantity: lightSourceItem.data.data.quantity - 1 } })
            }
        })

        let buttons = {}
        if (this.pickUpLightItem(token, lightInfos) != NO_LIGHT_SOURCES_AVAILABLE_OR_CLOSE) buttons.pickupButton = buttonForPickup
        if (this.lightLightSource(token, lightInfos) != NO_LIGHT_SOURCES) buttons.lightingButton = buttonForLighting
        return buttons
    }

    static handleLightEffectAndChangeLight(token, lightInfos) {
        token.document.toggleActiveEffect(lightInfos.effect).then(() => {
            for (let lightInfo of LIGHT_INFO_ORDER) {
                let strongestEffect = this.getEffect(token, lightInfo)
                if (strongestEffect == undefined) continue

                token.document.update(lightInfo.data)
                return
            }
            token.document.update({ light: { dim: 0, bright: 0 } })
        })
    }

    static extinguishOrDropLightItemDialog(token, lightInfos) {
        let dropLightItemButton = createButton(`${lightInfos.germanName} fallen lassen`, () => {
            ui.notifications.info(`${lightInfos.germanName} fallen gelassen`)
            this.dropLightItem(token, lightInfos)
            this.handleLightEffectAndChangeLight(token, lightInfos)
        }, false)

        let extinguishTorchButton = createButton(`${lightInfos.germanName} löschen`, () => {
            ui.notifications.info(`${lightInfos.germanName} gelöscht`)
            this.handleLightEffectAndChangeLight(token, lightInfos)
        }, false)

        new Dialog({
            title: `${lightInfos.germanName} löschen oder fallen lassen`,
            buttons: {
                dropLightItemButton: dropLightItemButton,
                extinguishTorchButton: extinguishTorchButton
            }
        }).render(true);
    }

    static handleLightItem(token, buttons, lightInfos) {
        if (this.getEffect(token, lightInfos)) {
            this.extinguishOrDropLightItemDialog(token, lightInfos)
            return
        }
        if (Object.keys(buttons).length > 1) {
            new Dialog({
                title: `${lightInfos.germanName} aufheben oder neue anzünden`,
                buttons: buttons
            }).render(true);
            return
        }
        if (Object.keys(buttons).length == 1) {
            let buttonName = Object.keys(buttons)[0]
            buttons[buttonName].callback()
        }
    }

    static addItemButtonsToMenu(mainMenuButtons, token, lightInfos) {
        let lightItemButtons = this.createLightSourceButtonObjects(token, lightInfos)
        let handleLightItemButton = createButton(lightInfos.germanName, () => this.handleLightItem(token, lightItemButtons, lightInfos), this.getEffect(token, lightInfos) != undefined)
        if (Object.keys(lightItemButtons).length > 0 || this.getEffect(token, lightInfos)) mainMenuButtons[`handle${lightInfos.buttonName}Button`] = handleLightItemButton
        return mainMenuButtons
    }

    static addSpellButtonToMenu(mainMenuButtons, token, spellInfos) {
        let effect = this.getEffect(token, spellInfos)
        if (token.actor.items.find(e => e.name == "Light") == undefined && !effect && !this.adminMode()) return mainMenuButtons

        let buttonTypeDescription = effect ? "beenden" : "wirken"
        let lightSpellButton = createButton(`${spellInfos.germanName} ${buttonTypeDescription}`, () => this.handleLightSpell(token, spellInfos, effect), effect != undefined)
        mainMenuButtons[`handle${spellInfos.buttonName}Button`] = lightSpellButton
        return mainMenuButtons
    }

    static handleLightSpell(token, spellInfos, effect) {
        if (effect) {
            ui.notifications.info(`${spellInfos.germanName} beendet`)
            this.handleLightEffectAndChangeLight(token, spellInfos)
        } else {
            new Dialog({
                title: "Farbe des Lightspells",
                content: "<input type=\"color\" value=\"#000000\" data-edit=\"pickColorForLightSpell\"/>",
                buttons: {
                    lightColor: {
                        label: "LightSpell Farbe",
                        callback: e => {
                            ui.notifications.info(`${spellInfos.germanName} gewirkt`)
                            let spelldata = spellInfos.data
                            spelldata.light.color = $("input[data-edit='pickColorForLightSpell']").val()
                            let userTargets = game.user.targets
                            if(userTargets.size > 0 ){
                                return askForLight( {
                                    userTargets: userTargets.ids,
                                    lightInfos: spellInfos 
                                })
                            }
                            this.handleLightEffectAndChangeLight(token, spellInfos)
                        },
                        icon: `<i class="fas fa-check"></i>`
                    }
                },
            }).render(true)

        }
    }

    static startInchryptianScript(token) {
        let mainMenuButtons = {}

        for (let infos of LIGHT_INFO_ORDER.filter(info => info != LIGHT_SPELL_INFOS)) { mainMenuButtons = this.addItemButtonsToMenu(mainMenuButtons, token, infos) }

        mainMenuButtons = this.addSpellButtonToMenu(mainMenuButtons, token, LIGHT_SPELL_INFOS)

        if (Object.keys(mainMenuButtons).length == 1) {
            let buttonName = Object.keys(mainMenuButtons)[0]
            mainMenuButtons[buttonName].callback()
        }
        if (Object.keys(mainMenuButtons).length > 1) {
            new Dialog({
                title: "Lichtquellen Bedienen",
                buttons: mainMenuButtons,
            }, { width: 600 }).render(true)
        }
        if (isObjectEmpty(mainMenuButtons)) {
            ui.notifications.error(`Keine Lichtquellen im Inventar oder in der Nähe`)
            return
        }
    }
}

window.LightSourceHandler = LightSourceHandler