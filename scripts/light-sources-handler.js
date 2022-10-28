class LightSourcesHandler {

    static SNOW_CUSTOM = true // Für Snow immer true

    static NO_LIGHT_SOURCES = -1
    static NO_LIGHT_SOURCES_AVAILABLE_OR_CLOSE = -2
    static NO_FUEL = -3

    static TORCH_INFOS = {
        droppedItemName: "Dropped Torch",
        itemName: "Torch",
        germanName: "Fackel",
        buttonName: "torch",
        effect: {
            id: "Torch",
            label: "Torch",
            icon: "icons/sundries/lights/torch-brown-lit.webp"
        },
        data: {
            light: {
                dim: 40,
                bright: 20,
                angle: 360,
                color: "#f98026",
                alpha: 0.4,
                animation: { type: "torch", "speed": 2, "intensity": 2 }
            }
        }
    }

    static CANDLE_INFOS = {
        droppedItemName: "Dropped Candle",
        itemName: "Candle",
        germanName: "Kerze",
        buttonName: "candle",
        effect: {
            id: "Candle",
            label: "Candle",
            icon: "icons/sundries/lights/candle-unlit-tan.webp"
        },
        data: {
            light: {
                dim: 10,
                bright: 5,
                angle: 360,
                color: "#f98026",
                alpha: 0.2,
                animation: { type: "torch", "speed": 1, "intensity": 1 }
            }
        }
    }

    static LAMP_INFOS = {
        droppedItemName: "Dropped Lamp",
        itemName: "Lamp",
        germanName: "Lampe",
        buttonName: "lamp",
        effect: {
            id: "Lamp",
            label: "Lamp",
            icon: "https://assets.forge-vtt.com/bazaar/systems/dnd5e/assets/icons/items/inventory/lamp.jpg"
        },
        data: {
            light: {
                dim: 45,
                bright: 15,
                angle: 360,
                color: "#f98026",
                alpha: 0.3,
                animation: { type: "torch", "speed": 1, "intensity": 1 }
            }
        },
        fuel: SNOW_CUSTOM ? "Oil (flask)" : "Oil Flask"
    }

    static BULLSEYE_INFOS = {
        droppedItemName: "Dropped Bullseye Lantern",
        itemName: "Bullseye Lantern",
        germanName: "Bullseye-Laterne",
        buttonName: "bullseyeLantern",
        effect: {
            id: "Bullseye",
            label: "Bullseye",
            icon: "icons/sundries/lights/lantern-bullseye-signal-copper.webp"
        },
        data: {
            light: {
                dim: 120,
                bright: 60,
                angle: 60,
                color: "#f98026",
                alpha: 0.4,
                animation: { type: "torch", "speed": 1, "intensity": 1 }
            }
        },
        fuel: SNOW_CUSTOM ? "Oil (flask)" : "Oil Flask"
    }

    static HOODED_LANTERN_CLOSED_INFOS = {
        droppedItemName: SNOW_CUSTOM ? "Dropped Hooded Lantern" : "Dropped Hooded Lantern (closed)",
        itemName: SNOW_CUSTOM ? "Lantern" : "Hooded Lantern",
        germanName: "Kapuzenlaterne (geschlossen)",
        buttonName: "hoodedLanternClosed",
        effect: {
            id: "Hooded Lantern",
            label: "Hooded Lantern",
            icon: "icons/sundries/lights/lantern-iron-yellow.webp"
        },
        data: {
            light: {
                dim: 5,
                bright: 0,
                angle: 360,
                color: "#f98026",
                alpha: 0.2,
                animation: { type: "torch", "speed": 1, "intensity": 1 }
            }
        },
        fuel: SNOW_CUSTOM ? "Oil (flask)" : "Oil Flask"
    }

    static HOODED_LANTERN_OPEN_INFOS = {
        droppedItemName: SNOW_CUSTOM ? "Dropped Lantern" : "Dropped Hooded Lantern (open)",
        itemName: SNOW_CUSTOM ? "Lantern" : "Hooded Lantern",
        germanName: "Kapuzenlaterne (offen)",
        buttonName: "hoodedLanternOpen",
        effect: {
            id: "Hooded Lantern",
            label: "Hooded Lantern",
            icon: "icons/sundries/lights/lantern-iron-yellow.webp"
        },
        data: {
            light: {
                dim: 60,
                bright: 30,
                angle: 360,
                color: "#f98026",
                alpha: 0.4,
                animation: { type: "torch", "speed": 1, "intensity": 1 }
            }
        },
        fuel: SNOW_CUSTOM ? "Oil (flask)" : "Oil Flask"
    }

    static LIGHT_SPELL_INFOS = {
        germanName: "Light Spell",
        buttonName: "light",
        effect: {
            id: "Light",
            label: "Light",
            icon: "systems/dnd5e/icons/spells/light-sky-1.jpg"
        },
        data: {
            light: {
                dim: 40,
                bright: 20,
                angle: 360,
                color: "#f98026",
                alpha: 0.4,
                animation: { type: "torch", "speed": 1, "intensity": 1 }
            }
        }
    }

    static LIGHT_INFO_ORDER = [BULLSEYE_INFOS, LAMP_INFOS, HOODED_LANTERN_OPEN_INFOS,
        LIGHT_SPELL_INFOS, TORCH_INFOS, CANDLE_INFOS, HOODED_LANTERN_CLOSED_INFOS]

    constructor() {

    }

    getEffect(token, lightInfo) {
        return token.actor.effects.find(effect => effect.getFlag("core", "statusId") == lightInfo.effect.id)
    }

    lightLightSource(token, lightInfos) {
        let lightSources = token.actor.items.find(item => item.name == lightInfos.itemName)
        if (lightSources == undefined) return NO_LIGHT_SOURCES
        if (lightSources.data.data.quantity < 1) return NO_LIGHT_SOURCES
        if (lightInfos.fuel == undefined) return
        let fuelItem = token.actor.items.find(e => e.name == lightInfos.fuel)
        if (fuelItem == undefined) return NO_LIGHT_SOURCES
        if (fuelItem.data.data.quantity < 1) return NO_LIGHT_SOURCES
    }

    dropLightItem(token, lightInfos) {
        let protoToken = duplicate(game.actors.getName(lightInfos.droppedItemName).data.token)
        protoToken.x = token.center.x;
        protoToken.y = token.center.y;
        canvas.scene.createEmbeddedDocuments("Token", [protoToken])
        if (lightInfos.fuel != undefined) {
            let lightSourceItem = token.actor.items.find(e => e.name == lightInfos.itemName)
            lightSourceItem.update({ data: { quantity: lightSourceItem.data.data.quantity - 1 } })
        }
    }

    lightSourceIsClose(token, lightSource, distance) {
        let xVal = lightSource.x - token.x
        if (!(xVal <= distance && xVal >= -distance)) return false
        let yVal = lightSource.y - token.y
        if (!(yVal <= distance && yVal >= -distance)) return false

        return true
    }

    pickUpLightItem(token, lightInfos) {
        let allLightSources = canvas.tokens.objects.children
        for (lightSource of allLightSources) {
            if (lightSource.actor == null) continue
            if (lightInfos.droppedItemName != lightSource.actor.name) continue
            if (!lightSourceIsClose(token, lightSource, 100)) continue
            //lamp.document.delete()
            return
        }
        allLightSources = canvas.lighting.sources.filter(filteringLightSource => filteringLightSource.object.actor == undefined && filteringLightSource.object.data.config.dim == lightInfos.data.light.dim)
        for (lightSource of allLightSources) {
            if (lightSource.actor != undefined) continue
            if (!lightSourceIsClose(token, lightSource, 150)) continue
            //lamp.object.document.delete()
            return
        }
        return NO_LIGHT_SOURCES_AVAILABLE_OR_CLOSE
    }

    createLightSourceButtonObjects(token, lightInfos) {
        let buttonForPickup = createButton(`${lightInfos.germanName} aufheben`, () => {
            ui.notifications.info(`${lightInfos.germanName} aufgehoben`)
            handleLightEffectAndChangeLight(token, lightInfos)
            if (lightInfos.fuel != undefined) {
                let lightSourceItem = token.actor.items.find(item => item.name == lightInfos.itemName)
                if (lightSourceItem != undefined) {
                    lightSourceItem.update({ data: { quantity: lightSourceItem.data.data.quantity + 1 } })
                } else {
                    compendiumItems = game.packs.get(SNOW_CUSTOM ? "world.ddb-data-hub-items" : "dnd5e.items")
                    lightSourceItemId = compendiumItems.index.find(item => item.name == lightInfos.itemName)._id
                    compendiumItems.getDocument(lightSourceItemId)
                        .then(item => token.actor.addEmbeddedItems([item], false))
                }
            }
        })
        let buttonForLighting = createButton(`Neue ${lightInfos.germanName} anzünden`, () => {
            ui.notifications.info(`${lightInfos.germanName} angezündet`)
            handleLightEffectAndChangeLight(token, lightInfos)
            if (lightInfos.fuel) {
                let lightSourceFuel = token.actor.items.find(item => item.name == lightInfos.fuel)
                lightSourceFuel.update({ data: { quantity: lightSourceFuel.data.data.quantity - 1 } })
            } else {
                let lightSourceItem = token.actor.items.find(item => item.name == lightInfos.itemName)
                lightSourceItem.update({ data: { quantity: lightSourceItem.data.data.quantity - 1 } })
            }
        })

        let buttons = {}
        if (pickUpLightItem(token, lightInfos) != NO_LIGHT_SOURCES_AVAILABLE_OR_CLOSE) buttons.pickupButton = buttonForPickup
        if (lightLightSource(token, lightInfos) != NO_LIGHT_SOURCES) buttons.lightingButton = buttonForLighting
        return buttons
    }

    handleLightEffectAndChangeLight(token, lightInfos) {
        token.document.toggleActiveEffect(lightInfos.effect).then(() => {
            for (let lightInfo of LIGHT_INFO_ORDER) {
                let strongestEffect = getEffect(token, lightInfo)
                if (strongestEffect == undefined) continue

                token.document.update(lightInfo.data)
                return
            }
            token.document.update({ light: { dim: 0, bright: 0 } })
        })
    }

    extinguishOrDropLightItemDialog(token, lightInfos) {
        let dropLightItemButton = createButton(`${lightInfos.germanName} fallen lassen`, () => {
            ui.notifications.info(`${lightInfos.germanName} fallen gelassen`)
            dropLightItem(token, lightInfos)
            handleLightEffectAndChangeLight(token, lightInfos)
        }, false)
        let extinguishTorchButton = createButton(`${lightInfos.germanName} löschen`, () => {
            ui.notifications.info(`${lightInfos.germanName} gelöscht`)
            handleLightEffectAndChangeLight(token, lightInfos)
        }, false)

        new Dialog({
            title: `${lightInfos.germanName} löschen oder fallen lassen`,
            buttons: {
                dropLightItemButton: dropLightItemButton,
                extinguishTorchButton: extinguishTorchButton
            }
        }).render(true);
    }

    handleLightItem(token, buttons, lightInfos) {
        if (getEffect(token, lightInfos)) {
            extinguishOrDropLightItemDialog(token, lightInfos)
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
            buttonName = Object.keys(buttons)[0]
            buttons[buttonName].callback()
        }
    }

    createButton(label, callbackFunction, active = true) {
        return {
            label: label,
            callback: callbackFunction,
            icon: `<i class="fas fa-${active ? "check" : "times"}"></i>`
        }
    }

    addItemButtonsToMenu(mainMenuButtons, token, lightInfos) {
        let lightItemButtons = createLightSourceButtonObjects(token, lightInfos)
        let handleLightItemButton = createButton(lightInfos.germanName, () => handleLightItem(token, lightItemButtons, lightInfos), getEffect(token, lightInfos) != undefined)
        if (Object.keys(lightItemButtons).length > 0 || getEffect(token, lightInfos)) mainMenuButtons[`handle${lightInfos.buttonName}Button`] = handleLightItemButton
        return mainMenuButtons
    }

    addSpellButtonToMenu(mainMenuButtons, token, spellInfos) {
        if (token.actor.items.find(e => e.name == "Light") == undefined) return mainMenuButtons
        let effect = getEffect(token, spellInfos)

        let buttonTypeDescription = effect ? "beenden" : "wirken"
        let lightSpellButton = createButton(`${spellInfos.germanName} ${buttonTypeDescription}`, () => handleLightSpell(token, spellInfos, effect), effect != undefined)
        mainMenuButtons[`handle${spellInfos.buttonName}Button`] = lightSpellButton
        return mainMenuButtons
    }

    handleLightSpell(token, spellInfos, effect) {
        if (effect) {
            ui.notifications.info(`${spellInfos.germanName} beendet`)
            handleLightEffectAndChangeLight(token, spellInfos)
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
                            handleLightEffectAndChangeLight(token, spellInfos)
                        },
                        icon: `<i class="fas fa-check"></i>`
                    }
                },
            }).render(true)

        }
    }

    startInchryptianScript(token) {
        let mainMenuButtons = {}

        for (infos of LIGHT_INFO_ORDER.filter(info => info != LIGHT_SPELL_INFOS)) { mainMenuButtons = addItemButtonsToMenu(mainMenuButtons, token, infos) }

        mainMenuButtons = addSpellButtonToMenu(mainMenuButtons, token, LIGHT_SPELL_INFOS)

        if (Object.keys(mainMenuButtons).length == 1) {
            buttonName = Object.keys(mainMenuButtons)[0]
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

    /*
    let tokens = canvas.tokens.controlled
    for (let token of tokens) {
        let mainMenuButtons = {}
    
        for (infos of LIGHT_INFO_ORDER.filter( info => info != LIGHT_SPELL_INFOS )) { mainMenuButtons = addItemButtonsToMenu(mainMenuButtons, token, infos) }
    
        mainMenuButtons = addSpellButtonToMenu(mainMenuButtons, token, LIGHT_SPELL_INFOS)
    
        if (Object.keys(mainMenuButtons).length == 1) {
            buttonName = Object.keys(mainMenuButtons)[0]
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
    }*/
}