//This file is for game state related variables and methods
import * as state from "./state"
class Subscreen {
    constructor(subscreenType, subCommands, subscreenText) {
        this.type = subscreenType
        this.commands = subCommands
        this.text = subscreenText
    }

}
class Game {
    roomText = ""
    eventText = ""
    optionText = ""

    view_mode = "default"

    state = new state.State()

    commands = [
        //Options
        {
            name: "Return to Menu",
            cond: function (game) {
                return (game.view_mode === "options")
            },
            func: function (game, state) {
                game.view_mode = "menu"
                state.count++
            },
        },

        //Menu
        {
            name: "Exit Menu",
            cond: function (game) {
                return (game.view_mode === "menu")
            },
            func: function (game, state) {
                game.view_mode = "default"
                state.count++
            },
        },
        {
            name: "Save Game",
            cond: function (game) {
                return (game.view_mode === "menu")
            },
            func: function (game, state) {
                state.count++
            },
        },
        {
            name: "Restart Game",
            cond: function (game) {
                return (game.view_mode === "menu")
            },
            func: function (game) {
                game.createSubscreen([
                    {
                        name: "Yes",
                        cond: function () {
                            return true
                        },
                        func: function (game) {
                            game.createSubscreen([
                                {
                                    name: "Yes",
                                    cond: function () {
                                        return true
                                    },
                                    func: function (game, state) {
                                        game.clearAllSubscreens()
                                        state.reset()
                                    },
                                },
                                {
                                    name: "No",
                                    cond: function () {
                                        return true
                                    },
                                    func: function (game) {
                                        game.clearAllSubscreens()
                                    },
                                },
                            ],"basic","Are you REALLY sure you want to quit?")
                        },
                    },
                    {
                        name: "No",
                        cond: function () {
                            return true
                        },
                        func: function (game) {
                            game.clearSubscreen()
                        },
                    },
                ],"basic","Are you sure you want to quit?")
            },
        },

        //Default
        {
            name: "Open Menu",
            cond: function (game) {
                return (game.view_mode === "default")
            },
            func: function (game, state) {
                game.view_mode = "menu"
                state.count++
            },
        },
    ]

    subscreens = []

    createSubscreen(commands, type, text) {
        this.subscreens.unshift(
            new Subscreen(type, commands, text)
        )
    }

    clearSubscreen() {
        this.subscreens.splice(0, 1)
    }
    clearAllSubscreens() {
        this.subscreens = []
    }
    hasSubscreen() {
        return this.subscreens.length > 0
    }

    getCommands() {
        if (this.hasSubscreen()) {
            let array = []
            this.subscreens[0].commands.forEach(command => {
                if (command.cond(this, this.state)) {
                    array.push(command)
                }
            })
            return array
        }

        let array = []
        this.commands.forEach(command => {
            if (command.cond(this, this.state)) {
                array.push(command)
            }
        })
        return array
    } //return array of relevant commands

    runCommand(index) {
        index--
        if (this.getCommands()[index] != null) {
            this.getCommands()[index].func(this, this.state)
        }
        return null
    } //run selected commands function

    updateText() {
        this.setOptionText()
        this.setRoomText()
        this.setEventText()
    }

    setOptionText() {
        let text = ""
        let index = 1
        this.getCommands().forEach(element => {
            text = text.concat("(" + index + ") " + element.name + "\n")
            index++
        })
        this.optionText = text
    }

    setRoomText() {
        this.roomText = "You are in a room."
    }

    setEventText() {
        this.eventText = "You are in " + this.view_mode + " view mode. Count: " + this.state.count
    }
}

function getNewGame() {
    return new Game()
}
let game = new Game()
export
{
    game, getNewGame,
}